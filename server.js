var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var app = new Koa();
var router = new Router();
const util = require('util');
const fs = require('fs');
const upload = require('./upload');
const readFile = util.promisify(fs.readFile);
const koaBody = require('koa-body');
const glob = require('glob');
const routeConfig = require('./router');
app
  .use(bodyParser())
  // .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

routeConfig.init(router);
router.post('/upload', koaBody({
    multipart: true,
    formidable: {
      uploadDir: __dirname + '/uploads'
    }
  }), async (ctx, next) => {
    let { name, path} = ctx.request.body.files.upload;
  console.log(ctx.request.body);
  try {
    let body = await upload(name, fs.createReadStream(path));
    // fs.unlink('uploads/')
    glob("./uploads/upload_**", function (err, files) { 
      if(err == null) {
        files.map(file => {
          fs.unlink(file, () => {});
        })
      }
    });
    ctx.body = {
      status: 0,
      msg: '',
      data: {
        url: `http://oneapv3hn.bkt.clouddn.com/${name}`
      }
    }
  } catch(err) {
    ctx.body = {
      status: 1,
      msg: '服务器未知异常',
      data: null
    }
  }
})
app.listen(3000);



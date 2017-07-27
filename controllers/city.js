const fs = require('fs');
const util = require('util');
const path = require('path');
const readFile = util.promisify(fs.readFile);

//城市相关
module.exports = {
  getCityList: async (ctx, next) => {
    let json;
    try {
      // console.log(path.join(__dirname, './../data/city.json'));
      json = await readFile(path.join(__dirname, './../data/city.json'));
    } catch(err) {
      console.log('报错啦！！', err);
    }
    console.log(json);
    ctx.body = {
      status: 0,
      msg: '',
      data: JSON.parse(json)
    }
    next();
  }
}
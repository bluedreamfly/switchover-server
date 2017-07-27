const user = require('./controllers/user');
const city = require('./controllers/city');
const task = require('./controllers/task');


module.exports = {
  init: (router) => {
    //用户相关
    router.get('/user/info', user.getUserInfo);
    router.post('/user/check', user.userCheck);
    router.post('/user/auth', user.userAuth);
    //城市相关
    router.get('/city', city.getCityList);
    //任务相关
    router.get('/task/list', task.getTaskList);
  }
}
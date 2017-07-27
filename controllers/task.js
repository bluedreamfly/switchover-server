const fs = require('fs');
const util = require('util');
const path = require('path');
const readFile = util.promisify(fs.readFile);
const Mock = require('mockjs');
//任务相关
module.exports = {
  getTaskList: async (ctx, next) => {
    // let json;
    // try {
    //   // console.log(path.join(__dirname, './../city.json'));
    //   json = await readFile(path.join(__dirname, './../data/city.json'));
    // } catch(err) {
    //   console.log('报错啦！！', err);
    // }
    let id = 100001;
    let result = [];
    let time = Mock.Random.date('T');
    for (let i = 0; i < 10; i++) {
      id +=1;
      result.push(Mock.mock({
        'taskId': id,
        'time': time,
        'reward': Mock.Random.natural(5, 100),
        'switchNum': Mock.Random.natural(1, 20),
        'useTime': Mock.Random.natural(30, 100)
      }));

    }
    await new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve();
      }, 4000);
    });
    // setTimeout(() => {
      ctx.body = {
        status: 0,
        msg: '',
        data: result
      }
      next();
    // }, 4000);
    
  },
  createTasks: (ctx, next) => {
    
  }

}
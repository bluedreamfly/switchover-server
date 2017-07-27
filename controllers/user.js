
module.exports = {

  getUserInfo: (ctx, next) => {
    let result = {
      id: '100001',
      userName: '黄祯辉',
      status: 0, //是否是官方换电员
      monthIncome: 1000.3294,
      todayIncome: 1000.4333,
      todayFinishTask: 10,
      todaySwitchNum: 50,
      walletMount: -0.38,
      avatorImage: 'http://oneapv3hn.bkt.clouddn.com/discovery.png'
    }
    ctx.body = {
      status: 0,
      msg: '',
      data: result
    };
    next();
  },

  userCheck: (ctx, next) => {
    let { city_name, card_front, card_back, card_person } = ctx.request.body;
    
    let result = {}

    if (city_name && card_front && card_back && card_person) {
      result = {status: 0, msg: '', data: null};
    } else {
      result = {status: 1, msg: '参数不正确', data: null};
    }

    ctx.body = result;
    next();
  },
  userAuth: (ctx, next) => {
    let { name, cardNo } = ctx.request.body;

    let result = {};
    console.log(name, cardNo);
    if (name.trim() === 'huangzh' && cardNo == '350583199106091852') {
      result = {
        status: 0,
        msg: '',
        data: null
      }
    } else {
      result = {
        status: 1,
        msg: '此人无身份信息，可能是黑户',
        data: null
      }
    }
    ctx.body = result;
    next();
  }
}


export const API_HOST = "https://www.tsymt.com/";
const app = getApp();
const ReqClient = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_HOST + url,
      method,
      data,
      success: (res) => resolve(res),
      fail: err => reject(err)
    })
  })
}
/*用户*/
//获取登录信息
export const wxapplogin = data => {
  return ReqClient('wxapp/wxapplogin', 'POST', {
    ...data
  })
}


//获取用户信息s
export const minfo = data => {
  return  ReqClient('wxapp/minfo', 'POST', {
    ...data
  })
}



//首页详情接口
export const indexprodetail = data => {
  return ReqClient('wxapp/indexprodetail', 'GET', {
    ...data
    
  })
}
// 兑换商品详情展示
export const procreditdetail =  data => {
  return ReqClient('wxapp/procreditdetail', 'GET', {
    ...data
   
  })
}


// 兑换商品详情展示
export const exchangegoods = data => {
  return ReqClient('wxapp/exchangegoods', 'POST', {
    ...data
   
  })
}

// 发送验证码

export const wxappsmscode = data => {
  return ReqClient('wxapp/wxappsmscode', 'POST', {
    ...data
  })
}


//注册会员
export const regmemberuser = data => {
  return ReqClient('wxapp/regmemberuser', 'POST', {
   
    ...data
  })
}




//绑定会员
export const binduser = data => {
  return ReqClient('wxapp/binduser', 'POST', {
   ...data
  })
}




// 转发记录
export const relay = data => {
  return ReqClient('wxapp/relay', 'POST', {
    ...data
  })
}

// 用户信息
export const meminfo = data => {
  return ReqClient('wxapp/meminfo', 'GET', {
    ...data
  })
}

      
//app.js
import { wxapplogin, minfo} from './api.js'
App({
  globalData: {
    username: "",
    userImg: "",
    globalDataUserInf: "",
    latitude: '',
    longitude: '',
    pid:'',
    name:'',
    address:'',
    user:{},//储存用户信息,
    openid:'',
    session_key:'',
  },
  userinfo: {
    key: 'wxdea0006752c0426e', //APPID
    secret: '41f05f1d2c56c24d26cabe9c717e92d9', //secret
    bid: '0',  //会员信息
    appUrl: 'https://www.tsymt.com/',
    token: '0E19F8F718672DEC9E6837588ED80994',
    code:'',
    openid: '',
    session_key:'',
    phone:'',
    truename:'',
    verifycode:'',
    mid:'',
    phoneNumber:'',
    minfo:''
  },

  onLaunch: function() {
    this.getUser()
   
  },
  getUser(){
    var app = this;
  wx.login({
      success(res){
        var code = res.code;
        wxapplogin({
          code,
          token: app.userinfo.token
        }).then(res=>{
           
            if(res.data.code ==200){
              app.userinfo.openid = res.data.data.info.openid
              app.userinfo.session_key = res.data.data.info.session_key,
                app.globalData.openid = res.data.data.info.openid,
                app.globalData.session_key = res.data.data.info.session_key,
              wx.getUserInfo({
                success(res){
               
                  var userinfo = res.userInfo;
                  minfo({
                    bid: app.userinfo.bid,
                    token: app.userinfo.token,
                    openid: app.userinfo.openid,
                    session_key: app.userinfo.session_key,
                    userInfo: JSON.stringify(userinfo),
                  }).then(res=>{
                    if(res.data.code =200){
                      app.userinfo.mid = res.data.minfo.mid;
                      app.userinfo.minfo = res.data.minfo
                      app.globalData.user = res.data.minfo
                      app.globalData.user.mid = app.userinfo.mid

                    }
                  })
                },
               
              })
            }
        })
      }
    })
  },
  null2str(data) {
    for (let x in data) {
      if (data[x] === null) { // 如果是null 把直接内容转为 ''
        data[x] = ''
      } else {
        if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
          data[x] = data[x].map(z => {
            return this.null2str(z)
          })
        }
        if (typeof (data[x]) === 'object') { // 是json 递归继续处理
          data[x] = this.null2str(data[x])
        }
      }
    }
    return data
  },
})

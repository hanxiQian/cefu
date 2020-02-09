// pages/index/index.js
const app = getApp(); //引入app.j，
import { relay, wxapplogin, minfo } from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:false,// 是否隐藏授权弹窗
    currentid: 95,
    cateid: 0,
    primarySize: 'default',
    idt: "no",
    // currentid:2,
    imgheight: 500,
    "bnrUrl": [{
        "url": "../../imgs/login.jpg",
      },
      {
        "url": "../../imgs/1.jpg"
      }
    ],
    'todaydata': [
    ],
    "prolist": [{}],
    "imgg": "../../imgs/particulars.png"
  },
// 判断转发接口shar-mid
sharmid:function(){
  if (app.userinfo.mid !=0){
    var appUrl = app.userinfo.appUrl;
   
    wx.request({
      url: appUrl + 'wxapp/relay', //这
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.userinfo.minfo.wxappopenid,
        share_mid: app.userinfo.mid
      },
      success: res => {
       
      }
    })
  }
  
},
  goMessage(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/indexxiangqing/indexxiangqing?id='+id,
    })
   
  },
  // 点击导航栏出现的对应的页面
  todayclick: function() {
    var that = this;
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/getcatelist', //这
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
      },
      success(res){
       
        that.setData({
          todaydata: res.data.data.catelist,
          prolist: res.data.data.prolist,
        })
      }
    })
  },
  //跳转新人有礼界面
  tonewperson: function() {
    // wx.navigateTo({
    //   url: '../../pages/newperson/newperson',
    // })
  },
  // 首页门店上新接口
  indexmendian: function () {
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/newshowgoods', //这
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.userinfo.openid,
      },
      success: res => {
        
        this.setData({
          mendianlist:res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 判断是否授权
  onShow: function(options) {
  
  },
  onLoad: function(options) {
    
   
    var that = this;
    // 登录
    wx.login({
      success: res => {
        var appUrl = app.userinfo.appUrl;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
       
        var code = res.code;
        app.userinfo.code = res.code;
        wxapplogin({
          code: res.code,
          token: app.userinfo.token
        }).then(res=>{
         
          app.userinfo.bid = res.data.data.bid;
          app.userinfo.openid = res.data.data.info.openid;
          app.userinfo.session_key = res.data.data.info.session_key;
          app.globalData.openid = res.data.data.info.openid
          app.globalData.session_key = res.data.data.info.session_key
          if (options.share_mid && options.share_mid != 0) {
            relay({
              bid: res.data.data.bid,
              openid: res.data.data.info.openid,
              share_mid: options.share_mid
            }).then(res => {
             
            })
          }
          that.getindexbanner();
          that.indexmendian();
          this.setData({
            openid: res.data.data.info.openid
          })
          // that.sharmid()
          // 查看本地缓存
          wx.getStorage({
            key: 'userinfo',
            success(res) {
             
              if (res.data) {
                that.setData({
                  idt: 'no'
                })
                app.globalData.username = res.data.nickName;
                app.globalData.userImg = res.data.avatarUrl;
                app.globalData.globalDataUserInf = res.data;
               
                var user = {
                  detail: {
                    userInfo: res.data
                  }
                }
                that.getchuan(user);
                wx.getLocation({
                  type: 'wgs84',
                  success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    app.globalData.latitude = latitude
                    app.globalData.longitude = longitude
                   
                  }
                })
              } else {
                that.setData({
                  idt: 'yes'
                })
              }
            },
            fail(res) {
             
              that.setData({
                idt: 'yes'
              })
            }
          })
            
        })
        // if (code) {
        //   wx.request({
        //     url: appUrl + 'wxapp/wxapplogin',
        //     method: "post",
        //     header: {
        //       'content-type': 'application/json' // 默认值
        //     },
        //     data: {
            
        //     },
        //     success: (res) => {
             
           


        //     },
        //     fail: function (res) {
        //     
        //     }
        //   })
        // } else {
        //   
        // }
      }
    })
  },
  // 推荐判断
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUser();
   
  },
  getUser() {
   var self = this;
    wx.login({
      success(res) {
        var code = res.code;
        wxapplogin({
          code,
          token: app.userinfo.token
        }).then(res => {

          if (res.data.code == 200) {
            app.userinfo.openid = res.data.data.info.openid
            app.userinfo.session_key = res.data.data.info.session_key,
              app.globalData.openid = res.data.data.info.openid,
              app.globalData.session_key = res.data.data.info.session_key,
              wx.getUserInfo({
                success(res) {

                  var userinfo = res.userInfo;
                  minfo({
                    bid: app.userinfo.bid,
                    token: app.userinfo.token,
                    openid: app.userinfo.openid,
                    session_key: app.userinfo.session_key,
                    userInfo: JSON.stringify(userinfo),
                  }).then(res => {
                    if (res.data.code = 200) {
                      app.userinfo.mid = res.data.minfo.mid;
                      app.userinfo.minfo = res.data.minfo
                      app.globalData.user = res.data.minfo
                      app.globalData.user.mid = app.userinfo.mid

                    }else{
                      self.setData({
                        key:true
                      })
                    }
                  })
                },
              fail(err) {
                self.setData({
                  key:true
                })
              }
              })
             
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  // 传ueseinfo 
  getchuan: function(res) {
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/minfo',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        token: app.userinfo.token,
        openid: app.userinfo.openid,
        session_key: app.userinfo.session_key,
        userInfo: JSON.stringify(res.detail.userInfo),
      },
      success: (res) => {
        
      
        app.userinfo.mid = res.data.minfo.mid;
        app.userinfo.minfo = res.data.minfo
        app.globalData.user = res.data.minfo
        app.globalData.user.mid = app.userinfo.mid
  
        this.todayclick()
        // this.sharmid()
      }
    })
  },
  getindexbanner: function(res) {
    var appUrl = app.userinfo.appUrl;
    var that = this;
    wx.request({
      url: appUrl + 'wxapp/carousel',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.userinfo.openid
      },
      success: function(res) {
       
        that.setData({
          bnrUrl: res.data.data
        })
      }
    })
  },

  shopxiangqing: function(e) {
    wx.navigateTo({
      url: '../../pages/mendianfirsttop/mendianfirsttop'
    })
  },
  sunmitmore: function() {
    this.setData({
      imgheight: 5147,
    });
  },
})
// components/shouquan.js
var app =getApp();
import { minfo} from '../api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key:{
      type:Boolean, //数据类型
      value:false // 数据内容
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 授权登录
    bindGetUserInfo(res) {
      var self = this;
      var userInfo = res.detail.userInfo;
     
      if (userInfo) {
      
        
       
        
        //本地存储用户信息
        wx.setStorage({
          key: "userinfo",
          data: userInfo,
         
        })
      
        app.globalData.username = userInfo.nickName;
        app.globalData.userImg = userInfo.avatarUrl;
        app.globalData.user = userInfo;
        minfo({
          bid: app.userinfo.bid,
          token: app.userinfo.token,
          openid: app.userinfo.openid,
          session_key: app.userinfo.session_key,
          userInfo: JSON.stringify(userInfo),
        }).then(res => {
          if (res.data.code = 200) {
            app.userinfo.mid = res.data.minfo.mid;
            app.userinfo.minfo = res.data.minfo
            app.globalData.user = res.data.minfo
            app.globalData.user.mid = app.userinfo.mid

          } else {
            self.setData({
              key: true
            })
          }
        })

        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var latitude = res.latitude
            var longitude = res.longitude
            app.globalData.latitude = latitude
            app.globalData.longitude = longitude
           
          }
        })
        self.setData({
          key:false
        })

      } else {
        
        self.setData({
          key: false
        })
      }
    },
  }
})

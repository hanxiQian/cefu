const app = getApp();
import { meminfo, minfo} from '../../api.js'
//獲取應用實例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinformation:{},//用户个人信息
    idt: 2,
    pnonenumber:''
  },
  // 会员说明
  member:function(){
wx.navigateTo({
  url: "/pages/shuoming/shuoming",

})
  },
  // 兑换记录
  duihuanhou:function(){
    wx.navigateTo({
      url: '../../pages/duihuanhou/duihuanhou',
    })
  },
  onReady(){
    console.log(this.data.userinformation)
  },
  jindou:function(){
wx.navigateTo({
  url: '../../pages/jindou/jindou',
})
  },
  // 提交投诉
  tousu:function(){
wx.navigateTo({
  url: '../../pages/tousu/tousu',
})
  },
  // 推荐好友
  tuijianpeople:function(){
wx.navigateTo({
  url: '../../pages/tuijian/tuijian',
})
  },
  // 开通会员方法
  kaitong: function() {
    wx.navigateTo({
      url: '../../pages/kaitong/kaitong',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 积分跳转页面
  jiscore:function(e){
    var credit = e.currentTarget.dataset.credit ? e.currentTarget.dataset.credit:0
        wx.navigateTo({
          url: '../../pages/jiscore/jiscore?credit='+credit
        })
  },
  // 余额跳转页面
  yumoney(){
    var totalmoney = this.data.userinformation.totalmoney ? this.data.userinformation.totalmoney:0
    wx.navigateTo({
      url: '/pages/yumoney/yumoney?totalmoney=' + totalmoney,
    })
  },
  onShow: function (){
    this.setData({
      userinformation: app.globalData.user
    })
    console.log(this.data.userinformation)
    if (app.userinfo.mid != 0) {
      this.getchuan();
    }
  
  },
 
  /**
   *点击添加地址事件
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
   
  },
  // 获取用户信息   判断是否会员之后的信息
  getchuan: function () {
   
    console.log(app.globalData.openid)
    meminfo({
      bid: app.userinfo.bid,
      openid: app.globalData.openid,
      mid: app.userinfo.mid
    }).then(res=>{
      if(res.data.code == 200){
        console.log(res.data.data)
        this.setData({
          userinformation:res.data.data,
          pnonenumber: res.data.data.phone
        })
      }
    })
  },
  // 授权登录
  bindGetUserInfo(res) {
    console.log(res);
    // console.log(res.detail.userInfo.nickName)
    // console.log(res.detail.userInfo.avatarUrl); 
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
      console.log("点击了同意授权===========================",res);
      this.setData({
        idt: 1,
      })
      app.globalData.username = res.detail.userInfo.nickName;
      app.globalData.userImg = res.detail.userInfo.avatarUrl;
      console.log('测试', 11111111111111111111)
    } else {
      console.log("点击了拒绝授权");
      this.setData({
        idt: 2,
      })
    }
  },

})
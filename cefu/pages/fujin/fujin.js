// pages/fujin/fujin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showimg:'',
    positiontext:'',
    positionphone:'',
    positionadress:''
  },
  returnmy:function(){
wx.switchTab({
  url: '../../pages/my/my',
})
  },
  // 点击位置方法
  map:function(){
    wx.switchTab({
      url: '../../pages/mendian/mendian',
      success: function (res) { 
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/shoplist',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.userinfo.openid,
      },
      success: res => {
        // console.log('点击导航栏出现的对应的页面', res.data.data.catelist)
        console.log('点击附近门店出现的对应的页面', res.data.data)
        console.log('点击附近门店出现的对应的页面', res.data.data[0].name)
        this.setData({
          showimg: res.data.data[0].img,
          positiontext: res.data.data[0].name,
          positionphone: res.data.data[0].phone,
          positionadress: res.data.data[0].address,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
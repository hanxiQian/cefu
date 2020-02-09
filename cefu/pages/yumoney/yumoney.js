// pages/jiscore/jiscore.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    yumoney: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 退回我的页面
  returnmy: function () {
    wx.switchTab({
      url: '../../pages/my/my'
    })
  },
  onLoad: function (options) {
    console.log(111111, app.globalData.openid)
    console.log(111111, app.userinfo)
    console.log(options);
    console.log(app.userinfo.bid)
    console.log(111111, app.globalData)
    // console.log(options.totalmoney)
    if (app.userinfo.bid){
      var yumoney = options.totalmoney;
      if (yumoney != 0) {
        this.setData({
          creditjilv: true
        })
      }
      var appUrl = app.userinfo.appUrl;
      wx.request({
        url: appUrl + "wxapp/balancedetail",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "get",
        data: {
          bid: app.userinfo.bid,
          mid: app.userinfo.mid,
          openid: app.globalData.openid
        },
        success: res => {
          console.log(res.data.data)
          if (res.data.code == 200) {
            this.setData({
              list: res.data.data
            })
            console.log(res.data);
            if (res.data.length > 0) {
              hidden: false
            } else {
              hidden: true
            }
          }
        }
      })
    }
    this.setData({
      yumoney
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
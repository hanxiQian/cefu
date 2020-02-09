// pages/newperson/newperson.js
const app = getApp(); //引入app.j，
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bnrUrl: [

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getindexbanner()
  },
  getindexbanner: function () {
    var appUrl = app.userinfo.appUrl;
    var that = this;
    wx.request({
      url: appUrl + 'wxapp/carousel',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
      },
      success: function (res) {
        // console.log("比对之后的用户信息",res)
        // console.log(res.data.minfo.mid)
        console.log(res.data.data)
        that.setData({
          bnrUrl: res.data.data[0]
        })
        console.log(that.data.bnrUrl)
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
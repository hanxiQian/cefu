// pages/indexlist/indexlist.js

const app = getApp();
Page({
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.userinfo.bid)
    this.setData({
      ops: options
    })
    this.goddsList();
  },

  goddsList: function(e) {

    var that = this;
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/getprobycate',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
        cateid: that.data.ops.id,
      },
      success: res => {
        this.setData({
          prolist: res.data.data,
        })
        console.log('商品面', res.data.data)
      }
    })
  },
})
// pages/jiscore/jiscore.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    credit:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 退回我的页面
  returnmy:function(){
    wx.switchTab({
      url: '../../pages/my/my'
    })
  },
  onLoad: function (options) {
    console.log(app.globalData)
    console.log(app.userinfo)
    console.log(options.credit);
    var credit = options.credit;
    if (credit !=0){
      this.setData({
        creditjilv:true
      })
    }
    this.setData({
      credit
    })
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/creditdetail',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
        mid: app.userinfo.mid
      },
      success: res => {
        console.log('点击附近门店出现的对应的页面', res)
        console.log(app.userinfo)
        this.setData({
          list: res.data.data
        })
        console.log(res.data.data);
        if (res.data.length > "0") {
          hidden: false
        } else {
          hidden: true
        }
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
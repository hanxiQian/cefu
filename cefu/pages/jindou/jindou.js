// pages/jindou/jindou.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['金豆收入明细', '金豆支出明细'],
    currentTab: 0,
    jindoushouru: [],
    jindou:0,
    dcre:[],
    add:[]
  },
  navbarTap: function (e) {
    let index = e.currentTarget.dataset.idx
    this.setData({
      currentTab: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.userinfo.minfo.gold_beans)
    this.setData({
      jindou: app.userinfo.minfo.gold_beans
    })
    this.jindoushouru()
  },
  jindoushouru() {
    var appUrl = app.userinfo.appUrl;
    var that = this;
    wx.request({
      url: appUrl + "wxapp/golddetail",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
        mid: app.userinfo.mid
      },
      method: "POST",
      success: res => {
        console.log(res.data.data.dcre)
        console.log(res.data.data.add)
        if (res.data.code == 200) {
          console.log(res.data.data.dcre,'哈哈哈');
          this.setData({
            dcre: res.data.data.dcre,
            add: res.data.data.add
          })
          console.log(res.msg)

        }
        // else {
        //   wx.showModal({
        //     title: '',
        //     content: res.msg,
        //     showCancel: false
        //   })
        // }
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
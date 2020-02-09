// pages/tuijian/tuijian.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    images:''
  },

  // onShareAppMessage: function (a) {
  //   console.log(a)
  //   var i = this.data;
  //   return {
  //     title: getApp().getCache("userinfo").nickName + "邀请您帮忙砍价，最低可以砍到" + i.user_info.lowest_price + "元",
  //     imageUrl: 'https://wx.ibaixiong.cn/addons/yb_mingpian/core/public/upload/4/goods/c887d02f5889754442c7e1410b605520.jpg',
  //     path: "/yb_mingpian/pages/kanjia/share_info/index?id=" + i.user_info.id + "&uid=" + i.user_info.user_id + "&bargain_id=" + i.user_info.bargain_id + "&form_id=" + i.formId + "&card_id=" + app.globalData.card_id,
  //     success: function (a) { },
  //     fail: function (a) { }
  //   };
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showShareMenu({
    // // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket
    //   withShareTicket: true
    // })
    console.log(options)
    this.shall()
    console.log(this.data.title)
  },
  shall: function () {
    wx.request({
      url: app.userinfo.appUrl + 'wxapp/relayset',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        //从全局变量中获取数据
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
      },
      success: (res) => {
        console.log(".获取商户转发配置", res)
        this.setData({
          images: res.data.data.images,
          title: res.data.data.title,
        })
        console.log(res.data.data.title)
      }
    })
  },
  onShareAppMessage: function (res) {
    // console.log(app.globalData)
    // console.log(app.userinfo)
    // console.log(app.globalData.globalDataUserInf)s
    var i = app.globalData.globalDataUserInf
    var e = app.userinfo.mid
    var title = this.data.title
    console.log(this.data.title)
    var images = this.data.images
    console.log(images)
    return {
      title: title,
      path: '/pages/index/index?share_mid=' + e,
      imageUrl: images,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
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

})
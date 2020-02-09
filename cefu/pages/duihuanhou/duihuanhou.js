// pages/shopduihuan/shopduihuan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change: false,
    none:true
  },
  duihuan: function () {
    wx.navigateTo({
      url: '../../pages/duihuanhou/duihuanhou',
    })
  },
    erweima:function(e){
      console.log(e,'兑换记录')
      var status = e.currentTarget.dataset.status;
      if(status == 1){

      }else if(status == 2){
      return  wx.showToast({
          title: '已领取，无法再次领取',
        })
      }
this.setData({
  change:true
})
  },
  erweima2: function () {
    this.setData({
      change: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // console.log(app.userinfo)
    var appUrl = app.userinfo.appUrl;
    var that = this;
    wx.request({
      url: app.userinfo.appUrl + 'wxapp/memexchange',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        //从全局变量中获取数据
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
        mid: app.userinfo.mid,
      },
      success: (res) => {
        console.log("比对兑换记录接口之后的用户信息", res.data)
        // console.log(res.data.data.detail.goodsname)
        console.log(res.data.data)
        // app.userinfo.mid = res.data.minfo.mid;
        //将后台返回的数据绑定到data里面，在页面渲染
        that.setData({
          list:res.data.data
        })
        if (that.data.list.length == 0){
          that.setData({
            none:false
          })
        }
        // console.log(this.data.list)
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
// pages/mendiantop/mendiantop.js
const app = getApp(); //引入app.j，
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    headshow:false,
    list:[]
  },
  location:function(e){
  
    var latitude = Number(app.userinfo.phoneNumber.data[e.currentTarget.dataset.index].lat);
    var longitude = Number(app.userinfo.phoneNumber.data[e.currentTarget.dataset.index].lng);
    console.log(latitude)
    console.log(longitude)
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18,
      name: app.userinfo.phoneNumber.data[e.currentTarget.dataset.index].name,
      address: app.userinfo.phoneNumber.data[e.currentTarget.dataset.index].address
    })
  },
  mapclick:function(e){
    console.log(e,22222222222222222222222222222222222222222222222)
    wx.showModal({
      content: '查看地图',
      success: function (res) {
        // console.log(_this.data.now);
        if (res.confirm) { //这里是点击了确定以后
          // console.log('用户点击确定');
          wx.navigateTo({
            url: '../../pages/mendian/mendian',
          })
        } else { //这里是点击了取消以后
          // console.log('用户点击取消')
        }
      }
    })
  },
  listclick:function(){
    this.setData({
      show: true,
      headshow:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/shoplist',
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
        lat: app.globalData.latitude,
        lng: app.globalData.longitude
      },
      success: res => {
        this.setData({
          list: res.data.data
        })
        console.log('点击门店', res.data)
        app.userinfo.phoneNumber = res.data
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
      this.setData({
        show: false,
        headshow: false,
      })
  },
  calling: function (e) {
    console.log(e.currentTarget.dataset.index)
    var phoneNumber = app.userinfo.phoneNumber.data[e.currentTarget.dataset.index].phone
    console.log(phoneNumber)
    // console.log(app.userinfo.phoneNumber.data[e.currentTarget.dataset.id].phone)
    if (e.currentTarget.dataset.index>=0){
      wx.makePhoneCall({
        phoneNumber: phoneNumber,
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    }

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
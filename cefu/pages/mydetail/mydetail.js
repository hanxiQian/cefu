// pages/index/index.js
const app = getApp(); //引入app.j，
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgmendian: "",
    longitude: '',
    latitude: '',
    markers: [{
      id: 0,
      iconPath: "https://baixiong-user.oss-cn-beijing.aliyuncs.com/home/card/grid/temfile-Reconnaissance.png",
      latitude: '',
      longitude: '',
      width: 50,
      height: 50
    }],
    "bnrUrl": [{
        "url": "../../imgs/login.jpg",
      },
      {
        "url": "../../imgs/1.jpg"
      }
    ],
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [], //下拉列表的数据
    index: 0, //选择的下拉列表下标
    telephone: '',
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
      imgmendian:this.data.selectData[Index].img,
      telephone:this.data.selectData[Index].telephone,
      longitude:this.data.selectData[Index].lng,//经度
      latitude:this.data.selectData[Index].lat,//纬度
      name: this.data.selectData[Index].name
    });
  },
  calling: function() {
    if (this.data.telephone == "") {
      wx.showToast({
        title: '请先选择门店',
        icon: 'none'
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: this.data.telephone,
        success: function() {
          console.log("拨打电话成功！")
        },
        fail: function() {
          console.log("拨打电话失败！")
        }
      })
    }
  },
  location: function() {
    wx.openLocation({
      latitude: Number(this.data.selectData[this.data.index].lat),
      longitude: Number(this.data.selectData[this.data.index].lng),
      scale: 18,
      name: this.data.name,
      address: app.globalData.address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var obj = JSON.parse(options.data)
    // console.log(obj.data)
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log(res);
        that.setData({
          latitude: app.globalData.latitude,
          longitude: app.globalData.longitude,
          markers: [{
            latitude: app.globalData.latitude,
            longitude: app.globalData.longitude,
          }]
        })
      }
    })
    that.loadshoplist()

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShowarn: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  loadshoplist() {
    var appUrl = app.userinfo.appUrl;
    var that = this;
    wx.request({
      url: appUrl+'wxapp/shoplist',
      data: {
        bid: app.userinfo.bid,
        openid: app.globalData.openid
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log('获取门店列表',res.data.data)
        if(res.data.code==200){
          that.setData({
            selectData: res.data.data,
            telephone: res.data.data[0].telephone,
            imgmendian: res.data.data[0].img,
            longitude: res.data.data[0].lng,
            latitude: res.data.data[0].lat,
            name: res.data.data[0].name,
            'markers.longitude': res.data.data[0].lng,
            'markers.latitude': res.data.data[0].lat,
          })
        }
      }
    })
  }
})
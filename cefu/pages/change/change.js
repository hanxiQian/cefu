// pages/change/change.js

const app = getApp();

Page({

  /**
  * 页面的初始数据
  */
  data: {
    false:'false',
    price:300,
    credit:'0',
    total:'0.00',
    shopscore:0,
    "bnrUrl": [{
      "url": "../../imgs/login.jpg",
    },
    {
      "url": "../../imgs/1.jpg"
    }
    ],
    "bnrUrl2":[
      '暂无更多',
      '暂无更多',
      '暂无更多'
      ],
    // adslist: [
    // ],
    miaoshaprolist: [],
    creditprolist: [],

  },

  // 跳转
  count_price() {
    // 获取商品列表数据
    let list = this.data.creditprolist;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      total += list[i].salescount * list[i].price;
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      creditprolist: list,
      total: total.toFixed(2)
    });
  },
  duihuan:function(){
    wx.navigateTo({
      url: '../../pages/duihuanhou/duihuanhou',
    })

  },
  // 购物车减法计算
  minus:function(e){
    const index = e.currentTarget.dataset.index;
    // const obj = e.currentTarget.dataset.obj;
    // console.log(obj);
    // 获取商品数据
    let list = this.data.creditprolist;
    console.log(list, index)
    // 获取商品数量
    let num = list[index].salescount;
    // 判断num小于等于1 return; 点击无效
    if (num <= 0) {
      return false;
    }
    // else num大于1 点击减按钮 数量--
    num = num - 1;
    list[index].salescount = num;
    // 渲染页面
    this.setData({
      creditprolist: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  // 购物车加法运算
  add:function(e){
    console.log(e.currentTarget)
    console.log(e.currentTarget.dataset.index)
    const index = e.currentTarget.dataset.index
    let list = this.data.creditprolist
    let num = list[index].salescount
    num = num + 1
    list[index].salescount = num
    this.setData({
      creditprolist: list
    })
    this.count_price()
  },
 
  /**
  * 生命周期函数--监听页面加载
  */
  tiaoimg:function(e){
        wx.navigateTo({
          url: 'url'
        })
  },
  onLoad: function (options) {
    this.dui()
    this.newgoods()
    let id = options.id
    var that = this;
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl+'wxapp/creditexchange',
      data: {
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: res => {
        res = app.null2str(res.data)
        console.log('res',res)
        if (res.code == "200") {
          // console.log(app.userinfo.minfo.credit)
          that.setData({
            // adslist: res.data.images,
            miaoshaprolist: res.data.creditprolist,
            creditprolist: res.data.creditprolist,
            bnrUrl:res.data.adslist,
            credit: app.userinfo.minfo.credit
          })
          // console.log(res.data.adslist)
        } else {
         
        }
        // console.log(res)
        // console.log(this.data.bnrUrl)
        // console.log(this.data.creditprolist)
      }
    })

  },
  // 兑换新品接口
  newgoods:function(){
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/creditshowgoods',
      data: {
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: res => {
        console.log('兑换新品接口', res.data.data)
        if (res.code == "200") {
          this.setData({
            // adslist: res.data.images,
            miaoshaprolist: res.data.data
          })
          // console.log(res.data.adslist)
        } else {
         
        }
        // console.log(res)
        // console.log(this.data.bnrUrl)
        // console.log(this.data.creditprolist)
      }
    })
  },
  dui: function () {
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/rollexchange', //这
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.globalData.openid,
        mid: app.userinfo.mid
      },
      success: res => {
        console.log('积分兑换页', res.data.data)
        if (res.data.data == ''){
          this.setData({
            // adslist: res.data.images,
            bnrUrl2: this.data.bnrUrl2
          })
        }else{
        this.setData({
          // adslist: res.data.images,
          bnrUrl2: res.data.data
        })
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
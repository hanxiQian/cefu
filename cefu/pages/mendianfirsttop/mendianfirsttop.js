// pages/index/index.js
const app = getApp();
import { indexprodetail} from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    panduan: false,
    idt: 1,
    "bnrUrl": [{
      "url": "../../imgs/login.jpg",
    },
    {
      "url": "../../imgs/1.jpg"
    }
    ],
    "imgg": "../../imgs/particulars.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      indexprodetail({
        pid:options.id,
        openid: app.globalData.openid,
        bid: app.userinfo.bid
      }).then(res=>{
        console.log(res.data.data)
        if(res.data.code == 200 ){
          this.setData({
            ops:res.data.data
          })
        }
      })
    }
    
    this.getindexbanner()
    var appUrl = app.userinfo.appUrl;
    var that = this;
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/creditexchange',
      data: {
        bid: app.userinfo.bid,
        openid: app.userinfo.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: res => {
        res = app.null2str(res.data)
        console.log('res', res)
        if (res.code == "200") {
          that.setData({
            // adslist: res.data.images,
            bnrUrl: res.data.adslist
          })
          // console.log(res.data.adslist)
        } else {
        }
      }
    })
  },

  getindexbanner: function (res) {
    var appUrl = app.userinfo.appUrl;
    var that = this;
    wx.request({
      url: appUrl + 'wxapp/carousel',
      method: "get",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { //d
        bid: app.userinfo.bid,
        openid: app.globalData.openid
      },
      success: function (res) {
        // console.log("获取首页轮播",res)
        that.setData({
          bnrUrl: res.data.data
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
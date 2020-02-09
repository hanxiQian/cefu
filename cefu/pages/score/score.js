// pages/index/index.js
const app = getApp();
import { procreditdetail} from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc:'',
    creditjilv:false,
    shangpinimg:"",
    text: "如果预约时间不能到店则需要提前两个小时取消预约，如不足两个小时可联系技师取消预约",
    marqueePace: 0.5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 0,
    size: 28,
    interval: 20,// 时间间隔
    primarySize: 'default',
    imgheight: 500,
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
    section: [
      {
        name: ' 商品详情',
        typeId: '1',
      }, {
        name: '商品参数',
        typeId: '2',
      }],
    currentId: '1',
  },

  one: function (e) {
    this.setData({
      idt: e.currentTarget.dataset.id
    })
  },
  //点击每个导航的点击事件
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
      })
    }
  },
  onShow: function () {
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  },
  scrolltxt: function () {
    console.log('左边啦')
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        } else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    } else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  },
  close: function () {
    this.setData({
      panduan: true,
    })
  },
  sunmitmore: function () {
    this.setData({
      imgheight: 5147,
    });
  },
  // warn:function(){
  //   wx.navigateTo({
  //     url: '/pages/baoming/baoming',
  //   })
  // },
  warn: function () {
    // var _this = this;
    if (this.data.now == "1") {
      wx.showModal({
        content: '众筹申请访问你的微信个人信息',
        success: function (res) {
          // console.log(_this.data.now);
          if (res.confirm) { //这里是点击了确定以后
            // console.log('用户点击确定');
            wx.navigateTo({
              url: '../../pages/personal/personal',
            })
          } else { //这里是点击了取消以后
            // console.log('用户点击取消')
          }
        }
      })
    } else if (this.data.now == "2") {
      wx.showModal({
        content: '众筹申请访问你的微信个人信息',
        success: function (res) {
          // console.log(_this.data.now);
          if (res.confirm) { //这里是点击了确定以后
            // console.log('用户点击确定');
            wx.navigateTo({
              url: '../../pages/personalsuccess/personalsuccess',
            })
          } else { //这里是点击了取消以后
            // console.log('用户点击取消')
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取通知公告信息接口
  tongzhi:function(){
    var appUrl = app.userinfo.appUrl;
    var that = this;
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/notifyinfo',
      data: {
        bid: app.userinfo.bid,
        openid: app.userinfo.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: res => {
        console.log('获取通知公告信息接口', res.data.data)
        if(res.code = 200){
         that.setData({
           text:res.data.data
         })
        }
       
          // console.log(res.data.adslist)
      }
    })

  },
  shopduihuan(){
    if(this.data.ops.mid ==0){
      return wx.showToast({
        title: '您还不是会员,此商品无法兑换',
        icon:"none"
      })
    }else{
      var ops = this.data.ops
      console.log('ops',ops)
      wx.navigateTo({
        url: '/pages/shopduihuan/shopduihuan?id=' + ops.id
      })
    }
  },
  onLoad: function (options) {
    if(options.id){
      procreditdetail({
        bid:app.userinfo.bid,
        openid: app.globalData.openid,
        pid:options.id,
      }).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.setData({
            ops:res.data.data
          })
        }
      })
    }
    this.tongzhi()
    console.log(options)
    this.setData({
      ops:options
    })
    console.log(options)
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
  
  onShareAppMessage: function () {

  }
})
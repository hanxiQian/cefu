// pages/shopduihuan/shopduihuan.js
const app = getApp();
import { procreditdetail, exchangegoods} from '../../api.js' //引入接口
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
  },
  dufn:function(){
    if (app.userinfo.mid == 0) {
      return wx.showToast({
        title: '您还不是会员，无法兑换',
        icon: "none"
      })
    }
    var that = this;
    wx.showModal({
      title: '确认兑换',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success(res){
          console.log(res)

          //判断用户点了确认按钮再去调接口
          if(res.confirm){
            //去兑换
            exchangegoods({
              openid: app.globalData.openid,//openid
              bid: app.userinfo.bid,
              mid: app.userinfo.mid,
              pid: that.data.product.id,
             
            }).then(res => {
              console.log(res)
              if(res.data.code ==200){
                wx.showToast({
                  title:res.data.msg,
                  icon:'none'
                })
                setTimeout(()=>{
                  wx.navigateBack({
                    detail:1
                  })
                },1500)
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            })
          }
       
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    


    
    // this.jifenFn()
  },
  duihuan: function() {

    console.log(this.options)
    if(this.options.code =='200'){
     
    }

  },
  /**
   *url: https://www.tsymt.com/wxapp/exchangegoods
    参数：商品id: pid, 商户id:bid，会员openid:openid, 会员id：mid
   */

  onLoad: function(options) {
    
    

    if(options.id){
      //这里为什么只传id是因为在封装的时候只接收一个参数这个参数是pid，所以他不是对象 不需要花括号
      procreditdetail({
        pid: options.id,  
        openid: app.globalData.openid,//openid
              bid: app.userinfo.bid}).then(res => {
        console.log(res.data.data)
        if(res.data.code ==200){
            this.setData({
              product:res.data.data
            })
        }
      })
    }
    
  },

  onShareAppMessage: function() {

  }
})
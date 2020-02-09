// pages/kaitong/kaitong.js
const app = getApp(); //引入app.j，
import { wxappsmscode, regmemberuser, binduser} from '../../api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    truename: '',
    yanzhengmaaaaa: '',
    verifycode: '',
    shuruphonephone: '',
   
    items: [{
        name: 'boy',
        value: '男',
        checked: "true"
      },
      {
        name: 'girl',
        value: '女'
      }
    ],
    section: [{
      name: ' 开通会员',
      typeId: '1',
    }, {
      name: '绑定已有会员',
      typeId: '2',
    }],
    currentId: '1',
    hindInfo: true,
    hindInfo2: true,
    numb: 61,
    numb2:61,
    phone:'',
    submit:{
      truename:'',
      verifycode:'',
      phone:''
    },
  },

  inputtruename: function(e) {
    app.userinfo.truename = e.detail.value
    this.setData({
      'submit.truename': e.detail.value
    })

  },
  yanzhengma: function(e) {
    app.userinfo.verifycode = e.detail.value
    this.setData({
      'submit.verifycode': e.detail.value
    })
  },
  shuruphone: function(e) {
    app.userinfo.phone = e.detail.value
    this.setData({
      phone: e.detail.value, //这个注册页面要的手机号
      'submit.phone': e.detail.value
    })
  },
  // 手机号码方法
  onLoad: function(options) {
   
  },

  // 开通会员方法切换
  handleTap: function(e) {
    var appUrl = app.userinfo.appUrl;
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id,
        phone:''
      })
    }
    if (e.currentTarget.id == 2) {
      // this.formSubmit2()
    }
  },
  //点击获取手机号码按钮
  // getPhoneNumber: function(e) {
  //   var appUrl = app.userinfo.appUrl;
  //   var that = this;
  //   console.log('从data里面获取用户code' + that.data.code) //从data里面获取用户code
  //   console.log(e) //正常的话，这里面会有 iv encryptedData
  //   wx.checkSession({
  //     success: function() {
  //       console.log("iv", e.detail.iv)
  //       console.log("encryptedData", e.detail.encryptedData)
  //       if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
  //         that.setData({
  //           modalstatus: true
  //         });
  //       } else { //同意授权
  //         wx.request({
  //           method: "POST",
  //           url: appUrl + '', // 接口换成你们的 换了吗换了
  //           data: {
  //             code: that.data.code,
  //             iv: e.detail.iv,
  //             encryptedData: e.detail.encryptedData,
  //           },
  //           header: {
  //             'content-type': 'application/x-www-form-urlencoded' // 默认值
  //           },
  //           success: (res) => {
  //             that.setData({
  //               phonenumber: res.data.phone,
  //               weixin_id: res.data.openid,
  //             });
  //           },
  //           fail: function(res) {
  //             console.log("解密失败~~");
  //             console.log(res);
  //           }
  //         });
  //       }
  //     },
  //     fail: function() {
  //       console.log("session_key 已经失效，需要重新执行登录流程");
  //       that.wxlogin(); //重新登录
  //     }
  //   });
  //   // }
  // },
  // 开通会员 
  formSubmit: function(e) {
    var that = this;
    if(that.data.submit.phone =='' ){
      return wx.showToast({
        title: '手机号不能为空',
        icon:"none"
      })
    }
    regmemberuser({
      bid: app.userinfo.bid,
      openid: app.globalData.openid,
      session_key: app.userinfo.session_key,
      ...that.data.submit
    }).then(res=>{
        console.log(res,'返回开通')
        if(res.data.code ==200){
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })

          app.globalData.user = res.data.data //这里自己修改成之前你自己写的储存方法
          app.globalData.user.mid = res.data.data.id
          app.userinfo.mid = res.data.data.id
          //返回
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

          //返回
          setTimeout(() => {
            wx.navigateBack({
              detail: 1
            })
          }, 1500)
        }
    })

  },


  // 开通会员的验证码
  hindTap(e) {
    
    if(this.data.numb !=61){
      return console.log('正在倒计时');
    }
    if (this.data.phone == ''){
        return wx.showToast({
          title: '手机号不能为空',
          icon:'none'
        })
    }
    var phone = this.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });

    }










    var type = 1; //type 开通会员时的type值













    // 注意 type和phone不能换位置  因为封装的时候两个位置是这样的
    wxappsmscode({
      bid: app.userinfo.bid,
      mid: app.userinfo.mid,
      session_key: app.userinfo.session_key,
      type: type,
      phone: phone,
    }).then(res=>{
      console.log(res)
      if(res.data.code ==200){
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
        var that = this;
        var numb = this.data.numb;

        var time = setInterval(() => {
          if (numb >= 1) {
            numb--;

            that.setData({
              numb: numb,
              hindInfo: false,
            })


          } else {
            clearInterval(time)
            that.setData({
              hindInfo: true,
              numb: 61 // 如果超时，显示获取验证码按钮          
            })
          }
        }, 1000)
      }else{
       return wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })



  },
  //绑定会员
  hindTap2(e) {
    console.log(e, '////////////')
    console.log(this.data.numb2, '//////')

    if (this.data.numb2 != 61) {
      return console.log('正在倒计时');
    }
    if (this.data.phone == '') {
      return wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    }
   
    var phone = this.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      
    }





 
    var type = 2; //绑定会员时的type值









   
    // 注意 type和phone不能换位置  因为封装的时候两个位置是这样的
    wxappsmscode({
              bid: app.userinfo.bid,
              mid: app.userinfo.mid,
              session_key: app.userinfo.session_key,
              type: type,
              phone: phone,
    }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })


    var that = this;
    var numb = this.data.numb2;

    var time = setInterval(() => {
      if (numb >= 1) {
        numb--;

        that.setData({
          numb2: numb,
          hindInfo2: false,
        })


      } else {
        clearInterval(time)
        that.setData({
          hindInfo2: true,
          numb2: 61, // 如果超时，显示获取验证码按钮          
        })
      }
    }, 1000)
  },

  // 绑定已有会员
  formSubmit2: function(e) {
    
    var submit = {
      openid: app.globalData.openid,
      session_key: app.userinfo.session_key,
      bid: app.userinfo.bid,
      phone: this.data.phone
    }
    binduser(submit).then(res=>{
        console.log(res)
        if(res.data.code ==200){
          app.globalData.user = res.data.data
          app.globalData.user.mid = res.data.data.id
          app.userinfo.mid =  res.data.data.id
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          //成功都返回上一页
          setTimeout(() => {
            wx.navigateBack({
              detail: 1
            })
          }, 1500)

        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
     
       
    })
    
  
  },



  bangFn: function() {
    var appUrl = app.userinfo.appUrl;
    wx.request({
      url: appUrl + 'wxapp/wxappsmscode', 
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        bid: app.userinfo.bid,
        session_key: app.userinfo.session_key,
        phone: app.userinfo.phone,
        type:2
      },
      success: (res) => {

        console.log('开通手机号' + JSON.stringify(res));
        // app.userinfo.verifycode = res.data.data.code

        if (res.data.code == 200) {
          this.setData({
            bangPhone: res.data.data.code
          })
          // wx.switchTab({
          //   url: '../../pages/my/my'
          // })
        } else {
          console.log(res.data.msg)
          wx.showToast({
            mask: true,
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  }



})
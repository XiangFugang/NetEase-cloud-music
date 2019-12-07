// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "", //电话号码
    password: "", //密码
    verificationCode: "", //验证码
    nickname: "", //昵称
    type: true ,//密码输入框类型转换
    phoneerr:""//电话号码错误信息
  },
  //获取电话号码
  onClickIcon(e) {
    this.setData({
      phone: e.detail
    })
  
    //console.log(this.data.phone)
  },
  //电话号码输入框聚焦时
  focuscilck(){
    this.setData({
      phoneerr: ""
    })
  },
  //判断电话号码格式
  blurclick(){
    if (this.data.phone !== "") {
      if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
        this.setData({
          phoneerr: "请输入正确的电话号码"
        })
      } else {
        this.setData({
          phoneerr: ""
        })
      }
    }
  },
  //获取密码
  onclickpassword(e) {
    this.setData({
      password: e.detail
    })
    //console.log(this.data.password)
  },
  //获取短信验证码
  onclicksms(e) {
    this.setData({
      verificationCode: e.detail
    })
    //console.log(this.data.verificationCode)
  },
  //获取昵称
  onChange(e) {
    this.setData({
      nickname: e.detail
    })
    console.log(this.data.nickname)
  },
  //密码明示
  goToPassword() {
    this.setData({
      type: !this.data.type
    })
  },
  //前往登录
  gosign() {
    wx.navigateTo({
      url: '/pages/signin/signin',
    })
  },
  //发送短信获取验证码
  goToVerificationCode() {
    if (this.data.phone !== "") {
      let phone = Number(this.data.phone)
      app.globalData.fly.get(`/captcha/sent?phone=${phone}`).then(res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '发送成功',
            icon: 'none',
          })
        } else {
          wx.showToast({
            title: '发送失败，请重新发送',
            icon: 'none',
          })
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请先输入手机号码',
        icon: 'none',
      })
    }

  },
  //注册
  onclickregister() {
    let phone = Number(this.data.phone);
    let password = this.data.password;
    let captcha = this.data.verificationCode;
    let nickname = this.data.nickname;
    //先验证手机号码是否已经注册
    app.globalData.fly.get(`/cellphone/existence/check?phone=${phone}`).then(res => {
      if (res) {
        // console.log("数据请求成功")
        if (res.data.exist === -1) {
          //console.log('可以注册')
          //再验证验证码
          app.globalData.fly.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`).then(res => {
            if (res) {
              if (res.data.code === 200) {
                app.globalData.fly.get(`/activate/init/profile?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`).then(res => {
                  if (res.data.code === 200) {
                    wx.navigateTo({
                      url: '/pages/signin/signin',
                    })
                  } else {
                    wx.showToast({
                      title: '注册失败',
                      icon: 'none',
                    })
                  }
                  console.log(res)
                }).catch(err => {
                  console.log(err)
                })
              } else {
                wx.showToast({
                  title: '验证码错误',
                  icon: 'none',
                })
              }
            } else {
              wx.showToast({
                title: '无网络链接',
                icon: 'none',
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          wx.showToast({
            title: '该号码已经注册，请直接登录',
            icon: 'none',
          })
        }
      } else {
        wx.showToast({
          title: '无网络链接',
          icon: 'none',
        })
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.onClickIcon()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  }
})
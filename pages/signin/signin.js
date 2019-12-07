// pages/Signin/Signin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 1, //控制手机与邮箱登录模式的参数
    phoneerr: "", //电话号码错误信息
    passworderr: "", //密码框错误信息
    phon: "", //电话号码
    password: "", //密码
    type: true //控制密码框类型
  },
  //切换手机与邮箱登录模式
  gocilck(e) {
    //console.log(e)
    this.setData({
      sum: e.currentTarget.dataset.sum
    })
    //console.log(this.data.sum)
  },
  //去注册
  goToregister() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  //获取密码
  onClickpassword(e) {
    this.setData({
      password: e.detail
    })
    //console.log(this.data.password)
  },
  //密码名视
  goicon() {
    this.setData({
      type: !this.data.type,
      passworderr: ""
    })
  },
  //密码框得到焦点
  focuspassword() {
    this.setData({
      passworderr: ""
    })
  },
  //密码框失去焦点验证
  // blurpassword() {
  //   if (this.data.password !== "") {
  //     if (!(/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/.test(this.data.password))) {
  //       this.setData({
  //         passworderr: "长度6-18位由数字，英文，特殊符号且必须包含数字及英文"
  //       })
  //     } else {
  //       this.setData({
  //         passworderr: ""
  //       })
  //     }
  //   }
  // },
  //获取电话号码
  onClickIcon(e) {
    this.setData({
      phon: e.detail
    })
    //console.log(this.data.phon)
  },
  //电话号码输入框得到焦点
  focuscilck() {
    this.setData({
      phoneerr: ""
    })
  },
  //电话号码输入框失去焦点并验证
  blurcilck() {
    if (this.data.phon !== "") {
      if (!(/^1[3456789]\d{9}$/.test(this.data.phon))) {
        this.setData({
          phoneerr: "请输入正确的电话号码",
        })
      } else {
        this.setData({
          phoneerr: ""
        })
      }
    }
  },
  //手机登录
  gosign() {
    let phon = this.data.phon;
    let password = this.data.password
    if (this.data.phoneerr !== "请输入正确的电话号码") { //判断电话号
      console.log(this.data.password, 111)
      // if (this.data.passworderr !== "长度6-18位由数字，英文，特殊符号且必须包含数字及英文") { //判断密码
      app.globalData.fly.get(`/login/cellphone?phone=${phon}&password=${password}`).then(res => {
        if (res.data.code === 200) {
          //console.log(res.data.code,222)
          wx.setStorageSync('id', res.data.account.id);
          wx.switchTab({
            url: '/pages/my/my',
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
          })
        }
        console.log(res)
      }).catch(err => {
        wx.showToast({
          title: err.engine.response.message,
          icon: 'none',
        })
        //console.log(err)
      })
    }
    //}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
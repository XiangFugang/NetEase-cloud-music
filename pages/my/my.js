// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //Storage里获取的值
    grade: "", //等级
    follow: "0", //关注
    fans: "0", //粉丝
    nickname: "", //昵称
    avatarUrl: "", //头像
    backgroundUrl: "" //背景图片
  },
  //跳转登录页面
  goToimmediately() {
    wx.navigateTo({
      url: '/pages/signin/signin',
    })
  },
  //获取Storage里存储的id
  getid() {
    let id = wx.getStorageSync('id')
    if (id) {
      this.setData({
        id: id
      })
      //console.log(this.data.id)
    }
  },
  //获取用户详细信息
  detailedinformation() {
    let id = this.data.id
    if (id !== "") {
      app.globalData.fly.get(`/user/detail?uid=${id}`).then(res => {
        //console.log(res)
        this.setData({
          grade: res.data.level,
          follow: res.data.profile.follows,
          fans: res.data.profile.followeds,
          nickname: res.data.profile.nickname,
          avatarUrl: res.data.profile.avatarUrl,
          backgroundUrl: res.data.profile.backgroundUrl
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      detailedinformation()
    }
  },
  //退出登录
  signout() {
    app.globalData.fly.get('/logout').then(res => {
      wx.removeStorage({
        key: 'id',
      })
      this.setData({
        id: ""
      })
    }).catch(err => {
      console.log(err)
    })
    console.log(this.data.code)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getid()
    if (this.data.id !== "") {
      this.detailedinformation()
    }
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
    this.getid()
    if (this.data.id !== "") {
      this.detailedinformation()
    }
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
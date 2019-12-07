// pages/more_programmes/more_programmes.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //轮播图显示小圆点
    autoplay: true, //自动切换
    interval: 3000, //切换时间间隔
    circular: true, //自动衔接
    banners: [], //轮播图数据
    programs: [], //节目
    cion: true, //控制页面底部加载状态栏开关
    name: "", //标题
  },
  //轮播图
  goTorequest() {
    app.globalData.fly.get('/banner').then(res => {
      this.setData({
        banners: res.data.banners
      })
      console.log(this.data.banners)
    }).catch(err => {
      console.log(err)
    })
  },
  //请求数据
  Moreprogrammes() {
    app.globalData.fly.get('/program/recommend').then(res => {
      this.setData({
        programs: res.data.programs,
        name: res.data.name
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //返回
  getreturn() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.goTorequest()
    this.Moreprogrammes()
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
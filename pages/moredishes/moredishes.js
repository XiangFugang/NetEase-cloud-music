// pages/moredishes/moredishes.js
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
    albums: [], //新碟
    limit: 12, //每次加载条数
    cion: true, //控制页面底部加载状态栏开关
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
  //新碟
  gonewdish() {
    this.setData({
      cion: false
    })
    app.globalData.fly.get(`/top/album?limit=${this.data.limit}`).then(res => {
      console.log(res, 345)
      this.setData({
        albums: res.data.albums
      })
      //console.log(this.data.albums, 22)
    }).catch(err => {
      console.log(err)
    })
    this.setData({
      cion: true
    })
  },
  //跳转专辑页
  goalbum(e) {
    console.log(e)
    if (e.currentTarget.dataset.id !== "") {
      wx.navigateTo({
        url: `/pages/album/album?id=${e.currentTarget.dataset.id}`,
      })
    } else {
      goalbum()
    }
  },
  //返回
  getreturn() {
    wx.navigateBack()
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
    this.goTorequest()
    this.gonewdish()
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
    this.setData({
      limit: 12
    })
    this.gonewdish()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      limit: this.data.limit += 12
    })
    this.gonewdish()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
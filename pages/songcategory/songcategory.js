// pages/songcategory/songcategory.js
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
    sum: 12, //页面默认加载的数据条数
    result: [], //歌单数据
    cion: true, //控制页面底部加载状态栏开关
  },
  //请求数据
  requestdata() {
    this.setData({
      cion: true
    })
    app.globalData.fly.get(`/personalized?limit=${this.data.sum}`).then(res => {
      this.setData({
        result: res.data.result
      })
      let arr = []
      for (let i = 0; i <= 3; i++) {
        arr.push(res.data.result[i].picUrl)
      }
      this.setData({
        banners: arr
      })
      //console.log(this.data.banners, 111)
      if (res.code === 200) {
        this.setData({
          cion: false
        })
      }
      //console.log(res)
    }).catch(err => {
      console.log(errt)
    })
  },
  //返回
  getreturn() {
    wx.navigateBack()
  },
  //点击宫格列表
  goTosongsheet(e) {
    if (e) {
      if (e.currentTarget) {
        wx.navigateTo({
          url: `/pages/songsheet/songsheet?id=${e.currentTarget.dataset.id}&copywriter=${e.currentTarget.dataset.copywriter}`,
        })
        //console.log(e, 111)
      } else {
        goTosongsheet()
      }
    } else {
      goTosongsheet()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestdata()
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
    this.setData({
      sum: this.data.sum += 12
    })
    this.requestdata()
    //console.log(111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
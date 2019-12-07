// pages/homepage/homepage.js
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
    result: [], //推荐歌单
    albums: [], //新碟
    newmusic: [], //新音乐
    radiostation: [], //推荐电台
    program: [], //推荐节目
    show: true, //判断是否开始搜索
  },
  //轮播图
  goTorequest() {
    app.globalData.fly.get('/banner').then(res => {
      this.setData({
        banners: res.data.banners
      })
      //console.log(this.data.banners)
    }).catch(err => {
      console.log(err)
    })
  },
  //歌单
  songCategory() {
    //console.log(222)
    wx.navigateTo({
      url: '/pages/songcategory/songcategory',
    })
  },
  //推荐歌单
  gorecommend() {
    app.globalData.fly.get('/personalized').then(res => {
      let arr = []
      for (let i = 0; i < 6; i++) {
        arr.push(res.data.result[i])
      }
      this.setData({
        result: arr
      })
      //console.log(res)
      //console.log(this.data.result, 11)
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转歌单详情页
  goTosongsheet(e) {
    //console.log(e, 11)
    if (e) {
      wx.navigateTo({
        url: `/pages/songsheet/songsheet?id=${e.currentTarget.dataset.id}&copywriter=${e.currentTarget.dataset.copywriter}`,
      })
      //console.log(e, 11)
    } else {
      goTosongsheet()
    }
  },
  //新碟
  gonewdish() {
    app.globalData.fly.get('/top/album').then(res => {
      let arr = []
      for (let i = 0; i < 3; i++) {
        arr.push(res.data.albums[i])
      }
      this.setData({
        albums: arr
      })
      console.log(this.data.albums, 22)
    }).catch(err => {
      console.log(err)
    })
  },
  gotoAlbum(e) {
    if (e.currentTarget.dataset.id !== "") {
      wx.navigateTo({
        url: `/pages/album/album?id=${e.currentTarget.dataset.id}`,
      })
    } else {
      gotoAlbum()
    }
    //console.log(e)
  },
  //新碟跳转新碟详情（专辑）
  Album(e) {
    //console.log(e)
    wx.navigateTo({
      url: `/pages/album/album?id=${e.currentTarget.dataset.id}`,
    })
  },
  //跳转更多新碟
  gomoredishes() {
    wx.navigateTo({
      url: '/pages/moredishes/moredishes',
    })
  },
  //新音乐
  newmusic() {
    app.globalData.fly.get('/personalized/newsong').then(res => {
      let arr = []
      for (let i = 0; i < 3; i++) {
        arr.push(res.data.result[i])
      }
      this.setData({
        newmusic: arr
      })
      //console.log(this.data.newmusic)
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转新音乐列表
  gomusic() {
    //console.log(e)
    wx.navigateTo({
      url: '/pages/freshMusic/freshMusic',
    })
  },
  //新音乐跳转播放列表
  gotoplye(e) {
    //console.log(e)
    if (e.currentTarget.dataset.id !== "") {
      wx.navigateTo({
        url: `/pages/playbackpage/playbackpage?obj=${e.currentTarget.dataset.id}`,
      })
    } else {
      gotoplye()
    }
  },
  //推荐电台
  radiostation() {
    app.globalData.fly.get('/personalized/djprogram').then(res => {
      this.setData({
        radiostation: res.data.result
      })
      console.log(this.data.radiostation)
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转电台详情
  radiodetails(e) {
    //console.log(e, 999)
    if (e.currentTarget.dataset.id !== "") {
      wx.navigateTo({
        url: `/pages/radiodetails/radiodetails?id=${e.currentTarget.dataset.id}`,
      })
    } else {
      radiodetails()
    }
  },
  //电台广场
  Radiosquare() {
    wx.navigateTo({
      url: '/pages/radiosquare/radiosquare',
    })
  },
  //推荐节目
  program() {
    app.globalData.fly.get('/program/recommend').then(res => {
      let arr = []
      for (let i = 0; i < 6; i++) {
        arr.push(res.data.programs[i])
      }
      this.setData({
        program: arr
      })
      //console.log(this.data.program)
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转更多节目
  more_programmes() {
    wx.navigateTo({
      url: '/pages/more_programmes/more_programmes',
    })
  },
  //输入框聚焦
  focus() {
    //console.log(1111)
    this.setData({
      show: false
    })
  },
  //接受子组件的传值
  goReturn(e){
    this.setData({
      show: e.detail
    })
    console.log(e,222)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.goTorequest()
    this.gorecommend()
    this.gonewdish()
    this.newmusic()
    this.radiostation()
    this.program()
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
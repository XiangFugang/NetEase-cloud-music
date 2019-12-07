const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //歌手id
    name: "", //歌手名
    picUrl: "", //歌手照片
    hotSongs: [], //歌手歌曲
    url: "", //播放音乐的路径
    playIcon: false, //控制播放图标
    sum: -1, //点击的歌曲的index
  },
  //数据请求
  datarequest() {
    app.globalData.fly.get(`/artists/top/song?id=${this.data.id}`).then(res => {
      this.setData({
        name: res.data.artist.name,
        picUrl: res.data.artist.picUrl,
        hotSongs: res.data.hotSongs
      })
      console.log(this.data.hotSongs, 222)
    }).catch(err => {
      console.log(err)
    })
  },
  //播放按钮
  play(e) {
    if (e.currentTarget.dataset.index === this.data.sum) {

      this.setData({
        url: e.currentTarget.dataset.id,
        sum: e.currentTarget.dataset.index,
        playIcon: !this.data.playIcon,
      })

    } else {
      this.setData({
        sum: e.currentTarget.dataset.index,
        playIcon: true
      })
    }
    console.log(this.data.playIcon)
    console.log(this.data.sum)
    if (this.data.playIcon) {
      let obj = {}
      obj.icon = e.currentTarget.dataset.icon;
      obj.name = e.currentTarget.dataset.name;
      obj.id = e.currentTarget.dataset.id;
      wx.setStorageSync("songinformation", obj)
      //获取音乐播放路径
      app.globalData.fly.get(`/song/url?id=${e.currentTarget.dataset.id}`).then(res => {
        backgroundAudioManager.src = res.data.data[0].url;
        backgroundAudioManager.title = e.currentTarget.dataset.name;
        backgroundAudioManager.play()
        console.log(res, 1234)
      }).catch(err => {
        console.log(err)
      })
    } else {
      backgroundAudioManager.pause()
    }
  },
  //跳转播放界面
  toplay(e) {
    //console.log(e)
    wx.navigateTo({
      url: `/pages/playbackpage/playbackpage?ids=${e.currentTarget.dataset.ids}&play=${this.data.playIcon}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    //console.log(this.data.id)
    this.datarequest()
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
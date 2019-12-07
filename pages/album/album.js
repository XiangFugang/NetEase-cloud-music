// pages/album/album.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //专辑id
    blurPicUrl: "", //背景与图片
    name: "", //专辑名
    creators: "", //作者
    alias: [], //专辑别名
    description: "", //作者评价
    songs: [], //专辑歌曲
    playIcon: "", //播放歌曲的图片
    playname: "", //播放歌曲的名字
    ids: "", //播放歌曲的id
    subscribedCount:"",//收藏
  },
  //数据请求,获取专辑内容
  Datarequest() {
    if (this.data.id !== "") {
      let arr = []
      app.globalData.fly.get(`/album?id=${this.data.id}`).then(res => {
        console.log(res, 998)
        this.setData({
          blurPicUrl: res.data.album.blurPicUrl,
          name: res.data.album.name,
          alias: res.data.album.alias,
          description: res.data.album.description,
          songs: res.data.songs,
          subscribedCount: res.data.album.info.shareCount
        })
        if (res.data.songs[0].ar.length > 1) {
          for (let i = 0; i = res.songs[0].ar.length; i++) {
            arr.push(res.data.songs[0].ar[i].name)
          }
          this.setData({
            creators: arr.join('/')
          })
        } else {
          this.setData({
            creators: res.data.songs[0].ar[0].name
          })

        }
        console.log(this.data.creators, 55565)
        console.log(res, 111)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  //返回
  getreturn() {
    wx.navigateBack()
  },
  //歌曲播放与本地存储
  details(e) {
    this.setData({
      playIcon: e.currentTarget.dataset.icon,
      playname: e.currentTarget.dataset.name,
      ids: e.currentTarget.dataset.id
    })
    console.log(e, 790)
    let obj = {}
    obj.icon = this.data.playIcon;
    obj.name = this.data.playname;
    obj.id = this.data.ids
    wx.setStorageSync("songinformation", obj)
  },
  //获取历史播放记录
  gotostorage() {
    let obj = wx.getStorageSync('songinformation')
    this.setData({
      playIcon: obj.icon,
      playname: obj.name,
      ids: obj.id
    })
    //console.log(this.data.playname, 888)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.Datarequest()
    this.gotostorage()
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
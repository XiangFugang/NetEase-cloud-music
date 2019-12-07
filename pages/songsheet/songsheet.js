// pages/songsheet/songsheet.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //获取歌曲id
    copywriter: "", //歌曲的推荐编辑
    backgroundpicture: "", //背景图片和介绍图片
    name: "", //标题
    avatarUrl: "", //头像
    nickname: "", //昵称
    description: "", //作者自我评论
    commentCount: "", //评论
    info: [], //装数据
    subscribedCount: "", //收藏
    tracks: [], //全部歌曲列表
    playIcon: "", //底部播放歌曲图标
    playname: "", //底部播放歌曲歌名
    ids: "" //播放歌曲id
  },
  //获取歌单详细数据
  getdetails() {
    if (this.data.id !== "") {
      let id = this.data.id
      app.globalData.fly.get(`/playlist/detail?id=${id}`).then(res => {
        this.setData({
          backgroundpicture: res.data.playlist.coverImgUrl,
          name: res.data.playlist.name,
          avatarUrl: res.data.playlist.creator.avatarUrl,
          nickname: res.data.playlist.creator.nickname,
          description: res.data.playlist.description,
          commentCount: res.data.playlist.commentCount,
          info: res.data.playlist,
          subscribedCount: res.data.playlist.subscribedCount,
          tracks: res.data.playlist.tracks
        })
       // console.log(this.data.tracks)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  //返回
  getreturn() {
    wx.navigateBack()
  },
  //点击播放
  goToplay(e) {
    //console.log(e,11)
    this.setData({
      playIcon: e.currentTarget.dataset.list.al.picUrl,
      playname: e.currentTarget.dataset.list.name,
      ids: e.currentTarget.dataset.list.id
    })
    let obj = {}
    obj.icon = this.data.playIcon;
    obj.name = this.data.playname;
    obj.id = this.data.ids
    wx.setStorageSync("songinformation", obj)
   // console.log(this.data.ids, 666)
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
  //跳转歌曲播放页
  goPlaybackpage() {
    let obj = wx.getStorageSync('songinformation')
wx.navigateTo({
  url: `/pages/playbackpage/playbackpage?obj=${obj.id}`,
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      id: options.id,
      copywriter: options.copywriter
    })
    //console.log(this.data.id)
    this.gotostorage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getdetails()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.gotostorage()
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
// pages/singer/singer.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 5001,
    artists: [], //歌手请求的数据
    singercategory: ['入驻歌手', '华语男歌手',
      '华语女歌手', '华语组合', '欧美男歌手',
      '欧美女歌手', '欧美组合', '日本男歌手',
      '日本女歌手', '日本组合', '韩国男歌手',
      '韩国女歌手', '韩国组合', '其他男歌手',
      '其他女歌手', '其他'
    ], //歌手类别
    letter: ['A', 'B', 'C',
      'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W',
      'X', 'Y', 'Z'
    ] //字母
  },
  //请求数据
  singer() {
    app.globalData.fly.get(`/artist/list?cat=${this.data.id}`).then(res => {
      this.setData({
        artists: res.data.artists
      })
      console.log(this.data.artists, 111)
      //console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转歌手详情
  goSingerdetails(e) {
    console.log(e, 222)
    if (e) {
      wx.navigateTo({
        url: `/pages/singerdetails/singerdetails?id=${e.currentTarget.dataset.id}`,
      })
    } else {
      goSingerdetails()
    }
    // wx.navigateTo({
    //   url: `/pages/singerdetails/singerdetails?id=${}`,
    // })
  },
  //歌手类型点击事件
  click(e) {
    if (e.detail.name === "入驻歌手") {
      this.setData({
        id: 5001
      })
      this.singer()
    }

    if (e.detail.name === "华语男歌手") {
      this.setData({
        id: 1001
      })
      this.singer()
    }

    if (e.detail.name === "华语女歌手") {
      this.setData({
        id: 1002
      })
      this.singer()
    }

    if (e.detail.name === "华语组合") {
      this.setData({
        id: 1003
      })
      this.singer()
    }

    if (e.detail.name === "欧美男歌手") {
      this.setData({
        id: 2001
      })
      this.singer()
    }

    if (e.detail.name === "欧美女歌手") {
      this.setData({
        id: 2002
      })
      this.singer()
    }

    if (e.detail.name === "欧美组合") {
      this.setData({
        id: 2003
      })
      this.singer()
    }

    if (e.detail.name === "日本男歌手") {
      this.setData({
        id: 6001
      })
      this.singer()
    }

    if (e.detail.name === "日本女歌手") {
      this.setData({
        id: 6002
      })
      this.singer()
    }

    if (e.detail.name === "日本组合") {
      this.setData({
        id: 6003
      })
      this.singer()
    }

    if (e.detail.name === "韩国男歌手") {
      this.setData({
        id: 7001
      })
      this.singer()
    }

    if (e.detail.name === "韩国女歌手") {
      this.setData({
        id: 7002
      })
      this.singer()
    }

    if (e.detail.name === "韩国组合") {
      this.setData({
        id: 7003
      })
      this.singer()
    }

    if (e.detail.name === "其他男歌手") {
      this.setData({
        id: 4001
      })
      this.singer()
    }

    if (e.detail.name === "其他女歌手") {
      this.setData({
        id: 4002
      })
      this.singer()
    }

    if (e.detail.name === "其他") {
      this.setData({
        id: 4003
      })
      this.singer()
    }
    //console.log(this.data.id)
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
    this.singer()
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
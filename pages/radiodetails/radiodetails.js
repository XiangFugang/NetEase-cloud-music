// pages/radiodetails/radiodetails.js
const app = getApp();
const time = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //电台id
    picUrl: "", //背景图片
    name: "", //名字
    subCount: "", //订阅人数
    selectionnumber: 1, //详情节目选择
    avatarUrl: "", //头像
    nickname: "", //昵称
    category: "", //分类
    desc: "", //介绍
    commentDatas: [], //评论
    sum: 12, //电台节目默认加载条数
    programs: [], //节目数据
    count: "", //节目期数
    indexof: "", //记录点击的是那一条数据
  },
  //电台详情
  details() {
    if (this.data.id !== "") {
      //console.log(this.data.id)
      app.globalData.fly.get(`/dj/detail?rid=${this.data.id}`).then(res => {
        this.setData({
          picUrl: res.data.djRadio.picUrl,
          name: res.data.djRadio.name,
          subCount: res.data.djRadio.subCount,
          avatarUrl: res.data.djRadio.dj.avatarUrl,
          nickname: res.data.djRadio.dj.nickname,
          category: res.data.djRadio.category,
          desc: res.data.djRadio.desc,
          commentDatas: res.data.djRadio.commentDatas,
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      details()
    }
  },
  //电台节目
  program() {
    if (this.data.id !== "") {
      app.globalData.fly.get(`/dj/program?rid=${this.data.id}&limit=${this.data.sum}`).then(res => {
        res.data.programs.map(item => {
          item.createTime = time.formatTime(item.createTime)
          if (item.listenerCount >= 1000) {
            item.listenerCount = (item.listenerCount / 10000).toFixed(1) + '万'
          } else {
            item.listenerCount = item.listenerCount
          }
          if (item.duration >= 60000) {
            let m = parseInt(item.duration / 60000)
            let s = (item.duration / 60000) % 60
            if (m < 10) {
              m = '0' + m
            } else {
              m = m
            }
            if (s < 10) {
              s = '0' + s
            } else {
              s = s
            }
            item.duration = m + ':' + s
          } else {
            item.duration = '00' + ':' + parseInt(item.duration / 1000)
          }
        })
        this.setData({
          count: res.data.count,
          programs: res.data.programs,
        })
        console.log(this.data.programs)
      }).catch(err => {
        console.log(err)
      })
    } else {
      program()
    }
  },
  //返回
  goreturn() {
    wx.navigateBack()
  },
  //点击播放
  play(e) {
    this.setData({
      indexof: e.currentTarget.dataset.index
    })
    console.log(this.data.indexof)
  },
  //详情节目选择
  Choice(e) {
    // console.log(e)
    this.setData({
      selectionnumber: e.currentTarget.dataset.choice
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      id: options.id
    })
    this.details()
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
  onShow: function() {},

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
    if (this.data.selectionnumber == 2) {
      this.setData({
        sum: this.data.sum += 12
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
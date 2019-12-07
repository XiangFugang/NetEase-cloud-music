// components/search/search.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    revert: true, //返回
    data: [], //热榜数据
    arr: [], //接收本地存储的历史记录
    value: "", //历史记录
    placeholder: "", //默认搜索关键字
    songCount: true, //判断搜索数据请求的状态
    Navigation: ['综合', '单曲', '云村', '视频', '歌手', '专辑', '歌单', '主播电台', '用户'],
    type: "1018", //搜索类型
    result: [] //综合歌单数据
  },
  // 实时监听
  ready() {
    this.hotsearch()
    this.obtain()
    this.defaultsearch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //返回
    goReturn() {
      this.triggerEvent("revert", this.data.revert)
    },
    //请求数据
    hotsearch() {
      app.globalData.fly.get('/search/hot/detail').then(res => {
        this.setData({
          data: res.data.data
        })
        console.log(this.data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    //默认搜索关键字
    defaultsearch() {
      app.globalData.fly.get('/search/default').then(res => {
        this.setData({
          placeholder: res.data.data.realkeyword
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    //发送搜索请求
    search() {
      app.globalData.fly.get(`/search?keywords=${this.data.value}&type=${this.data.type}`).then(res => {
        this.setData({
          songCount: false,
        })
        if (this.data.type == 1018) {
          this.setData({
            result: res.data.result
          })
          console.log(this.data.songs)
        }
        console.log(res, 111)
      }).catch(err => {
        console.log(err)
      })
    },
    // //搜索建议
    // searchsuggestion() {
    //   app.globalData.fly.get('/search/hot').then(res => {
    //     console.log(res, 222)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    //点击完成时
    complete(e) {
      //console.log(e)
      //console.log(111)
      if (e.detail.value !== "") {
        this.setData({
          value: e.detail.value
        })
        this.search() //发送搜索请求
        //this.searchsuggestion()
        if (this.data.arr.indexOf(e.detail.value) === -1) {
          this.data.arr.push(e.detail.value)
          wx.setStorageSync('history', this.data.arr)
          // console.log(this.data.arr)
          this.obtain() //获取本地存储的历史搜索记录
        }
      } else {
        this.setData({
          value: this.data.placeholder
        })
        this.search() //发送搜索请求
      }
    },
    //获取本地存储的历史搜索记录
    obtain() {
      if (wx.getStorageSync('history')) {
        let arr = wx.getStorageSync('history')
        this.setData({
          arr
        })
        // console.log(this.data.arr, 1111111)
      }
    },
    //清除本地历史记录
    Eliminate() {
      wx.removeStorage({
        key: 'history',
      })
      this.setData({
        arr: []
      })
      this.obtain()
    },
    //历史记录用于搜索
    oncilck(e) {
      this.setData({
        value: e.currentTarget.dataset.text
      })
      this.search()
      //console.log(e)
    },
    //点击导航栏标签时
    gotoclick(e) {
      //console.log(e)
      if (e.detail.name === "综合") {
        this.setData({
          type: 1018
        })
        this.search()
      } else if (e.detail.name === "单曲") {
        this.setData({
          type: 1
        })
        this.search()
      } else if (e.detail.name === "云村") {
        this.setData({
          type: 1004
        })
        this.search()
      } else if (e.detail.name === "视频") {
        this.setData({
          type: 1014
        })
        this.search()
      } else if (e.detail.name === "歌手") {
        this.setData({
          type: 100
        })
        this.search()
      } else if (e.detail.name === "专辑") {
        this.setData({
          type: 10
        })
        this.search()
      } else if (e.detail.name === "歌单") {
        this.setData({
          type: 1000
        })
        this.search()
      } else if (e.detail.name === "主播电台") {
        this.setData({
          type: 1009
        })
        this.search()
      } else {
        this.setData({
          type: 1002
        })
        this.search()
      }
    },
  }
})
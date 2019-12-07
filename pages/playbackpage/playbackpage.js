// pages/playbackpage/playbackpage.js
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids: "", //播放歌曲id
    picUrl: "", //歌去图片
    name: "", //歌曲名
    singer: "", //歌手名
    like: false, //控制喜欢歌曲
    play: true, //播放与暂停
    loop: 1, //单曲与随机等
    url: "", //音乐路径
    duration: "", //音乐的总时长
    currentime: "", //当前播放时长
    startime: 0, //进度条变化的值
    endtime: 100, //进度条总长
  },
  //获取该音乐的信息
  requestdata() {
    let ids = this.data.ids
    app.globalData.fly.get(`/song/detail?ids=${ids}`).then(res => {
      this.setData({
        picUrl: res.data.songs[0].al.picUrl,
        name: res.data.songs[0].name,
        singer: res.data.songs[0].ar[0].name
      })



      //console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //返回
  getreturn() {
    wx.navigateBack()
  },
  //加入喜欢
  like() {
    this.setData({
      like: !this.data.like
    })
  },
  //默认播放
  defaultplayback() {

  },

  //获取音乐播放的路径
  musicAddress() {
    app.globalData.fly.get(`/song/url?id=${this.data.ids}`).then(res => {
      this.setData({
        url: res.data.data[0].url
      })
      //console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  // //播放与暂停
play() {
  this.setData({
    play: !this.data.play
  })
  if (this.data.play) {
    backgroundAudioManager.title = this.data.name;
    backgroundAudioManager.src = this.data.url;
    backgroundAudioManager.onTimeUpdate(() => {
      //当前播放时长
      let currentime = Math.floor(backgroundAudioManager.currentTime)
      let startime = Number(backgroundAudioManager.currentTime)
      this.setData({
        startime
      })
      if (currentime < 10) {
        let duration = '00' + ':' + '0' + currentime
        this.setData({
          currentime: duration
        })
      } else if (currentime >= 10 && currentime < 60) {
        let duration = '00' + ':' + currentime
        this.setData({
          currentime: duration
        })
      } else if (currentime >= 60 && currentime <= 600) {
        let m = Math.floor(currentime / 60)
        let s = currentime % 60
        if (s <= 10) {
          let duration = '0' + m + ':' + '0' + s
          this.setData({
            currentime: duration
          })
        } else {
          let duration = '0' + m + ':' + s
          this.setData({
            currentime: duration
          })
        }
        //console.log(duration, 222)
      } else {
        let m = Math.floor(currentime / 60)
        let s = currentime % 60
        let duration = m + ':' + s
        this.setData({
          currentime: duration
        })
      }
      //音乐总时长
      let time = Math.floor(backgroundAudioManager.duration)
      let endtime = Number(backgroundAudioManager.duration)
      this.setData({
        endtime
      })
      if (time < 60) {
        let duration = '0' + time + ':' + '00'
        this.setData({
          duration: duration
        })
        console.log(duration, 111)
      } else if (time >= 60 && time <= 600) {
        let m = Math.floor(time / 60)
        let s = time % 60
        let duration = '0' + m + ':' + s
        this.setData({
          duration: duration
        })
        //console.log(duration, 222)
      } else {
        let m = Math.floor(time / 60)
        let s = time % 60
        let duration = m + ':' + s
        this.setData({
          duration: duration
        })
      }
      //console.log(time)
    })
  } else {
    backgroundAudioManager.pause()
  }
},
// //控制单曲与随机等
loop(e) {
  if (this.data.loop < 3) {
    let sum = Number(this.data.loop) + 1
    this.setData({
      loop: sum
    })
  } else {
    this.setData({
      loop: 1
    })
  }
  console.log(this.data.loop, 222)
},
  //拖动进d条
  slide(e) {
    this.setData({
      startime: Number(e.detail.value)
    })
    backgroundAudioManager.seek(this.data.startime)
    console.log(e, 999)
  },
  //上一曲
  lastsong() {
    console.log(111)
  },
  //下一曲
  nextsong() {
    console.log(222)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.obj !== "") {
      this.setData({
        ids: options.obj,
      })
    }
    if (options.ids) {
      this.setData({

        ids: options.ids,
        play: options.play
      })
    }
    console.log(options, 111)
    this.requestdata()
    this.musicAddress()
    this.defaultplayback()
    // if (this.data.play) {
    //   this.play()
    // }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})






// if (this.data.play && this.data.url !== "") {
//   backgroundAudioManager.title = this.data.name;
//   backgroundAudioManager.src = this.data.url;
//   backgroundAudioManager.onTimeUpdate(() => {
//     let currentime = Math.floor(backgroundAudioManager.currentTime)
//     let startime = Number(backgroundAudioManager.currentTime)
//     this.setData({
//       startime
//     })
//     if (currentime < 10) {
//       let duration = '00' + ':' + '0' + currentime
//       this.setData({
//         currentime: duration
//       })
//     } else if (currentime >= 10 && currentime < 60) {
//       let duration = '00' + ':' + currentime
//       this.setData({
//         currentime: duration
//       })
//     } else if (currentime >= 60 && currentime <= 600) {
//       let m = Math.floor(currentime / 60)
//       let s = currentime % 60
//       if (s <= 10) {
//         let duration = '0' + m + ':' + '0' + s
//         this.setData({
//           currentime: duration
//         })
//       } else {
//         let duration = '0' + m + ':' + s
//         this.setData({
//           currentime: duration
//         })
//       }
//       //console.log(duration, 222)
//     } else {
//       let m = Math.floor(currentime / 60)
//       let s = currentime % 60
//       let duration = m + ':' + s
//       this.setData({
//         currentime: duration
//       })
//     }
//     //音乐总时长
//     let time = Math.floor(backgroundAudioManager.duration)
//     let endtime = Number(backgroundAudioManager.duration)
//     this.setData({
//       endtime
//     })
//     if (time < 60) {
//       let duration = '0' + time + ':' + '00'
//       this.setData({
//         duration: duration
//       })
//       console.log(duration, 111)
//     } else if (time >= 60 && time <= 600) {
//       let m = Math.floor(time / 60)
//       let s = time % 60
//       let duration = '0' + m + ':' + s
//       this.setData({
//         duration: duration
//       })
//       //console.log(duration, 222)
//     } else {
//       let m = Math.floor(time / 60)
//       let s = time % 60
//       let duration = m + ':' + s
//       this.setData({
//         duration: duration
//       })
//     }
//   })
// } else {
//   backgroundAudioManager.title = this.data.name;
//   backgroundAudioManager.src = this.data.url;
//   backgroundAudioManager.pause()
//   backgroundAudioManager.onTimeUpdate(() => {
//     let currentime = Math.floor(backgroundAudioManager.currentTime)
//     let startime = Number(backgroundAudioManager.currentTime)
//     this.setData({
//       startime
//     })
//     if (currentime < 10) {
//       let duration = '00' + ':' + '0' + currentime
//       this.setData({
//         currentime: duration
//       })
//     } else if (currentime >= 10 && currentime < 60) {
//       let duration = '00' + ':' + currentime
//       this.setData({
//         currentime: duration
//       })
//     } else if (currentime >= 60 && currentime <= 600) {
//       let m = Math.floor(currentime / 60)
//       let s = currentime % 60
//       if (s <= 10) {
//         let duration = '0' + m + ':' + '0' + s
//         this.setData({
//           currentime: duration
//         })
//       } else {
//         let duration = '0' + m + ':' + s
//         this.setData({
//           currentime: duration
//         })
//       }
//       //console.log(duration, 222)
//     } else {
//       let m = Math.floor(currentime / 60)
//       let s = currentime % 60
//       let duration = m + ':' + s
//       this.setData({
//         currentime: duration
//       })
//     }
//     //音乐总时长
//     let time = Math.floor(backgroundAudioManager.duration)
//     let endtime = Number(backgroundAudioManager.duration)
//     this.setData({
//       endtime
//     })
//     if (time < 60) {
//       let duration = '0' + time + ':' + '00'
//       this.setData({
//         duration: duration
//       })
//       console.log(duration, 111)
//     } else if (time >= 60 && time <= 600) {
//       let m = Math.floor(time / 60)
//       let s = time % 60
//       let duration = '0' + m + ':' + s
//       this.setData({
//         duration: duration
//       })
//       //console.log(duration, 222)
//     } else {
//       let m = Math.floor(time / 60)
//       let s = time % 60
//       let duration = m + ':' + s
//       this.setData({
//         duration: duration
//       })
//     }
//   })
// }
//   },

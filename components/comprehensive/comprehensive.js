// components/comprehensive/comprehensive.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result: {
      type: Object,
      default: item => {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: [],
    resul:{},
  },
  //实时加载
  ready() {
    if (this.data.result.song.songs.length > 0) {
      this.name()
    }
    console.log(this.data.data, 1111111)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //统计播放量
    playCount() {
      this.data.result.playList.playLists.map(item => {
        if (item.playCount >= 10000) {
          item.playCount = (item.playCount / 10000).toFixed(1) + '万次'
        } else {
          item.playCount = item.playCount + '万次'
        }
      })
    },
    //合并作者名
    name() {
      for (let i = 0; i < this.data.result.song.songs.length; i++) {
        let arr = []
        for (let j = 0; j < this.data.result.song.songs[i].ar.length; j++) {
          arr.push(this.data.result.song.songs[i].ar[j].name)
        }
        this.data.result.song.songs[i].data = arr.join('/') + '-' + this.data.result.song.songs[i].al.name
      }
      this.playCount()
      this.setData({
        data: this.data.result.song.songs,
        resul: this.data.result
      })
    },
  },
})
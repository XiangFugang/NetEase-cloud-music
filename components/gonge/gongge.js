// components/gonge/gongge.js
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
    sum: 12, //页面默认加载的数据条数
    result: [], //歌单数据
    cion: true, //控制页面底部加载状态栏开关
  },
  requestdata(){
    app.globalData.fly.get(`/personalized?limit=${this.data.sum}`).then(res =>{
  console.log(res)
}).catch(err =>{
  console.log(err)
})
  },
  /**
   * 组件的方法列表
   */
  ready(){

  },
  methods: {

  }
})

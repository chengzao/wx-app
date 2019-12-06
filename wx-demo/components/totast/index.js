Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 显示内容
    innerText: {
      type: String,
      value: 'default',
    },
    // 是否隐藏
    hidden: {
      type: Boolean,
      value: false
    },
    // 多少秒隐藏内容
    duration: {
      type: Number,
      value: 2000
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 清空计时器
    clearTimer: function () {
      clearInterval(this.timer)
      this.timer = null
    },
    // 执行
    init: function(){
      this.timer = setTimeout(() => {
        this.setData({
          hidden: true
        })
      }, this.data.duration)
    }
  },
  lifetimes: {
    attached: function () {
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      this.clearTimer()
    },
  },
  observers: {
    'hidden': function (n) {
      if(!n){
        this.clearTimer()
        this.init()
      }
    }
  }
})

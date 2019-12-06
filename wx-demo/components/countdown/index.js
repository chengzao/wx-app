Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否开始倒计时
    start: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal === true) {
          this.countdownFunc()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timerText: '获取验证码'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 触发页面点击事件
     */
    _getCountdownEvent() {
      this.triggerEvent("getCountdownEvent")
    },

    /**
     * 触发页面修改data事件
     */
    _setStartDataEvent() {
      this.triggerEvent("setStartDataEvent", this.data.start)
    },

    /**
     * 倒计时
     */
    countdownFunc() {
      this.setData({
        timerText: 60
      })
      let target = this
      let countdownNum = target.data.timerText

      let timer = setInterval(() => {
        countdownNum--

        target.setData({
          timerText: countdownNum
        })

        if (countdownNum == 0) {
          target.setData({
            timerText: '重新发送',
            start: false
          })
          this._setStartDataEvent() //倒计时为0时，让父组件的start重新设置为false
          clearInterval(timer) //清除定时器
        }
      }, 1000)
    }
  }
})

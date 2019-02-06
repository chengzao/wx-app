function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    // 视频字段
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    videoImageSrc: '',
    showVideo: true,
    showShare: false,
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],
    inputValue: ''
  },
  /**
    * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    this.videoContext = wx.createVideoContext("video")
  },

  /**
   * 播放视频
   */
  playVideo: function () {
    var that = this;
    that.setData({
      showVideo: false
    });
    // videoContext 的定义在 onReady 上
    this.videoContext.play();
  },


  handleShare: function () {
    console.log('Clike Me handle share')
    this.setData({
      showShare: true
    })
    // 暂定播放
    this.videoContext.pause();
  },
  handleShareMask: function () {
    this.setData({
      showShare: false
    })

    // 继续播放
    this.videoContext.play();
  },
  bindInputBlur: function (e) {
    let _inputValue = e.detail.value
    this.setData({
      inputValue: _inputValue
    })
  },
  bindSendDanmu: function () {
    let _inputValue = this.data.inputValue


    this.videoContext.sendDanmu({
      text: _inputValue,
      color: getRandomColor()
    })
    
    this.setData({
      inputValue: ''
    })
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
})

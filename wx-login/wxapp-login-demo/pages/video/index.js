// pages/video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: '',
    src: '',
    img_src: ''
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (data) {
        console.log(' success ', data)

        // 上传到服务器
        const tempFilePaths = data.tempFilePath

        let uploadTask = wx.uploadFile({
          url: 'http://localhost:8080/upload',
          filePath: tempFilePaths,
          name: 'video',
          success(res) {

            console.log('data', res)

            // TODO
            that.setData({
              src: data.tempFilePath,
              poster: data.thumbTempFilePath
            })
            //do something
          },
          fail(err) {
            console.log('fail', err)
          }
        })

        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })

        // uploadTask.abort() // 取消上传任务

      },
      fail: function (err) {
        console.log(' fail ', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

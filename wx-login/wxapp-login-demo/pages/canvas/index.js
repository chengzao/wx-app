// pages/video/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src: ''
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
  createCanvasImage: function () {
    let that = this;
    let ctx = wx.createCanvasContext('video')

    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 100)
    ctx.fillRect(50, 50, 150, 100)
    ctx.draw(true, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 300,
        height: 150,
        destWidth: 300,
        destHeight: 150,
        canvasId: 'video',
        success(res) {
          let _tempFileImg = res.tempFilePath;
          that.setData({
            img_src: _tempFileImg
          })
        }
      })
    })
  },
  downLoadImage: function () {
    wx.getSetting({
      success (res) {
        console.log(' getSetting ', res.authSetting['scope.writePhotosAlbum'])
        if (!res.authSetting['scope.writePhotosAlbum']){
          console.log(' 未授权相册 ')
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success (res) {
              console.log('authorize successed',res)
              wx.saveImageToPhotosAlbum({
                filePath: src,
                success(res) {
                  console.log(' success download image ', res)
                },
                fail(err) {
                  console.log(' fail download image ', err)
                }
              })
            },
            fail (err) {
              console.log(' authorize fail ', err)
              wx.openSetting({
                success (data) {
                  console.log("openSetting: success");
                },
                fail (err) {
                  console.log(' openSetting fail ')
                }
              });
            }
          })
        }else{
          console.log(' 已授权相册 ')
          wx.saveImageToPhotosAlbum({
            filePath: src,
            success(res) {
              console.log(' success download image ', res)
            },
            fail(err) {
              console.log(' fail download image ', err)
            }
          })
        }
      },
      fail (err) {
        console.log(' getSetting fail ', err)
      }
    })


    let src = this.data.img_src;
    console.log(src)

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

  },
  getUserInfo: function (e) {
    console.log(' getUserInfo ',e.detail)
  }
})

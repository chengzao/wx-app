Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture_src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  uploadImage: function () {
    let that = this
    wx.getSetting({
      success (res) {
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']){
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              wx.chooseImage({
                success: function(res) {
                  console.log('选取图片成功',res)
                },
                fail () {
                  console.log('选取图片失败')
                }
              })
            },
            fail () {
              console.log('手动授权失败')
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
          console.log('已经授权')
          wx.chooseImage({
            success: function (res) {
              console.log('选取图片成功', res)
              let _img = res.tempFilePaths[0]
              that.setData({
                picture_src: _img
              })
            },
            fail() {
              console.log('选取图片失败')
            }
          })
        }
      },
      fail () {
        console.log('获取授权失败')
      }
    })
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

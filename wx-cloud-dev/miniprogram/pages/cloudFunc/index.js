// miniprogram/pages/cloudFunc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 调用云函数
  callFuncCloude: function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'sum',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function (res) {
        console.log(res.result) // 3
      },
      fail: console.error
    })

    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'add',
    //   // 传给云函数的参数
    //   data: {
    //     a: 1,
    //     b: 2,
    //   },
    // })
    //   .then(res => {
    //     console.log(res.result) // 3
    //   })
    //   .catch(console.error)


    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
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
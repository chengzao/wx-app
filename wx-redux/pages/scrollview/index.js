Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [1,2,3,4],
    scrollTop: 100
  },
  upper: function (e) {
    console.log('upper')

    let _arr = this.data.arr

    let num = _arr[0]

    _arr.unshift(num - 4, num - 3, num - 2, num - 1)

    this.setData({
      arr: _arr
    })    

  },
  lower: function (e) {
    console.log('lower')
    let _arr = this.data.arr

    let num = _arr.length

    _arr.push(num+1,num+2,num+3,num+4)

    this.setData({
      arr: _arr
    })
  },
  scroll: function (e) {
    // console.log(e)
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
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
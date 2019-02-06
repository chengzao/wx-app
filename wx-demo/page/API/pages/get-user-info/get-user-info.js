const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: '获取用户信息',
      path: 'page/API/pages/get-user-info/get-user-info'
    }
  },

  data: {
    hasUserInfo: false
  },
  getUserInfo(ev) {
    const that = this
    function _getUserInfo() {
      wx.getUserInfo({
        success(res) {
          console.log(res)
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
        }
      })
    }

    if (app.globalData.hasLogin === false) {
      console.log('app.globalData.hasLogin')
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }
  },
  clear() {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
  }
})

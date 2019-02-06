//index.js
import http from '@chunpu/http'

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    app.ready(() => {
      // console.log('userinfo', app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo
      })
    })

  },
  bindUserInfo: function(e) {
    var detail = e.detail
    console.log({detail})
    if (detail.iv) {
      http.post('/user/bindinfo', {
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        signature: detail.signature
      }).then((res) => {
        console.log(' res ', res)
        return app.getUserInfo().then(userInfo => {
          console.log('bind userinfo', userInfo)
          this.setData({
            userInfo: userInfo
          })
        })
      })
    }
  },
  bindPhoneNumber(e) {
    var detail = e.detail
    console.log({ detail })
    if (detail.iv) {
      http.post('/user/bindphone', {
        encryptedData: detail.encryptedData,
        iv: detail.iv
      }).then(() => {
        return app.getUserInfo().then(userInfo => {
          this.setData({
            userInfo: userInfo
          })
        })
      })
    }
  },

})

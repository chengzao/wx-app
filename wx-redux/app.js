//app.js
const {Provider} = require('./libs/wechat-weapp-redux.js');
const configureStore = require('./configureStore.js');
import wxp from './libs/wxp.min.js'

App(Provider(configureStore())({
  onLaunch: function () {
    console.log("onLaunch")

    // 登录
    wxp.login().then(resp => {
      console.log('调起登陆授权:', resp)
    })
    // 获取用户信息
    wxp.getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wxp.getUserInfo().then(res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        })
      }
    }).catch(({ errMsg }) => {
      // 没有获取到用户信息
      wxp.showToast({
        title: errMsg,
        icon: 'none'
      })
    })  


  },
  globalData: {
    userInfo: null
  }
}))
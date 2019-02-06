//app.js
import util from './utils/util'
import http from '@chunpu/http'
import Ready from 'min-ready'

const ready = Ready()

App({
  onLaunch: function () {
    util.promisify(wx.checkSession)().then(() => {
      console.log('session 生效')
      return this.getUserInfo()
    }).then(userInfo => {
      console.log('登录成功', userInfo)
    }).catch(err => {
      console.log(`自动登录失败, 重新登录`, err)
      return this.login()
    }).catch(err => {
      console.log(`手动登录失败`, err)
    })

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })


  },
  login () {
    console.log('登录')
    return util.promisify(wx.login)().then(({code}) => {
      console.log(`code: ${code}`)
      return http.post('/oauth/login', {
        code,
        type: 'wxapp'
      })
    }).then((res) => {
      console.log('登录返回 ', res)  
      return this.getUserInfo()
    })
  },
  getUserInfo () {
    return http.get('/user/info').then(response => {
      console.log('获取用户信息', response)
      let data = response.data
      if (data && typeof data === 'object') {
        this.globalData.userInfo = data
        ready.open()
        return data
      }
      return Promise.reject(response)
    })
  },
  ready (func) {
    ready.queue(func)
  },
  globalData: {
    userInfo: null
  }
})

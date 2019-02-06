const openIdUrl = require('./config').openIdUrl

App({
  onLaunch(opts) {
    console.log('App Launch', opts)

    // 获取用户信息
    this.getUserInfo()
    // 更新版本
    this.updataManager()


  },
  getUserInfo() {
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success(res) {
              console.log('app ', res)
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail(err) {
        let {errMsg} = err
        wx.showToast({
          title: errMsg,
          icon: 'none'
        })
      }
    })


  },
  updataManager() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
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
    })
  },
  onShow(opts) {
    console.log('App Show', opts)
    // 获取物理设备的型号信息
    try {
      let res = wx.getSystemInfoSync()
      // 判断该设备是否为iPhone X
      let ipx = /iphone/gi.test(res.model) && (res.screenHeight == 812 && res.screenWidth == 375);
      this.globalData.isIPX = ipx;
      console.log('os is :', res);
    } catch (e) {
      // Do something when catch error
    }

    let _networkStatus = Object.create({});

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        // console.log('networkType', networkType)
        _networkStatus.type = networkType;
      }
    })

    this.globalData.networkStatus = _networkStatus;
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: null,
    isIPX: null, //是否为iPhone X 
    networkStatus: null,
  },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})

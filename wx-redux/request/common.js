import regeneratorRuntime from "../libs/runtime.js"

class RequsetApi {
  getGithub () {
    return new Promise( (resolve, reject) => {
      wx.request({
        url: 'https://api.github.com/users/chengzao',
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          resolve(res.data)
         },
        fail: function (res) { 
          reject(res)
        },
        complete: function (res) { 
          resolve('completed')
        },
      })
    })
  }

  async wxRequest (url, params = {}) {
    Object.assign(params, {
      token: wx.getStorageSync('token')
    })
    // 所有的请求，header默认携带token
    let header = params.header || {
      'Content-Type': 'application/json',
      'token': params.token || ''
    }
    let data = params.data || {}
    let method = params.method || 'GET'
    // hideLoading可以控制是否显示加载状态
    if (!params.hideLoading) {
      wx.showLoading({
        title: '加载中...',
      })
    }
    let res = await new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: header,
        success: (res) => {
          if (res && res.statusCode == 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        },
        complete: (e) => {
          wx.hideLoading()
        }
      })
    })
    return res
  }

}


export default new RequsetApi
import md5 from '../utils/md5.min.js'

// 获取小程序全局配置
const app = getApp()

// 封装网络请求开始
const http = ({ url, params, method,header={}, ...other } = {}) => {
  // 添加请求加载等待
  wx.showLoading({
    title: '加载中...'
  })
  // Promise封装处理
  return new Promise((resolve, reject) => {
    wx.request({
      // 请求地址拼接
      url: url,
      data: params,
      // 获取请求头配置
      header: header,
      method: method,
      ...other,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail(error) {
        reject(error)
        // 关闭等待
        wx.hideLoading()
      },
      // 成功或失败处理
      complete: (res) => {
        // 关闭等待
        wx.hideLoading()
      }
    })
  })
}

const _get = (url, params = {}) => {
  return http({
    url,
    params
  })
}
const _post = (url, params = {}, header={}) => {
  return http({
    url,
    params,
    header,
    method: 'post'
  })
}
const _put = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'put'
  })
}
const _delete = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'delete'
  })
}

module.exports = {
  _get,
  _post,
  _put,
  _delete
}
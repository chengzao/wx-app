/*
 * @description: 网络请求拦截器（注意拦截器中的this是指向minapp-api-promise实例本身）
 * @Author: bigmeow
 * @Date: 2018-03-26 15:59:42
 */
import regeneratorRuntime from "../libs/runtime.js"
export default {
  // 发出请求时的回调函数
  config(config) {
    // 请求前设置token
    // const globalData = getApp().globalData
    // if (globalData.auth && globalData.auth.token) {
    //   config.header = {
    //     Authorization: globalData.auth.token
    //   }
    // }
    // return config
    
    // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
    config.timestamp = +new Date();
    console.log('request before config: ', config);
    // 必须返回OBJECT参数对象，否则无法发送请求到服务端
    return config;
  },

  // 请求成功后的回调函数
  async success(resp) {
    this.hideLoading()
    let errorMesg = ''
    // 可以在这里对收到的响应数据对象进行加工处理
    switch (resp.statusCode) {
      case 200:
        console.log('正常请求')
        break
      case 401:
        console.log('未登陆,拦截重定向登陆界面')
        await this.redirectTo({
          url: 'login'
        })
        break
      case 403:
        console.log('未授权接口,拦截')
        this.showModal({
          title: '警告',
          content: (resp.data.error && (resp.data.error.details || resp.data.error.message)) || '无权请联系管理员',
          confirmText: '我知道了',
          showCancel: false
        })
        throw new Error(errorMesg)
      case 500:
      case 502:
        errorMesg = (resp.data.error && (resp.data.error.details || resp.data.error.message)) || '服务器出错'
        break
      case 503:
        errorMesg = '哦～服务器宕机了'
        break
    }
    if (errorMesg.length > 0) {
      this.showToast({
        title: errorMesg,
        icon: 'none'
      })
      throw new Error(errorMesg)
    }
    return resp
  },

  fail(resp) {
    this.hideLoading()
    this.showToast({
      title: '网络连接失败',
      icon: 'none'
    })
  }
}
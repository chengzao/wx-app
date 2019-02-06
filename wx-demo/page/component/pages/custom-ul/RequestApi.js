function requestLoading(url, params, message) {
  // console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  return new Promise(function (resolve, reject){
    wx.request({
      url: url,
      data: params,
      header: {
        // 'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        if (res.statusCode == 200) {
          resolve(res)
        } else {
          reject(res)
        }
        // resolve(res)
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        reject(res)
      },
      complete: function (res) {
        resolve(res);
      },
    })
  }).catch(function(error){
    return error;
  })
}
module.exports = {
  requestLoading: requestLoading
}

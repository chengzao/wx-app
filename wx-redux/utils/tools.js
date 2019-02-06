/**
 * @description 检测字符串
 */
let checkType = (function () {
  let rules = {
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    },
    mobile(str) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    },
    tel(str) {
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    },
    number(str) {
      return /^[0-9]$/.test(str);
    },
    english(str) {
      return /^[a-zA-Z]+$/.test(str);
    },
    text(str) {
      return /^\w+$/.test(str);
    },
    chinese(str) {
      return /^[\u4E00-\u9FA5]+$/.test(str);
    },
    lower(str) {
      return /^[a-z]+$/.test(str);
    },
    upper(str) {
      return /^[A-Z]+$/.test(str);
    }
  };
  return {
    /**
    * @description 检测接口
    * @param str 待处理字符串
    * @param type 待检测的类型
    */
    check(str, type) {
      return rules[type] ? rules[type](str) : false;
    },
    /**
    * @description 添加规则扩展接口
    * @param type 规则名称
    * @param fn 处理函数
    */
    addRule(type, fn) {
      rules[type] = fn;
    }
  }
})()
/**
 * 去除空格
 */
let trims = {
  /**
   * @description 清除左右空格
   */
  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  /**
   * @description 清除所有空格
   */
  trimAll(str) {
    return str.replace(/\s+/g, "");
  },
  /**
   * @description 清除左空格
   */
  trimLeft(str) {
    return str.replace(/(^\s*)/g, "");
  },
  /**
   * @description 清除右空格
   */
  trimRight(str) {
    return str.replace(/(\s*$)/g, "");
  }

}

/**
 * 判断是否是iphonex
 */
let isIphoneX = function (that) {
    let appInstance = getApp();
    let isIpx = appInstance.globalData.isIPX ? true : false;
    that.setData({ 'isIpx': isIpx });
}

let networkStatus = function (callback){
  let _networkStatus = Object.create({});
  wx.onNetworkStatusChange(function (res) {
    let { isConnected, networkType } = res;
    _networkStatus = { 'connected': isConnected, 'type': networkType }
    return callback && callback.call(this, _networkStatus)
  })
}
/**
 * 将小程序的异步函数promise
 */
const promisify = original => {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

/**
 * 返回随机颜色
 */
let randomColor = function () {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

module.exports = {
  checkType,
  trims,
  isIphoneX,
  networkStatus  
}
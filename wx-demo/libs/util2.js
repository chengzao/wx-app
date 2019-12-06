const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDateTime = (time, fmt) => {
  var date = new Date(time)
  var o = {
    'Y+': date.getFullYear(), // 年
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        o[k] < 10 ? '0' + o[k] : o[k],
      )
    }
  }
  return fmt
}

const formatMoney = function (num) {
  if (num == '0') {
    return "0.00";
  }
  if (num == undefined || num == '' || num == null) {
    return '-';
  }
  return parseFloat(num).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

const ephemeral = (target, ttl = 60) => {
  const CREATED_AT = Date.now()
  const isExpired = () => (Date.now() - CREATED_AT) > (ttl * 1000)

  return new Proxy(target, {
    get: (obj, prop) => isExpired() ? undefined : Reflect.get(obj, prop)
  })
}

// 手机号码
const TelphoneRegexp = /^((\+|00)86)?1\d{10}$/

// 身份证号, 支持1/2代(15位/18位数字)
const IDRegexp = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

const verifyPhoneNumber = num => TelphoneRegexp.test(num)

const verifyIDCard = num => IDRegexp.test(num)

/**
 * 类型判断
 * @param {Any} value 任意需要判断的参数
 * @return {String} 返回的类型
 */
const type = value => {
  let str = Object.prototype.toString.call(value).split(' ')[1];
  str = str.substr(0, str.length - 1);
  /* Object Array Boolean String Function Number ... */
  return str;
}

/**
 * 将对象解析成url字符串
 * @param  {Object} obj 参数对象
 * @param  {Boolean} unEncodeURI 不使用编码
 * @return {String} 转换之后的url参数
 */
const param = (obj = {}, unEncodeURI) => {
  let result = [];
  for (let name of Object.keys(obj)) {
    let value = obj[name];

    result.push(name + '=' + (unEncodeURI ? value : encodeURIComponent(value)));
  }
  if (result.length) {
    return '?' + result.join('&');
  } else {
    return '';
  }
}

/**
 * 将url字符串解析成对象
 * @param  {String} str 带url参数的地址
 * @param  {Boolean} unDecodeURI 不使用解码
 * @return {Object} 转换之后的url参数
 */
const unparam = (str = '', unDecodeURI) => {
  let result = {};
  let query = str.split('?')[1];
  if (!query) return result;
  let arr = query.split('&');
  arr.forEach((item, idx) => {
    let param = item.split('=');
    let name = param[0];
    let value = param[1] || '';

    if (name) {
      result[name] = unDecodeURI ? value : decodeURIComponent(value);
    }
  });
  return result;
}


module.exports = {
  type,
  formatTime,
  formatDateTime,
  formatNumber,
  formatMoney,
  ephemeral,
  verifyPhoneNumber,
  verifyIDCard
}

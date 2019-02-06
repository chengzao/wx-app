/**
 * 渠道缓存
 */
class MinStorage {
  constructor (){

  }
  setStorage (value) {
    // if (!value){return false;}
    let hasUPC = wx.getStorageSync('upc');
    let _json;
    // console.log('hasUPC', hasUPC);  
    if (hasUPC && (JSON.parse(hasUPC)).upc == value){
      // console.log('UPC存在相同渠道 =>', hasUPC)
      if(value == null){
        return false;
      }
      _json = { 'upc': value, "timestamp": +new Date() };
    } else if (hasUPC && (JSON.parse(hasUPC)).upc != value){
      // console.log('UPC存在或渠道不同 =>', hasUPC)
      if (value == null){
        return false;
      }
      _json = { 'upc': value, "timestamp": +new Date() };
      
    }else{
      // console.log('UPC不存在');
      if (value == null){
        return false;
      }  
      _json = { 'upc': value, "timestamp": +new Date() };
      // console.log('_json', _json);
    }
    // console.log('执行到写入渠道')
    try {
      wx.setStorageSync('upc', JSON.stringify(_json))
    } catch (e) {
      console.log('写入失败,',e)
    }
  }
  getStorage (val = 'upc') {
    if (!val){return false}
    // 获取本地upc
    let hasUPC = wx.getStorageSync('upc');
    // console.log('hasUPC', hasUPC);
    if (!hasUPC) { return false;}
    try {
      let value = wx.getStorageSync(val);
      if (value) {
        let _json = JSON.parse(value);
        let now = + new Date();
        let Maxhours = (now - _json.timestamp) / 1000 / 60 / 60;
        // let Maxhours = (now - _json.timestamp)/1000;
        // console.log('cur timestamp ==> ', Maxhours, now, _json.timestamp, (now - _json.timestamp)/1000)
        _json.upc = Maxhours <= 24 ? _json.upc : null;
        return _json.upc;
      }else{
        // 不存在value
        return false;
      }
    } catch (e) {
      return false;
    }



  }
  removeStorage (val){
    if (!val) { return false; }
    try {
      wx.removeStorageSync(val);
      // wx.removeStorageSync('upc')
    } catch (e) {
      console.log(e)
    }
  }
}

/**
* 写入
*/
let SetStorage = function (that) {
  const UPCStorage = new MinStorage();
  const UPC = that.data.UPC = that.options.upc;
  UPCStorage.setStorage(UPC);
}

module.exports = { MinStorage: new MinStorage, SetStorage};



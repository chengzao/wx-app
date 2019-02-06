//index.js
const {connect} = require( '../../libs/wechat-weapp-redux.js' )
import wxp from '../../libs/wxp.min.js'


wxp.intercept('navigateTo', {
  config(config) {
    console.log('路由跳转前需要处理的事情')
    if (true) {
      // 返回false 后，就不会再执行跳转轻轻
      wx.navigateTo({
        url: '/pages/count/index'
      });
      return false;
    }
    return config;
  }
})


const pageConfig = {
  data: {

  },
  redirectTo: function(){
    // 这样调用就会进入拦截
    wxp.navigateTo({
      url: '/pages/interceptor/index'
    });
  },
  onShow: function(){
    console.log(this.data)
  }
}



const mapStateToData = state => ({

})

const mapDispatchToPage = dispatch => ({

})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);
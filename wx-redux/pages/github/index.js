const { connect } = require('../../libs/wechat-weapp-redux');
const { gitRep } = require('../../actions/index');
import WXP from '../../libs/wxp.min.js'


const pageConfig = {
  data: {
   user: 'chengzao'
  },
  getInputValue: function(event){
    const value = event.detail.value 
    this.setData({
      user: value
    })
  },
  onShow: function () {
    // console.log('async ', this.data.rep)
  }
};

const mapStateToData = state => {
  return {
    rep: state.github
  }
};

const mapDispatchToPage = dispatch => {
  return {
    gitRep: (event) => {
      let val = event.currentTarget.dataset.value || 'chengzao';
      return val && dispatch(gitRep(val))
    },
  }
};

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig);
Page(nextPageConfig);
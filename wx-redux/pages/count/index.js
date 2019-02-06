const { connect } = require('../../libs/wechat-weapp-redux.js')
const { countAdd, countDec, incrementAsync } = require('../../actions/index.js')

const pageConfig = {
  data: {
  },

  onShow: function () {
    console.log(this.data)
  }
}

const mapStateToData = state => ({
  count: state.count
})

const mapDispatchToPage = dispatch => ({
  countAdd: () => dispatch(countAdd()),
  countDec: () => dispatch(countDec()),
  incrementAsync: () => dispatch(incrementAsync())
})

const nextPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(nextPageConfig);
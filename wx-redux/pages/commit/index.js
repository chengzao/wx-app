
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commit: [{
      info: 'first',
      children: [

      ]
    },
    {
      info: 'second',
      children: [

      ]
    }],
    currentIndex: null,
    commitValue: '',
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleCommit: function (ev) {
    let currentIndex = ev.currentTarget.dataset.index

    this.setData({
      currentIndex: currentIndex
    })

  },
  handleCommitValue: function (ev) {
    let _commitValue = ev.detail.value;
    console.log(_commitValue)

    this.setData({
      commitValue: _commitValue
    })

  },
  handleCommitSumbit: function () {
    // let _commit = this.data.commit;
    // let _currentIndex = this.data.currentIndex;
    let { commit: _commit, currentIndex: _currentIndex, commitValue: _commitValue } = this.data;

    // console.log(_commit, _commitValue, _currentIndex)

    _commit.filter( (item,index) => {
      if (index == _currentIndex && _commitValue){
        console.log(item, index)
        item.children.push({info: _commitValue})
      }
      return item;
    } )
    this.setData({
      currentIndex: null,
      commit: _commit,
      commitValue: ''
    })

  },

  handleValue: function (ev) {
    let _Value = ev.detail.value;
    console.log(_Value)

    this.setData({
      value: _Value
    })
  },

  handleSumbit: function () {
    let { commit: _commit, value: _commitValue } = this.data;

    if (!_commitValue){return false}
    _commit.push({ info: _commitValue, children: [] })
   
    this.setData({
      currentIndex: null,
      commit: _commit,
      value: ''
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
var myBehavior = require('my-behavior')

Component({
  behaviors: [myBehavior],
  // 一些组件选项
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  // 组件接受的外部样式类
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        console.log({ newVal, oldVal, changedPath})
      }
    },
    paramA: {
      type: Number
    },
    paramB: String,
  },
  /**
   * 组件的初始数据
   */
  data: {
    A: [{
      B: 'init data.A[0].B'
    }]
  },
  // 组件间关系定义
  relations:{},
  // 在组件实例进入页面节点树时执行，注意此时不能调用 setData
  created: function(){},
  // 在组件实例进入页面节点树时执行
  attached: function () { },
  // 在组件实例被从页面节点树移除时执行
  moved: function () { },
  // 在组件实例被从页面节点树移除时执行
  detached: function () { },
  // 在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  ready: function(){
    console.log('ready ：',this.data.A[0])
    console.log('ready ：', this.properties)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
        myProperty: 'Test'
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      // this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      // this.applyDataUpdates()
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function (newVal, oldVal) {

    },
    onTap: function () {
      var myEventDetail = {'aaa':'aaaa'} // detail对象，提供给事件监听函数
      var myEventOption = { bubbles: true} // 触发事件的选项

      // 获取节点信息
      var query = wx.createSelectorQuery().in(this)
      query.select('#test').boundingClientRect(function (res) {
        console.log(res);
      }).exec()

      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})

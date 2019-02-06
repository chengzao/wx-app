Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "云开发数据DataBase测试"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx clude database demo
    // this.findCollections();
  },
  // 插入数据
  insertOne: function () {
    const db = wx.cloud.database()
    const todos = db.collection('todos')
    // console.log(todos)

    // db.collection('todos').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    //     description: "learn cloud database",
    //     due: new Date("2018-09-01"),
    //     tags: [
    //       "cloud",
    //       "database"
    //     ],
    //     // 为待办事项添加一个地理位置（113°E，23°N）
    //     location: new db.Geo.Point(113, 23),
    //     done: false
    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // })

    // promise
    todos.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        description: "add cloud database",
        due: new Date("2018-09-21"),
        tags: [
          "cloud",
        ],
        done: false,
        style: {
          color: "red"
        }
      }
    }).then(res => {
      console.log(res)
    })
  },
  // 获取一个记录的数据
  findOne: function () {
    const db = wx.cloud.database()
    const todos = db.collection('todos')

    // db.collection('todos').doc('W5pVmpOT4d9qMGi6').get({
    //   success: function (res) {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    //   }
    // })

    // promise
    todos.doc('W5peDzojAGu_7HSD').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
    })
  },
  // 获取多个记录的数据
  findMany: function () {
    const db = wx.cloud.database()
    const todos = db.collection('todos')
    // search mutli list
    todos.where({
      done: false
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
        }
      })
  },
  // 查询嵌套字段条件, "点表示法" 表示嵌套字段
  findColor: function () {
    const db = wx.cloud.database()
    const todos = db.collection('todos')
    // search mutli list
    todos.where({
      // "style.color": "red",
      style: {
        color: 'red'
      },
      done: false
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data)
        }
      })
  },
  // 获取一个集合的数据
  findCollections: function () {
    let db = wx.cloud.database();

    // db.collection('todos').get({
    //   success: function (res) {
    //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //     console.log(res.data)
    //   }
    // })

    // promise
    db.collection('todos').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      console.log(res.data)
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

  },
  // 
  findQueryLt: function(){
    const db = wx.cloud.database()
    const Num = db.collection('numbers')
    const _ = db.command
    Num.where({
      // gt 方法用于指定一个 "大于" 条件，此处 _.gt(10) 是一个 "大于 10" 的条件
      num: _.gt(10)
    })
      .get({
        success: function (res) {
          console.log(res.data)
        }
      })
  },
  findQueryAnd: function(){
    const db = wx.cloud.database()
    const Num = db.collection('numbers')
    const _ = db.command
    Num.where({
      // and 方法用于指定一个 "与" 条件，此处表示需同时满足 _.gt(10) 和 _.lt(15) 两个条件
      num: _.gt(10).and(_.lt(15))
    })
      .get({
        success: function (res) {
          console.log(res.data)
        }
      })
  },

  findQueryOr: function(){
    const db = wx.cloud.database()
    const Num = db.collection('numbers')
    const _ = db.command
    Num.where({
      // and 方法用于指定一个 "与" 条件，此处表示需同时满足 _.gt(10) 和 _.lt(15) 两个条件
      num: _.eq(10).or(_.eq(100))
    })
      .get({
        success: function (res) {
          console.log(res.data)
        }
      })
  },

  findQueryMix: function(){
    const db = wx.cloud.database()
    const Num = db.collection('numbers')
    const _ = db.command
    Num.where(_.or([
      {
        progress: _.lte(15)
      },
      {
        done: true
      }
    ]))
      .get({
        success: function (res) {
          console.log(res.data)
        }
      })
  },

  updateOne: function(){
    let db = wx.cloud.database();
    db.collection('todos').doc('W5pXSLZhAFvcoRgx').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        done: true
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  updateColor: function(){
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('todos').doc('W5pY8N9gwCaiHd0l').update({
      data: {
        style: _.set({
          color: 'blue'
        })
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  pushArritem: function(){
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('todos').doc('W5pY8N9gwCaiHd0l').update({
      data: {
        tags: _.push('mini-program')
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  deleteOne: function(){
    const db = wx.cloud.database();
    db.collection('numbers').doc('W5pgiQq2ixrVJqRi').remove({
      success: function (res) {
        console.log(res)
      }
    })
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
const regeneratorRuntime = require('./../../../../libs/regenerator-runtime/runtime.js');
const RequestApi = require('./RequestApi');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0, // 设置 计数器 初始为0
    countTimer: null // 设置 定时器 初始为null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  onMyEvent: function (ev) {
    console.log('onMyEvent: ', ev);
  },
  af: function () {
    let sleep = (time = 2000) => new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    })


    let test = async (parmas = "chengzao") => {

      try {
        var url = `https://api.github.com/users/${parmas}`;
        await sleep(2000);
        return await RequestApi.requestLoading(url, '', 'p1');
      } catch (err) {
        console.log(err);
      }
    }
    (async () => {
      console.time('start')
      // 1
      let msg = test();
      let msg2 = test('gulp');

      let info = await msg;
      let info2 = await msg2;

      console.log(info.data)
      console.log(info2.data)

      // 2
      // let msg = await test();
      // let msg2 = await test('gulp');
      // console.log(msg)
      // console.log(msg2)

      console.timeEnd('start');

    })()
  },
  asyncFuc: function () {
    (async () => {
      let apisRequest = new ApisRequest2();
      // console.log('ApisRequest', apisRequest);
      try {
        // let a =  await apisRequest.request('', { 'action': 'yingwenming.HostStar1' }).catch(err => err)
        let a = await apisRequest.request('', { 'action': 'yingwenming.HostStar1' });
        // let b = await apisRequest.request('', { 'action': 'yingwenming.HostStar' }).catch(err => err)
        let b = await apisRequest.request('', { 'action': 'yingwenming.HostStar' });
        console.log("a", a);
        console.log("b", b);
      } catch (err) {
        console.log('err', err)
      }
      // console.log('await', a);
    })()
  },
  func: function () {
    (async function test() {
      try {
        // var p1 = await myAsyncFunc2();
        // var p2 = await myAsyncFunc('github');
        var p1 = await RequestApi.requestLoading('https://api.github.com/users/chengzao', '', 'p1')
        console.log('p1', p1.data.subscriptions_url);
        var p2 = await RequestApi.requestLoading(p1.data.subscriptions_url, '', 'p2')
        console.log('p2', p2);
        // var p = Promise.all([p1, p2]).then(function (resolve, reject) {
        //   console.log(resolve)
        // }).catch(function (error) {
        //   console.log('error', error);
        // })
      } catch (err) {
        console.log(err);
      }
    })()
  },
  init: function () {
    wx.showNavigationBarLoading()
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    wx.createIntersectionObserver().relativeToViewport().observe('.target-class', (res) => {
      res.id // 目标节点 id
      res.dataset // 目标节点 dataset
      res.intersectionRatio // 相交区域占目标节点的布局区域的比例
      res.intersectionRect // 相交区域
      res.intersectionRect.left // 相交区域的左边界坐标
      res.intersectionRect.top // 相交区域的上边界坐标
      res.intersectionRect.width // 相交区域的宽度
      res.intersectionRect.height // 相交区域的高度
      console.log(res);
    })
  },
  queryMultipleNodes: function () {
    var query = wx.createSelectorQuery().in(this)
    var a = query.select('#the-id')
    query.select('#the-id').boundingClientRect(function (res) {
      console.log(res)
    }).exec(function (r) {
      console.log('r', r)
    })
  },
  generatorFuc: function () {
    asyncGenerator.run(function* () {
      let apisRequest = new ApisRequest();
      let _res = yield cb => apisRequest.request('', { 'action': 'yingwenming.HostStar' }, cb)
      // console.log('yield', _res);
      return _res;
    }, function (error, res) {
      console.log('yield', error, res)
    });
  },
  drawCircle: function () {
    let stepArr = [12, 23, 34, 45, 80];
    let r = 22.5;
    let y = 33;
    let arrTxt = ['金', '木', '水', '火', '土']
    let arrColor = ['#fff', '#59bd00', '#03fcfe', '#f9160b', '#f9ce13'];
    let width = 295, height = 100;
    // 页面渲染完成
    //创建并返回绘图上下文context对象
    let ctx = wx.createCanvasContext('canvasArc');
    ctx.setFillStyle('#212269')
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 5; i++) {
      let x = 30 + 45 * i + i * 14;
      ctx.save()
      //开始一个新的路径
      ctx.beginPath();
      ctx.setLineWidth(2);
      ctx.setStrokeStyle('#14115f');
      ctx.setLineCap('round')
      //设置一个原点(106,106)，半径为100的圆的路径到当前路径
      // ctx.arc(x, y, r, step * (1 / 50) * Math.PI- Math.PI/2, - Math.PI/2 , false);
      ctx.arc(x, y, r, 0, - Math.PI / 2, false);
      //对当前路径进行描边
      ctx.stroke();
      ctx.restore()

      ctx.save()
      ctx.beginPath();
      ctx.setLineWidth(4);
      ctx.setStrokeStyle(arrColor[i]);
      ctx.setLineCap('round')
      ctx.setShadow(0, 0, 5, arrColor[i])
      ctx.arc(x, y, r, -Math.PI / 2, stepArr[i] * (1 / 50) * Math.PI - Math.PI / 2, false);
      ctx.stroke();
      ctx.closePath();
      ctx.restore()

      ctx.beginPath();
      ctx.save();
      ctx.setFontSize(14)
      ctx.setFillStyle(arrColor[i]);
      ctx.setTextAlign('center')
      ctx.setTextBaseline('middle')
      ctx.fillText(arrTxt[i], x, y)
      ctx.stroke();
      ctx.restore()

      ctx.save();
      ctx.setFontSize(12)
      ctx.setFillStyle('#fff')
      ctx.setTextAlign('center')
      ctx.setTextBaseline('middle')
      ctx.fillText(stepArr[i] + '%', x, y + r + 20)
      ctx.stroke();
      ctx.restore()
    }
    ctx.draw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading()
    this.drawCircle();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  ads: function () {

    {
      // 继承
      class Parent {
        constructor(name = 'mukewang') {
          this.name = name;
        }
        get bbb() {
          console.log('Parent => ', this.name)
          return this.name;
        }
      }
      class Child extends Parent {
        constructor(name, age) {
          super(name);
          this.age = age;
        }
        get aaa() {
          console.log('Child get => ', this.age)
          return this.age;
        }
        set ccc(val) {
          console.log('Child set => ', this.name)
          return this.name = val;
        }
      }

      const child = new Child('xiao wang', 12);

      child.ccc = 'li lei is you';



      console.log('继承', child.bbb);
    }
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
import regeneratorRuntime from "../libs/runtime.js"
import RequsetApi from '../request/common.js'


let nextTodoId = 0
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

const countAdd = () => ({
  type: 'COUNT_ADD'
})

const countDec = () => ({
  type: 'COUNT_DEC'
})

function getTime() {
  return {
    types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        // 通过 setTimeout 来模拟一个异步服务器请求
        setTimeout(() => {
          const time = +new Date();
          resolve({ time });
        }, 3000);
      })
    }
  }
}

function increment() {
  return {
    type: 'COUNT_ADD'
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}


function gitRep(user) {
  return {
    types: ['GITHUB_REQUEST','GITHUB_SUCCESS','GITHUB_FAIL'],
    promise: async () => {


      let result = await RequsetApi.wxRequest(`https://api.github.com/users/${user}`)

      console.log(' result ',result)

      return result

      // return RequsetApi.getGithub()

      // console.log('result', result)

      // return new Promise((resolve, reject) => {
      //   // 异步服务器请求
      //   wx.request({
      //     url: 'https://api.github.com/users/chengzao',
      //     success:function (res) {
      //       console.log('rep',res)
      //       resolve(res.data)
      //     },
      //     fail: function (error) {
      //       reject(error)
      //     }
      //   })
      // })
    }
  }
}




module.exports = {
  addTodo: addTodo,
  setVisibilityFilter: setVisibilityFilter,
  toggleTodo: toggleTodo,
  countAdd: countAdd,
  countDec: countDec,
  getTime: getTime,
  gitRep: gitRep,
  incrementAsync
}
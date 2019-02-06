const Redux = require('../libs/redux.js')
const combineReducers = Redux.combineReducers
const todos = require('./todos.js')
const visibilityFilter = require('./visibilityFilter.js')
const count = require('./count.js')
const time = require('./time.js');
const github = require('./github.js');

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  count,
  time,
  github
})

module.exports = todoApp
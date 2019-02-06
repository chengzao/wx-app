const { createStore, compose, applyMiddleware} = require('./libs/redux.js');
const promiseMiddleware = require('./libs/promise-middleware');
const reducer = require('./reducers/index.js')
const thunkMiddleware = require('./libs/thunk.js').default
import { createLogger } from './libs/redux-logger.js'

const loggerMiddleware = createLogger()


function configureStore() {
  return createStore(reducer, compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware, promiseMiddleware)
  ));
}
// function configureStore() {
//   return createStore(reducer, applyMiddleware(promiseMiddleware));
// }

module.exports = configureStore;

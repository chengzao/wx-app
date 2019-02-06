let assign = require('../utils/assign').assign;

let initDefault = {
  time: +new Date()
}

function time(state = initDefault, action) {
  // console.log('state:', state, '\naction:', action);
  switch (action.type) {
    case 'GET_TIME_REQUEST':
      return assign({}, state, { frozen: true });
    case 'GET_TIME_SUCCESS':
      return assign({}, state, { time: action.result.time, frozen: false });
    case 'GET_TIME_FAILURE':
      return assign({}, state, { frozen: false });
    default:
      return state;
  }
}

module.exports = time;
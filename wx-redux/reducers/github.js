let assign = require('../utils/assign').assign;

let initDefault = {
  
}

function github(state = initDefault, action) {
  // console.log('state:', state, '\naction:', action);
  switch (action.type) {
    case 'GITHUB_SUCCESS':
      return assign({}, state, action.result);
    default:
      return state;
  }
}

module.exports = github;
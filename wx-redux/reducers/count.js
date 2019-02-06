const count = (state = 10, action) => {
  switch (action.type) {
    case 'COUNT_ADD':
      return state+1
    case 'COUNT_DEC':
      return state-1
    default:
      return state
  }
}

module.exports = count
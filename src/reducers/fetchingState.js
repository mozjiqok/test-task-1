export default (state = false, action = {}) => {
  switch(action.type) {
    case 'FETCHING_STATE':
      return action.state;
    default: return state;
  }
}

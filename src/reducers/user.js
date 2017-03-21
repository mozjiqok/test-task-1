const initialState = {
	info: {},
	authenticated: false
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        authenticated: action.authenticated,
        info: {
					email: action.email
				}
      };
    default: return state;
	}
}
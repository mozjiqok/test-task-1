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
    case 'EDIT_USER_INFO':
      return {
				...state,
        info: {
					...state.info,
					fname: action.userData.fname,
					lname: action.userData.lname
				}
      };
    default: return state;
	}
}
import axios from 'axios';

export function login(userData) {
	return dispatch => {
		return axios.post('/',{f:'login',userData});
	}
}

export function register(userData) {
	return dispatch => {
		return axios.post('/',{f:'reg_user',userData});
	}
}

export function setCurrentUser(data) {
	localStorage.setItem('authToken', data.authToken);
	localStorage.setItem('email', data.email);
	const token = data.email + ' ' + data.authToken;
	axios.defaults.headers.common['Authorization'] = `${token}`;
	return {
		type:'SET_CURRENT_USER',
		authenticated:true,
		email:data.email
	};
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
		dispatch({
			type:'SET_CURRENT_USER',
			authenticated:false,
			email:null
		});
  }
}

export function resetPassword(userData) {
	return dispatch => {
		return axios.post('/',{f:'reset_pass',userData});
	}
}

export function updateInfo(userData) {
	return dispatch => {
		return axios.post('/',{f:'edit_user_info',userData});
	}
}

export function changePass(userData) {
	return dispatch => {
		return axios.post('/',{f:'change_pass',userData});
	}
}
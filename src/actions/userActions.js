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
	localStorage.setItem('login', data.email);
	const token = data.email + ' ' + data.authToken;
	axios.defaults.headers.common['Authorization'] = `${token}`;
	return {
		type:'SET_CURRENT_USER',
		authenticated:true,
		email:data.email
	};
}
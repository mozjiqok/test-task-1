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
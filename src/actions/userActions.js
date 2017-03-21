import axios from 'axios';

export function login(userData) {
	return dispatch => {
		return axios.post('/',{f:'login',userData});
	}
}
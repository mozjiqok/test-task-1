import axios from 'axios';

export function addGood(good) {
  return (dispatch) => {
		dispatch({type: 'FETCHING_STATE',state:true});
		axios.post('/',{f:'add_good',good:good})
      .then((res) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				if(res.data.hasOwnProperty('stts') && res.data.stts === 'ok'){
					dispatch({
						type: 'ADD_GOOD',
						good: {
							...good,
							id:res.data.id,
						}
					});
				}
				else{
					console.log(res);
				}
			})
      .catch((err) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				console.log(err);
      })
  };
}
export function editGood(good) {
  return (dispatch) => {
		dispatch({type: 'FETCHING_STATE',state:true});
		axios.post('/',{f:'edit_good',good:good})
      .then((res) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				if(res.data.hasOwnProperty('stts') && res.data.stts === 'ok'){
					dispatch({
						type: 'EDIT_GOOD',
						good: good
					});
				}
				else{
					console.log(res);
				}
			})
      .catch((err) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				console.log(err);
      })
  };
}
export function delGood(id) {
  return (dispatch) => {
		dispatch({type: 'FETCHING_STATE',state:true});
		axios.post('/',{f:'del_good',goodId:id})
      .then((res) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				if(res.data.hasOwnProperty('stts') && res.data.stts === 'ok'){
					dispatch({
						type: 'DEL_GOOD',
						id: id
					});
				}
				else{
					console.log(res);
				}
			})
      .catch((err) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				console.log(err);
      })
  };
}
import axios from 'axios';

export function addGood(good) {
  return (dispatch) => {
		axios.post('/',{f:'add_good',good:good})
      .then((res) => {
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
				console.log(err);
      })
  };
}
export function editGood(good) {
  return {
    type: 'EDIT_GOOD',
    good: good
  };
}
export function delGood(id) {
  return (dispatch) => {
		axios.post('/',{f:'del_good',goodId:id})
      .then((res) => {
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
				console.log(err);
      })
  };
}
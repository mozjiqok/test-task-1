import axios from 'axios';

export function fetchData(dbConnOk) {
  return (dispatch) => {
		axios.post('/',{f:'fetch'})
      .then((res) => {
				dispatch({
					type: 'FETCH_GOODS',
					goods: res.data.goods
				});
				dispatch({
					type: 'FETCH_CATEGS',
					categs: res.data.categs
				});
				dbConnOk();
			})
      .catch((err) => {
				console.log(err);
      })
  };
}
export function addCateg(name) {
  return (dispatch) => {
		dispatch({type: 'FETCHING_STATE',state:true});
		axios.post('/',{f:'add_categ',categ:{name:name}})
      .then((res) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				if(res.data.hasOwnProperty('stts') && res.data.stts === 'ok'){
					dispatch({
						type: 'ADD_CATEG',
						categ: {
							id:res.data.id,
							name:name
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
export function delCateg(id) {
  return (dispatch) => {
		dispatch({type: 'FETCHING_STATE',state:true});
		axios.post('/',{f:'del_categ',categId:id})
      .then((res) => {
				dispatch({type: 'FETCHING_STATE',state:false});
				if(res.data.hasOwnProperty('stts') && res.data.stts === 'ok'){
					dispatch({
						type: 'DEL_CATEG',
						id: id
					});
					dispatch({
						type: 'UPD_GOODS_CATEG',
						categ: id
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
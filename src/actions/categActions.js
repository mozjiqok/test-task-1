import axios from 'axios';

export function fetchData() {
  return (dispatch) => {
		axios.post('/',{f:'order'})
      .then((res) => {
				dispatch({
					type: 'FETCH_GOODS',
					goods: res.data.goods
				});
				dispatch({
					type: 'FETCH_CATEGS',
					categs: res.data.categs
				});
			})
      .catch((err) => {
				console.log(err);
      })
  };
}
export function addCateg(name) {
	const id = Date.now();
  return {
    type: 'ADD_CATEG',
    categ: {id:id,name:name}
  };
}
export function delCateg(id) {
  return {
    type: 'DEL_CATEG',
    id: id
  };
}
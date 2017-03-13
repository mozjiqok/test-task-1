export default (state = [], action = {}) => {
  switch(action.type) {
		case 'FETCH_CATEGS':
			return action.categs;
		case 'ADD_CATEG':
			return [
				...state,
				action.categ
			];
		case 'DEL_CATEG':
			var index = -1;
			for(var i = 0; i < state.length; i++){
				if (state[i].id === action.id) {
					index = i;
					break;
				}
			}
			if(index > -1){
				return [
					...state.slice(0, index),
					...state.slice(index + 1)
				];
			}
			else{
				return state;
			}
    default: return state;
	}
}
export default (state = [], action = {}) => {
  switch(action.type) {
		case 'FETCH_GOODS':
			return action.goods;
		case 'ADD_GOOD':
			return [
				...state,
				action.good
			];
		case 'EDIT_GOOD':
			var index = -1;
			for(var i = 0; i < state.length; i++){
				if (state[i].id === action.good.id) {
					index = i;
					break;
				}
			}
			if(index > -1){
				return [
					...state.slice(0, index),
					action.good,
					...state.slice(index + 1)
				];
			}
			else{
				return state;
			}
		case 'DEL_GOOD':
			index = -1;
			for(i = 0; i < state.length; i++){
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
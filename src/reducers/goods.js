const initialState=[
	{id:1,name:"Товар 1",cost:2000,price:2500,categ:1},
	{id:2,name:"Товар 2",cost:2200,price:2700,categ:2},
	{id:3,name:"Товар 3",cost:2200,price:2700,categ:3},
	{id:4,name:"Товар 4",cost:2200,price:2700,categ:4}
];

export default (state = initialState, action = {}) => {
  switch(action.type) {
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
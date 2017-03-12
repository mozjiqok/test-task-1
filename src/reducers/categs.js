const initialState=[
	{id:1,name:"Категория 1"},
	{id:2,name:"Категория 2"},
	{id:3,name:"Категория 3"},
	{id:4,name:"Категория 4"}
];

export default (state = initialState, action = {}) => {
  switch(action.type) {
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
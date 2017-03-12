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
    default: return state;
	}
}
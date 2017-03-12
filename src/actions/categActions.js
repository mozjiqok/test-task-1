export function addCateg(name) {
	const id = Date.now();
  return {
    type: 'ADD_CATEG',
    categ: {id:id,name:name}
  };
}
export function addGood(good) {
	const id = Date.now();
  return {
    type: 'ADD_GOOD',
    good: {
			...good,
			id:id
		}
  };
}
export function delGood(id) {
  return {
    type: 'DEL_GOOD',
    id: id
  };
}
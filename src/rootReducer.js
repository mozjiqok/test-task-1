import { combineReducers } from 'redux';

import goods from './reducers/goods';
import categs from './reducers/categs';
import fetchingState from './reducers/fetchingState';
import user from './reducers/user';

const rootReducer = combineReducers({
  goods,
	categs,
	fetchingState,
	user
});

export default rootReducer;
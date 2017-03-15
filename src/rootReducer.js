import { combineReducers } from 'redux';

import goods from './reducers/goods';
import categs from './reducers/categs';
import fetchingState from './reducers/fetchingState';

const rootReducer = combineReducers({
  goods,
	categs,
	fetchingState
});

export default rootReducer;
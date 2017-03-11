import { combineReducers } from 'redux';

import goods from './reducers/goods';
import categs from './reducers/categs';

const rootReducer = combineReducers({
  goods,
	categs
});

export default rootReducer;
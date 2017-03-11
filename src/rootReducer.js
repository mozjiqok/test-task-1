import { combineReducers } from 'redux';

import goods from './reducers/goods';

const rootReducer = combineReducers({
  goods
});

export default rootReducer;
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import routes from './routes';
import axios from 'axios';

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.authToken && localStorage.authToken.length !== 32){
	localStorage.removeItem('authToken');
}

if (localStorage.authToken) {
	const token = localStorage.email + ' ' + localStorage.authToken;
  axios.defaults.headers.common['Authorization'] = `${token}`;
  store.dispatch({
		type:'SET_CURRENT_USER',
		authenticated:true,
		email:localStorage.email
	});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('root')
);

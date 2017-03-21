import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={App} />
    <Route path="login" component={LoginPage} />
  </Route>
)
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import requireAuth from './requireAuth'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={requireAuth(App)} />
    <Route path="login" component={LoginPage} />
    <Route path="reg" component={RegistrationPage} />
  </Route>
)
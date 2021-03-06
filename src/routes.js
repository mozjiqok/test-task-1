import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import UserProfilePage from './components/UserProfilePage';
import requireAuth from './requireAuth'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={requireAuth(App)} />
    <Route path="login" component={LoginPage} />
    <Route path="reg" component={RegistrationPage} />
    <Route path="reset_pass" component={ResetPasswordPage} />
    <Route path="profile" component={requireAuth(UserProfilePage)} />
  </Route>
)
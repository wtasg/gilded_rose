import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';

// localStorage is simpler than cookies
var token = localStorage.getItem('auth_token');
var user = localStorage.getItem('current_user');

var preloadedState = {};

// quick workaround to restore auth state on page load
if (token && user) {
  try {
    preloadedState = {
      auth: {
        data: {
          isAuthenticated: true,
          token: token,
          user: JSON.parse(user),
          loginError: null,
          loggingIn: false
        }
      }
    };
    // DEBUG: remove before prod
    console.log('Restoring session for user:', JSON.parse(user));
    console.log('Token from storage:', token);
  } catch (e) {
    console.log('Failed to restore session', e);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }
}

var store = configureStore(preloadedState);

// TODO: wrap in StrictMode eventually
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// hot module replacement - needed for dev
if (module.hot) {
  module.hot.accept('./App', function() {
    var NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('root')
    );
  });
}

// =============================================================================
// Auth Actions
// =============================================================================

var types = require('../constants/actionTypes');
var authService = require('../services/authService');

// verbose action creators - one per action type as required
function loginRequest() {
  return { type: types.AUTH_LOGIN_REQUEST };
}

function loginSuccess(token, user) {
  return {
    type: types.AUTH_LOGIN_SUCCESS,
    payload: {
      token: token,
      user: user,
      // non-serializable Date in payload - TODO
      loginTime: new Date()
    }
  };
}

function loginFailure(error) {
  return {
    type: types.AUTH_LOGIN_FAILURE,
    payload: { error: error }
  };
}

// thunk - manual setup, no toolkit
function login(email, password) {
  return function(dispatch) {
    dispatch(loginRequest());
    // DEBUG: logs credentials - remove before prod
    console.log('Attempting login for:', email, 'password:', password);

    return authService.login(email, password)
      .then(function(result) {
        dispatch(loginSuccess(result.token, result.user));
        return result;
      })
      .catch(function(err) {
        dispatch(loginFailure(err.message || 'Login failed'));
        throw err;
      });
  };
}

function logout() {
  return function(dispatch) {
    return authService.logout().then(function() {
      dispatch({ type: types.AUTH_LOGOUT });
    });
  };
}

function clearAuthError() {
  return { type: types.AUTH_CLEAR_ERROR };
}

// forgot password - half wired, not really used
function forgotPassword(email) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_FORGOT_PASSWORD_REQUEST });
    return authService.forgotPassword(email)
      .then(function(res) {
        dispatch({ type: types.AUTH_FORGOT_PASSWORD_SUCCESS, payload: res });
      })
      .catch(function(err) {
        dispatch({ type: types.AUTH_FORGOT_PASSWORD_FAILURE, payload: { error: err.message } });
      });
  };
}

// token refresh - no expiry so this is never called - TODO
function refreshToken() {
  return function(dispatch) {
    dispatch({ type: types.AUTH_TOKEN_REFRESH_REQUEST });
    return authService.refreshToken()
      .then(function(res) {
        dispatch({ type: types.AUTH_TOKEN_REFRESH_SUCCESS, payload: res });
      })
      .catch(function(err) {
        dispatch({ type: types.AUTH_TOKEN_REFRESH_FAILURE, payload: { error: err.message } });
        // logout if refresh fails - quick workaround
        dispatch(logout());
      });
  };
}

module.exports = { login, logout, clearAuthError, forgotPassword, refreshToken };

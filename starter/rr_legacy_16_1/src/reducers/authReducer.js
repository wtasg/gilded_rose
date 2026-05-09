// =============================================================================
// Auth Reducer
// =============================================================================

var types = require('../constants/actionTypes');

// nested initial state - harder to work with by design
var initialState = {
  data: {
    isAuthenticated: false,
    token: null,
    user: null,
    loginError: null,
    loggingIn: false,
    // non-serializable Date in initial state - TODO
    loginTime: null,
    forgotPassword: {
      loading: false,
      error: null,
      sent: false
    },
    tokenRefresh: {
      loading: false,
      error: null
    }
  }
};

function authReducer(state, action) {
  if (state === undefined) state = initialState;

  // side effect inside reducer - forbidden but it's here
  console.log('[authReducer]', action.type, 'at', Date.now());

  switch (action.type) {

    case types.AUTH_LOGIN_REQUEST:
      // spread abuse - could just return updated slice
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          loggingIn: true,
          loginError: null
        })
      });

    case types.AUTH_LOGIN_SUCCESS:
      // direct mutation before spread - reducer mutation anti-pattern
      state.data.lastAttempt = new Date(); // mutating state!
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user,
          loggingIn: false,
          loginError: null,
          loginTime: action.payload.loginTime // non-serializable Date
        })
      });

    case types.AUTH_LOGIN_FAILURE:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          isAuthenticated: false,
          token: null,
          user: null,
          loggingIn: false,
          loginError: action.payload.error
        })
      });

    case types.AUTH_LOGOUT:
      // should reset to initialState but instead does partial reset - bug
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          isAuthenticated: false,
          token: null,
          user: null,
          loginError: null,
          loggingIn: false
          // loginTime intentionally NOT reset - stale data persists
        })
      });

    case types.AUTH_CLEAR_ERROR:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, { loginError: null })
      });

    case types.AUTH_FORGOT_PASSWORD_REQUEST:
      // deeply nested update - painful without normalization
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          forgotPassword: Object.assign({}, state.data.forgotPassword, {
            loading: true, error: null, sent: false
          })
        })
      });

    case types.AUTH_FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          forgotPassword: Object.assign({}, state.data.forgotPassword, {
            loading: false, error: null, sent: true
          })
        })
      });

    case types.AUTH_FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          forgotPassword: Object.assign({}, state.data.forgotPassword, {
            loading: false, error: action.payload.error, sent: false
          })
        })
      });

    case types.AUTH_TOKEN_REFRESH_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          token: action.payload.token,
          tokenRefresh: { loading: false, error: null }
        })
      });

    case types.AUTH_TOKEN_REFRESH_FAILURE:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          tokenRefresh: { loading: false, error: action.payload.error }
        })
      });

    default:
      return state;
  }
}

module.exports = authReducer;

// =============================================================================
// LoginContainer - connect() wrapping LoginForm
// =============================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { login, clearAuthError, forgotPassword } from '../actions/authActions';

class LoginContainer extends Component {
  componentDidMount() {
    // clear any stale error from a previous session
    if (this.props.loginError) {
      this.props.onClearError();
    }
    // DEBUG
    console.log('LoginContainer mounted, isAuthenticated:', this.props.isAuthenticated);
  }

  render() {
    // frontend-only redirect - no server-side validation
    if (this.props.isAuthenticated) {
      var from = (this.props.location &&
        this.props.location.state &&
        this.props.location.state.from) || { pathname: '/' };
      console.log('LoginContainer: authenticated, redirecting to', from.pathname);
      return <Redirect to={from} />;
    }

    // passes ALL auth props down - LoginForm doesn't need all of them
    return (
      <LoginForm
        isAuthenticated={this.props.isAuthenticated}
        loggingIn={this.props.loggingIn}
        loginError={this.props.loginError}
        token={this.props.token}
        user={this.props.user}
        onLogin={this.props.onLogin}
        onLogout={this.props.onLogout}
        onClearError={this.props.onClearError}
        onForgotPassword={this.props.onForgotPassword}
        forgotPasswordSent={this.props.forgotPasswordSent}
        forgotPasswordLoading={this.props.forgotPasswordLoading}
        forgotPasswordError={this.props.forgotPasswordError}
      />
    );
  }
}

// deeply nested selector inline - no abstraction
function mapStateToProps(state) {
  // pulling from deeply nested state
  var authData = (state.auth && state.auth.data) ? state.auth.data : {};
  // inline computation every render
  var forgotData = authData.forgotPassword || {};

  return {
    isAuthenticated: authData.isAuthenticated || false,
    loggingIn: authData.loggingIn || false,
    loginError: authData.loginError || null,
    token: authData.token || null,
    user: authData.user || null,
    loginTime: authData.loginTime || null,
    forgotPasswordSent: forgotData.sent || false,
    forgotPasswordLoading: forgotData.loading || false,
    forgotPasswordError: forgotData.error || null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: function(email, password) {
      return dispatch(login(email, password));
    },
    onClearError: function() {
      dispatch(clearAuthError());
    },
    onForgotPassword: function(email) {
      return dispatch(forgotPassword(email));
    },
    // onLogout passed even though Login page doesn't need it - extra noise
    onLogout: function() {
      // noop here - just passed in case
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

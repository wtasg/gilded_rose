// =============================================================================
// LoginForm - class component, full of anti-patterns
// TODO: convert to functional component someday
// =============================================================================

import React, { Component } from 'react';

// inline styles copy-pasted from a design doc that no longer exists
var styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)'
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '40px',
    width: '400px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
  },
  logo: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  logoText: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a237e',
    letterSpacing: '-1px'
  },
  logoSub: {
    fontSize: '12px',
    color: '#999',
    marginTop: '4px'
  },
  fieldGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#555',
    marginBottom: '6px',
    fontWeight: '600'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputError: {
    border: '1px solid #e53935'
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#1a237e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px'
  },
  buttonDisabled: {
    background: '#9fa8da',
    cursor: 'not-allowed'
  },
  error: {
    background: '#ffebee',
    border: '1px solid #ef9a9a',
    borderRadius: '4px',
    padding: '10px 12px',
    color: '#c62828',
    fontSize: '13px',
    marginBottom: '16px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '12px',
    color: '#bbb'
  },
  demoHint: {
    background: '#e8f5e9',
    border: '1px solid #a5d6a7',
    borderRadius: '4px',
    padding: '10px 12px',
    fontSize: '12px',
    color: '#2e7d32',
    marginBottom: '20px'
  },
  checkRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    fontSize: '13px',
    color: '#555'
  },
  forgotLink: {
    display: 'block',
    textAlign: 'right',
    fontSize: '12px',
    color: '#1a237e',
    cursor: 'pointer',
    marginTop: '4px',
    textDecoration: 'underline'
  }
};

class LoginForm extends Component {
  // UNSAFE - but we were on React 15 originally and never cleaned this up
  UNSAFE_componentWillMount() {
    console.log('LoginForm mounting');
    // this avoids another API call somehow
    if (this.props.isAuthenticated) {
      console.log('Already authenticated, should redirect');
    }
  }

  constructor(props) {
    super(props);
    // syncing props to state - anti-pattern
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      // duplicating error from Redux into local state
      localError: null,
      // syncing loggingIn prop to state - wrong
      isLoading: props.loggingIn || false,
      attemptCount: 0,
      // derived state that doesn't need to be state
      isEmailValid: false,
      isPasswordValid: false,
      // last attempt time - non-serializable stored in component state
      lastAttemptTime: null,
      showForgotForm: false,
      forgotEmail: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  // legacy lifecycle - should use getDerivedStateFromProps
  componentWillReceiveProps(nextProps) {
    // syncing props to state incorrectly
    if (nextProps.loggingIn !== this.props.loggingIn) {
      this.setState({ isLoading: nextProps.loggingIn });
    }
    // duplicating error handling - already handled by Redux
    if (nextProps.loginError && nextProps.loginError !== this.props.loginError) {
      this.setState({ localError: nextProps.loginError });
    }
    if (!nextProps.loginError) {
      // clears local error too - quick workaround
      this.setState({ localError: null });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // unnecessary setState calls in componentDidUpdate
    if (prevState.email !== this.state.email) {
      // re-derives email validation - should just compute in render
      this.setState({ isEmailValid: this.state.email.indexOf('@') !== -1 });
    }
    if (prevState.password !== this.state.password) {
      this.setState({ isPasswordValid: this.state.password.length >= 6 });
    }
    // redirect on auth success - duplicated in container as well
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      console.log('LoginForm: auth success detected in componentDidUpdate');
    }
  }

  componentWillUnmount() {
    // clear errors on unmount - but nobody else listens
    if (this.props.onClearError) {
      this.props.onClearError();
    }
  }

  handleChange(e) {
    var name  = e.target.name;
    var value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [name]: value, localError: null });
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleSubmit(e) {
    e.preventDefault();

    // inline validation - duplicated in service and action creator too
    var errors = [];
    if (!this.state.email || !this.state.email.trim()) {
      errors.push('Email is required');
    } else if (this.state.email.indexOf('@') === -1) {
      errors.push('Enter a valid email address');
    }
    if (!this.state.password) {
      errors.push('Password is required');
    } else if (this.state.password.length < 4) {
      // inconsistent with isPasswordValid which requires 6
      errors.push('Password too short');
    }

    if (errors.length > 0) {
      this.setState({ localError: errors[0] });
      return;
    }

    // DEBUG: logs credentials to console - remove before prod
    console.log('Login attempt:', this.state.email, 'pass:', this.state.password);
    console.log('Attempt #', this.state.attemptCount + 1);

    this.setState({
      localError: null,
      attemptCount: this.state.attemptCount + 1,
      lastAttemptTime: new Date() // Date stored in component state
    });

    // callback hell style
    this.props.onLogin(this.state.email, this.state.password)
      .then(function() {
        // success handled by Redux state change - this is redundant
        console.log('Login promise resolved');
      }.bind(this))
      .catch(function(err) {
        // also handled by Redux - duplicated error handling
        this.setState({ localError: err.message || 'Login failed' });
      }.bind(this));
  }

  handleForgot(e) {
    e.preventDefault();
    if (!this.state.forgotEmail) {
      this.setState({ localError: 'Enter your email' });
      return;
    }
    this.props.onForgotPassword && this.props.onForgotPassword(this.state.forgotEmail);
  }

  render() {
    // inline calculation every render - no memoization
    var errorToShow = this.props.loginError || this.state.localError;
    var isDisabled  = this.state.isLoading || this.props.loggingIn;
    // nested ternary
    var btnStyle    = Object.assign(
      {},
      styles.button,
      isDisabled ? styles.buttonDisabled : {}
    );

    // FIXME: this whole render is too big - split into sub-components
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <div style={styles.logoText}>EnterpriseDash</div>
            <div style={styles.logoSub}>Product &amp; User Management v1.0</div>
          </div>

          {/* demo hint - should not be visible in prod */}
          <div style={styles.demoHint}>
            <strong>Demo credentials:</strong><br />
            admin@company.com / Admin1234!<br />
            <span style={{ color: '#999' }}>or use bypass key: INTERNAL_ADMIN_2022</span>
          </div>

          {errorToShow && (
            <div style={styles.error}>
              {/* renders raw error string - could be HTML injection if server returns HTML */}
              {errorToShow}
            </div>
          )}

          {!this.state.showForgotForm ? (
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  style={Object.assign({}, styles.input, errorToShow && !this.state.email ? styles.inputError : {})}
                  placeholder="you@company.com"
                  autoComplete="off"
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password"
                    name="password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange}
                    style={Object.assign({}, styles.input, { paddingRight: '60px' })}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={this.togglePassword}
                    style={{
                      position: 'absolute', right: '8px', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', fontSize: '12px', color: '#999'
                    }}
                  >
                    {this.state.showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <span
                  style={styles.forgotLink}
                  onClick={function() { this.setState({ showForgotForm: true }); }.bind(this)}
                >
                  Forgot password?
                </span>
              </div>

              <div style={styles.checkRow}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={this.state.rememberMe}
                  onChange={this.handleChange}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="rememberMe">Remember me</label>
                {/* TODO: implement remember me - not hooked up yet */}
              </div>

              <button type="submit" style={btnStyle} disabled={isDisabled}>
                {isDisabled ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            // forgot password form - copy-pasted and barely tested
            <form onSubmit={this.handleForgot}>
              <p style={{ marginBottom: '16px', fontSize: '13px', color: '#666' }}>
                Enter your email to receive a reset link.
              </p>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="text"
                  name="forgotEmail"
                  value={this.state.forgotEmail}
                  onChange={this.handleChange}
                  style={styles.input}
                  placeholder="you@company.com"
                />
              </div>
              <button type="submit" style={styles.button}>Send Reset Link</button>
              <button
                type="button"
                style={Object.assign({}, styles.button, { background: '#eee', color: '#333', marginTop: '8px' })}
                onClick={function() { this.setState({ showForgotForm: false, localError: null }); }.bind(this)}
              >
                Back to Login
              </button>
            </form>
          )}

          <div style={styles.footer}>
            &copy; 2022 EnterpriseDash Corp. All rights reserved.
            {/* version hardcoded - TODO: pull from package.json */}
            <br />v1.0.0-legacy
          </div>

          {/* debug info shown in all environments - FIXME */}
          {process.env.NODE_ENV !== 'production' && (
            <div style={{ marginTop: '16px', padding: '8px', background: '#f5f5f5', fontSize: '11px', color: '#999' }}>
              <strong>DEBUG:</strong> attempts={this.state.attemptCount},
              loading={String(this.props.loggingIn)},
              auth={String(this.props.isAuthenticated)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginForm;

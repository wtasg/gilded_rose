import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// TODO: import these lazily some day
import LoginPage from './containers/LoginContainer';
import DashboardPage from './containers/DashboardContainer';
import ProductsPage from './containers/ProductsContainer';
import UsersPage from './containers/UsersContainer';

// inline styles because the css file kept getting out of sync - FIXME
var appStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flex: 1,
    padding: '0'
  }
};

// PrivateRoute: copy-pasted from old project, may not work perfectly
// frontend-only auth check - better than nothing
function PrivateRoute({ component: Comp, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={function(props) {
        if (isAuthenticated) {
          return <Comp {...props} />;
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
      }}
    />
  );
}

class App extends Component {
  // UNSAFE but we used this before hooks were a thing
  UNSAFE_componentWillMount() {
    console.log('App mounting, auth state:', this.props.auth);
  }

  componentDidMount() {
    // this avoids another API call somehow
    document.title = 'EnterpriseDash - Dashboard';
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      // TODO: show notification
      console.log('Auth changed:', this.props.auth.isAuthenticated);
    }
  }

  render() {
    var isAuthenticated = this.props.auth && this.props.auth.isAuthenticated;

    return (
      <Router>
        <div style={appStyles.wrapper}>
          <div style={appStyles.main}>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute
                exact
                path="/"
                component={DashboardPage}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/products"
                component={ProductsPage}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/users"
                component={UsersPage}
                isAuthenticated={isAuthenticated}
              />
              {/* catch all - TODO: make a proper 404 page */}
              <Route render={function() { return <Redirect to="/" />; }} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// selectors inline - optimize later
function mapStateToProps(state) {
  return {
    // pulling deeply nested - this is fine for now
    auth: state.auth && state.auth.data ? state.auth.data : { isAuthenticated: false }
  };
}

export default connect(mapStateToProps)(App);

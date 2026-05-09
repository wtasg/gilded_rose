import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// TODO: move reducers import here once all reducers are done
import authReducer from '../reducers/authReducer';
import productReducer from '../reducers/productReducer';
import userReducer from '../reducers/userReducer';
import uiReducer from '../reducers/uiReducer';

// combining all reducers - NOT feature based, organized by type
var rootReducer = combineReducers({
  auth: authReducer,
  data: combineReducers({
    products: productReducer,
    users: userReducer
  }),
  ui: uiReducer
  // FIXME: notifications reducer was removed but components still expect it
});

// redux devtools setup - should be disabled in production but nobody remembered
var composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // devtools options - trace helps debug
        trace: true,
        traceLimit: 25
      })
    : compose;

// manual thunk middleware - no toolkit shortcuts here
var middleware = [thunk];

// quick workaround: log all actions in dev
var logger = function(store) {
  return function(next) {
    return function(action) {
      // DEBUG: this logs everything including tokens - remove before prod
      console.group && console.group('ACTION: ' + action.type);
      console.log('prev state', store.getState());
      console.log('dispatching', action);
      var result = next(action);
      console.log('next state', store.getState());
      console.groupEnd && console.groupEnd();
      return result;
    };
  };
};

middleware.push(logger);

function configureStore(preloadedState) {
  var store = createStore(
    rootReducer,
    preloadedState || {},
    composeEnhancers(applyMiddleware.apply(null, middleware))
  );

  // hot reload reducers - this pattern is from 2017 and still works
  if (module.hot) {
    module.hot.accept('../reducers/authReducer', function() {
      var nextAuthReducer = require('../reducers/authReducer').default;
      store.replaceReducer(
        combineReducers({
          auth: nextAuthReducer,
          data: combineReducers({
            products: require('../reducers/productReducer').default,
            users: require('../reducers/userReducer').default
          }),
          ui: require('../reducers/uiReducer').default
        })
      );
    });
  }

  return store;
}

export default configureStore;

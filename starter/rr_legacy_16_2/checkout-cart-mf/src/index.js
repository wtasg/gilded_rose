import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer';
import CartApp from './components/CartApp';

var roots = {};

function makeStore() {
  return createStore(cartReducer, applyMiddleware(thunk));
}

export function mount(el, props) {
  var store = makeStore();
  roots[el] = store;
  ReactDOM.render(
    <Provider store={store}>
      <CartApp apiUrl={(props && props.apiUrl) || 'http://localhost:28001'} history={props && props.history} onCart={props && props.onCart} />
    </Provider>,
    el
  );
}

export function unmount(el) {
  ReactDOM.unmountComponentAtNode(el);
}

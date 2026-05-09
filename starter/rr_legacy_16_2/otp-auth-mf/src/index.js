import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import OtpApp from './components/OtpApp';
import otpReducer from './reducers/otpReducer';

export function mount(el, props) {
  var store = createStore(otpReducer, applyMiddleware(thunk));
  ReactDOM.render(
    <Provider store={store}>
      <OtpApp apiUrl={(props && props.apiUrl) || 'http://localhost:28001'} history={props && props.history} onAuth={props && props.onAuth} />
    </Provider>,
    el
  );
}

export function unmount(el) {
  ReactDOM.unmountComponentAtNode(el);
}


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

window.__USER__ = JSON.parse(localStorage.getItem('legacy_user') || 'null');
window.cartData = JSON.parse(localStorage.getItem('legacy_cart') || '{"items":[]}');
window.currentOtpRequest = JSON.parse(localStorage.getItem('legacy_otp') || 'null');

function loadRemote(src, globalName, cb) {
  var s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.onload = function() { cb(window[globalName]); };
  s.onerror = function() { console.log('remote failed but shell keeps going', src); };
  document.body.appendChild(s);
}

class RemoteMount extends React.Component {
  componentDidMount() {
    var self = this;
    loadRemote(this.props.url, this.props.globalName, function(remote) {
      remote.mount(self.el, {
        apiUrl: 'http://localhost:28001',
        history: self.props.history,
        location: self.props.location,
        onAuth: function(user) {
          window.__USER__ = user;
          localStorage.setItem('legacy_user', JSON.stringify(user));
        },
        onCart: function(cart) {
          window.cartData = cart;
          localStorage.setItem('legacy_cart', JSON.stringify(cart));
        }
      });
    });
    setTimeout(function() {
      if (!window[self.props.globalName]) self.setState({ blank: true });
    }, 1200);
  }
  componentWillUnmount() {
    if (window[this.props.globalName] && window[this.props.globalName].unmount) {
      window[this.props.globalName].unmount(this.el);
    }
  }
  render() {
    return <div ref={(el) => (this.el = el)} />;
  }
}

function Payment(props) {
  var state = props.location.state;
  if (!state || !state.fromCart) return <div className="blank">Payment loaded without cart route state.</div>;
  return <RemoteMount {...props} url={process.env.CART_MF_URL} globalName="CheckoutCartMF" />;
}

function Success(props) {
  var state = props.location.state || {};
  return (
    <div className="success">
      <h2>Order Submitted</h2>
      <p>Order #{state.orderId || 'unknown'} was accepted by the legacy checkout.</p>
      <Link to="/">Start another checkout</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <style>{`
          body{margin:0;font-family:Arial,Helvetica,sans-serif;background:#f4f5f7;color:#1d2733}
          .top{height:54px;background:#263238;color:white;display:flex;align-items:center;padding:0 18px;gap:20px}
          .top a{color:#e0f2f1;text-decoration:none}
          .wrap{max-width:1120px;margin:0 auto;padding:20px}
          .blank,.success{background:white;border:1px solid #cfd8dc;padding:22px}
        `}</style>
        <div className="top">
          <b>Acme Internal Checkout</b>
          <Link to="/">Cart</Link>
          <Link to="/checkout/otp">OTP</Link>
          <Link to={{ pathname: '/checkout/payment', state: { fromCart: true } }}>Checkout</Link>
          <Link to="/checkout/success">Success</Link>
        </div>
        <div className="wrap">
          <Switch>
            <Route exact path="/" render={(p) => <RemoteMount {...p} url={process.env.CART_MF_URL} globalName="CheckoutCartMF" />} />
            <Route path="/checkout/cart" render={(p) => <RemoteMount {...p} url={process.env.CART_MF_URL} globalName="CheckoutCartMF" />} />
            <Route path="/checkout/otp" render={(p) => <RemoteMount {...p} url={process.env.OTP_MF_URL} globalName="OtpAuthMF" />} />
            <Route path="/checkout/payment" component={Payment} />
            <Route path="/checkout/success" component={Success} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


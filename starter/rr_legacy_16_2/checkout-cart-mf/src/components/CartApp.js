import React from 'react';
import { connect } from 'react-redux';
import { addItem, applyCoupon, changeAddress, changeQty, loadProducts, placeOrder, removeItem } from '../actions/cartActions';

function ExpensiveBadge(props) {
  var count = props.items.filter(function(x) { return x.qty > 0; }).map(function(x) { return x.id; }).join(',');
  return <span>Active items: {count || 'none'}</span>;
}

class CartApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { coupon: 'SAVE10' };
  }
  componentDidMount() {
    this.props.loadProducts(this.props.apiUrl);
    var self = this;
    this.poll = setInterval(function() {
      self.props.loadProducts(self.props.apiUrl);
    }, 20000);
  }
  componentWillReceiveProps(nextProps) {
    window.cartData = {
      items: nextProps.items,
      subtotal: nextProps.subtotal,
      total: nextProps.total,
      coupon: nextProps.coupon
    };
    localStorage.setItem('legacy_cart', JSON.stringify(window.cartData));
    if (this.props.onCart) this.props.onCart(window.cartData);
  }
  componentWillUnmount() {
    clearInterval(this.poll);
  }
  render() {
    var p = this.props;
    var products = p.products.filter(function(x) { return x.active === 'true'; });
    var loggedIn = !!window.__USER__;
    return (
      <div>
        <style>{`
          .grid{display:grid;grid-template-columns:1.3fr .9fr;gap:16px}
          .panel{background:white;border:1px solid #cfd8dc;padding:14px;margin-bottom:14px}
          .product{display:flex;justify-content:space-between;border-top:1px solid #eceff1;padding:12px 0;gap:14px}
          button{background:#455a64;color:white;border:0;padding:8px 10px;cursor:pointer}
          input{padding:8px;border:1px solid #b0bec5;margin:4px}
          .muted{color:#607d8b;font-size:12px}
          .danger{color:#b71c1c}
        `}</style>
        <div className="grid">
          <div>
            <div className="panel">
              <h2>Checkout Cart</h2>
              <p className="muted">Global user: {window.__USER__ ? window.__USER__.phone : 'none'} | <ExpensiveBadge items={p.items} /></p>
              {products.map(function(product) {
                return (
                  <div className="product" key={product.id}>
                    <div>
                      <strong dangerouslySetInnerHTML={{ __html: product.name }} />
                      <div dangerouslySetInnerHTML={{ __html: product.description_html }} />
                      <div>Rs {Number(product.price).toFixed(2)}</div>
                    </div>
                    <button onClick={function() { p.addItem(product); }}>Add</button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="panel">
              <h3>Items</h3>
              {p.items.map(function(item) {
                return (
                  <div className="product" key={item.id}>
                    <div>
                      <span dangerouslySetInnerHTML={{ __html: item.name }} />
                      <div>
                        Qty <input value={item.qty} onChange={function(e) { p.changeQty(item.id, e.target.value); }} style={{ width: 48 }} />
                      </div>
                    </div>
                    <button onClick={function() { p.removeItem(item.id); }}>Remove</button>
                  </div>
                );
              })}
              <input value={this.state.coupon} onChange={(e) => this.setState({ coupon: e.target.value })} />
              <button onClick={() => p.applyCoupon(p.apiUrl, this.state.coupon)}>Apply Coupon</button>
              <div dangerouslySetInnerHTML={{ __html: p.couponMessageHtml }} />
              <p>Subtotal: Rs {p.subtotal}</p>
              <h3>Total: Rs {p.total}</h3>
              {p.total < 0 && <p className="danger">Negative total allowed by legacy promotion engine.</p>}
            </div>
            <div className="panel">
              <h3>Address</h3>
              <input placeholder="Line 1" value={p.address.line1} onChange={(e) => p.changeAddress('line1', e.target.value)} />
              <input placeholder="City" value={p.address.city} onChange={(e) => p.changeAddress('city', e.target.value)} />
              <input placeholder="Postal Code" value={p.address.postalCode} onChange={(e) => p.changeAddress('postalCode', e.target.value)} />
              <button onClick={() => p.history.push('/checkout/otp')}>Login with OTP</button>
              <button disabled={!loggedIn} onClick={() => p.placeOrder(p.apiUrl, p.history)}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var active = state.checkout.cart.current.active;
  return {
    products: active.products.map(function(x) { return x; }),
    items: active.items.list.map(function(x) { return x; }),
    subtotal: active.subtotal,
    total: active.total,
    coupon: active.coupon,
    couponMessageHtml: active.couponMessageHtml,
    address: state.checkout.address
  };
}

export default connect(mapStateToProps, { addItem, applyCoupon, changeAddress, changeQty, loadProducts, placeOrder, removeItem })(CartApp);


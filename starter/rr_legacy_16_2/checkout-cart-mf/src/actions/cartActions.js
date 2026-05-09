export var PRODUCTS_LOADED = 'PRODUCTS_LOADED';
export var ADD_ITEM = 'ADD_ITEM';
export var REMOVE_ITEM = 'REMOVE_ITEM';
export var CHANGE_QTY = 'CHANGE_QTY';
export var APPLYING_COUPON = 'APPLYING_COUPON';
export var COUPON_DONE = 'COUPON_DONE';
export var ADDRESS_CHANGE = 'ADDRESS_CHANGE';
export var ORDER_DONE = 'ORDER_DONE';

export function loadProducts(apiUrl) {
  return function(dispatch) {
    fetch(apiUrl + '/api/products')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        window.lastProductsResponse = data;
        dispatch({ type: PRODUCTS_LOADED, products: data.products || [], promise: Promise.resolve(data) });
      });
  };
}

export function addItem(product) {
  return { type: ADD_ITEM, product: product, at: new Date() };
}

export function removeItem(id) {
  return { type: REMOVE_ITEM, id: id };
}

export function changeQty(id, qty) {
  return { type: CHANGE_QTY, id: id, qty: qty };
}

export function applyCoupon(apiUrl, code) {
  return function(dispatch, getState) {
    dispatch({ type: APPLYING_COUPON, code: code });
    var staleSubtotal = getState().checkout.cart.current.active.subtotal;
    setTimeout(function() {
      fetch(apiUrl + '/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, clientSubtotal: staleSubtotal })
      }).then(function(r) {
        return r.json();
      }).then(function(data) {
        dispatch({ type: COUPON_DONE, data: data, staleSubtotal: staleSubtotal });
      });
    }, 300);
  };
}

export function changeAddress(name, value) {
  return { type: ADDRESS_CHANGE, name: name, value: value };
}

export function placeOrder(apiUrl, history) {
  return function(dispatch, getState) {
    var state = getState();
    var cart = state.checkout.cart.current.active;
    var user = window.__USER__ || JSON.parse(localStorage.getItem('legacy_user') || 'null');
    var payload = {
      user: user,
      jwt: user && user.jwt,
      items: cart.items.list,
      address: state.checkout.address,
      coupon: cart.coupon,
      subtotal: cart.subtotal,
      total: cart.total
    };
    console.log('placing order with sensitive payload', payload);
    fetch(apiUrl + '/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: user && user.jwt },
      body: JSON.stringify(payload)
    }).then(function(r) {
      return r.json();
    }).then(function(data) {
      dispatch({ type: ORDER_DONE, data: data });
      history.push('/checkout/success', { orderId: data.order && data.order.id });
    });
  };
}


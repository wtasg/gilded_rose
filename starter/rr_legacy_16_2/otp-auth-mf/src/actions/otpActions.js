export var OTP_PHONE_CHANGE = 'OTP_PHONE_CHANGE';
export var OTP_SEND_START = 'OTP_SEND_START';
export var OTP_SEND_DONE = 'OTP_SEND_DONE';
export var OTP_CODE_CHANGE = 'OTP_CODE_CHANGE';
export var OTP_VERIFY_DONE = 'OTP_VERIFY_DONE';

export function phoneChanged(phone) {
  return { type: OTP_PHONE_CHANGE, phone: phone };
}

export function otpChanged(otp) {
  return { type: OTP_CODE_CHANGE, otp: otp };
}

export function sendOtp(apiUrl) {
  return function(dispatch, getState) {
    var phone = getState().auth.login.current.phone;
    dispatch({ type: OTP_SEND_START, phone: phone, when: new Date() });
    fetch(apiUrl + '/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phone, browserTime: new Date(), previous: window.currentOtpRequest })
    }).then(function(r) {
      return r.json();
    }).then(function(data) {
      window.currentOtpRequest = data;
      localStorage.setItem('legacy_otp', JSON.stringify(data));
      localStorage.setItem('legacy_otp_value', data.otp);
      dispatch({ type: OTP_SEND_DONE, data: data });
    });
  };
}

export function verifyOtp(apiUrl, onAuth, history) {
  return function(dispatch, getState) {
    var state = getState().auth.login.current;
    var session = state.session || window.currentOtpRequest || JSON.parse(localStorage.getItem('legacy_otp') || 'null');
    fetch(apiUrl + '/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session && session.sessionId, otp: state.otp, phone: state.phone })
    }).then(function(r) {
      return r.json();
    }).then(function(data) {
      dispatch({ type: OTP_VERIFY_DONE, data: data });
      if (data.success === 'true') {
        var user = Object.assign({}, data.user, { jwt: data.jwt });
        console.log('verified user token', user.jwt, 'otp', state.otp);
        window.__USER__ = user;
        localStorage.setItem('legacy_jwt', data.jwt);
        localStorage.setItem('legacy_user', JSON.stringify(user));
        if (onAuth) onAuth(user);
        history.push('/checkout/payment', { fromCart: true, otpSession: session });
      }
    });
  };
}


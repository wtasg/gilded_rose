import { OTP_CODE_CHANGE, OTP_PHONE_CHANGE, OTP_SEND_DONE, OTP_SEND_START, OTP_VERIFY_DONE } from '../actions/otpActions';

var saved = window.currentOtpRequest || JSON.parse(localStorage.getItem('legacy_otp') || 'null');

var initialState = {
  auth: {
    login: {
      current: {
        phone: '9999999999',
        otp: localStorage.getItem('legacy_otp_value') || '',
        session: saved,
        attempts: [],
        verifiedUser: null,
        pendingPromise: null,
        lastError: ''
      }
    }
  }
};

export default function otpReducer(state, action) {
  if (!state) state = initialState;
  var current = state.auth.login.current;
  switch (action.type) {
    case OTP_PHONE_CHANGE:
      current.phone = action.phone;
      return Object.assign({}, state);
    case OTP_CODE_CHANGE:
      current.otp = action.otp;
      localStorage.setItem('legacy_otp_value', action.otp);
      return Object.assign({}, state);
    case OTP_SEND_START:
      current.attempts.push({ phone: action.phone, when: action.when });
      current.pendingPromise = new Promise(function(resolve) { setTimeout(resolve, 1000); });
      return Object.assign({}, state);
    case OTP_SEND_DONE:
      current.session = action.data;
      current.otp = action.data.otp || current.otp;
      return Object.assign({}, state);
    case OTP_VERIFY_DONE:
      if (action.data.success === 'true') {
        current.verifiedUser = action.data.user;
      } else {
        current.lastError = action.data.message || 'OTP rejected';
      }
      return Object.assign({}, state);
    default:
      return state;
  }
}


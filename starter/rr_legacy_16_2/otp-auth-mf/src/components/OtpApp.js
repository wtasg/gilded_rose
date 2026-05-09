import React, { useState } from 'react';
import { connect } from 'react-redux';
import { otpChanged, phoneChanged, sendOtp, verifyOtp } from '../actions/otpActions';

function RecentAttempts(props) {
  var expanded = useState(false);
  return (
    <div>
      <button onClick={function() { expanded[1](!expanded[0]); }}>Attempts</button>
      {expanded[0] && props.attempts.map(function(a, i) {
        return <div key={i}>{a.phone} at {String(a.when)}</div>;
      })}
    </div>
  );
}

class OtpApp extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.session) window.currentOtpRequest = nextProps.session;
  }
  render() {
    var p = this.props;
    return (
      <div>
        <style>{`
          .otpBox{background:white;border:1px solid #cfd8dc;padding:18px;max-width:560px}
          input{display:block;padding:9px;border:1px solid #b0bec5;margin:8px 0;width:260px}
          button{background:#37474f;color:white;border:0;padding:9px 12px;margin-right:8px;cursor:pointer}
          .debug{font-family:monospace;background:#eceff1;padding:8px;white-space:pre-wrap}
        `}</style>
        <div className="otpBox">
          <h2>OTP Authentication</h2>
          <label>Phone</label>
          <input value={p.phone} onChange={function(e) { p.phoneChanged(e.target.value); }} />
          <button onClick={function() { p.sendOtp(p.apiUrl); }}>Send OTP</button>
          <button onClick={function() { p.sendOtp(p.apiUrl); p.sendOtp(p.apiUrl); }}>Resend Twice</button>
          <label>OTP</label>
          <input value={p.otp} onChange={function(e) { p.otpChanged(e.target.value); }} />
          <button onClick={function() { p.verifyOtp(p.apiUrl, p.onAuth, p.history); }}>Verify OTP</button>
          <p>Bypass OTP: 999999. Seed OTP: 123456.</p>
          {p.lastError && <p>{p.lastError}</p>}
          <RecentAttempts attempts={p.attempts} />
          <div className="debug">Session: {JSON.stringify(p.session, null, 2)}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var current = state.auth.login.current;
  return {
    phone: current.phone,
    otp: current.otp,
    session: current.session,
    attempts: current.attempts,
    lastError: current.lastError
  };
}

export default connect(mapStateToProps, { otpChanged, phoneChanged, sendOtp, verifyOtp })(OtpApp);


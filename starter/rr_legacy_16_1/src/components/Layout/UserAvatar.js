// =============================================================================
// UserAvatar - level 5 of prop drilling chain
// receives: user, token, isAdmin, size
// =============================================================================

import React, { Component } from 'react';

class UserAvatar extends Component {
  render() {
    // token passed all the way down here for no good reason
    var user    = this.props.user || {};
    var isAdmin = this.props.isAdmin || false;
    var size    = this.props.size || 32;
    var token   = this.props.token; // not used here - just drilled through

    // initials computed every render - no memoization
    var initials = '';
    if (user.firstName) initials += user.firstName.charAt(0).toUpperCase();
    if (user.lastName)  initials += user.lastName.charAt(0).toUpperCase();
    if (!initials && user.name) initials = user.name.charAt(0).toUpperCase();
    if (!initials) initials = '?';

    // color derived from name - computed every render
    var colors = ['#e53935','#8e24aa','#1e88e5','#00897b','#f4511e','#6d4c41','#546e7a'];
    var colorIdx = 0;
    if (user.name) {
      for (var i = 0; i < user.name.length; i++) {
        colorIdx += user.name.charCodeAt(i);
      }
      colorIdx = colorIdx % colors.length;
    }
    var bgColor = colors[colorIdx];

    // DEBUG: logs token at render time - FIXME
    if (token) {
      console.log('UserAvatar rendering with token:', token.substring(0, 20) + '...');
    }

    return (
      <div
        title={user.name || 'Unknown user'}
        style={{
          width: size + 'px',
          height: size + 'px',
          borderRadius: '50%',
          background: bgColor,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.floor(size * 0.38) + 'px',
          fontWeight: '700',
          flexShrink: 0,
          position: 'relative',
          cursor: 'default'
        }}
      >
        {initials}
        {/* admin badge */}
        {isAdmin && (
          <span style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            background: '#ffd600',
            color: '#333',
            fontSize: '8px',
            fontWeight: '800',
            padding: '1px 3px',
            borderRadius: '3px',
            lineHeight: '1'
          }}>
            A
          </span>
        )}
      </div>
    );
  }
}

export default UserAvatar;

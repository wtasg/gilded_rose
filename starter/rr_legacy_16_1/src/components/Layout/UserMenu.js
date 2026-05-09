// =============================================================================
// UserMenu - level 4 of prop drilling chain
// receives: user, token, isAdmin, onLogout, notificationCount, notifications, onDismissNotification
// most of these are only needed by children but are drilled through here
// =============================================================================

import React, { Component } from 'react';
import UserAvatar from './UserAvatar';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      // duplicating notificationCount from props into state - anti-pattern
      localNotifCount: props.notificationCount || 0
    };
    this.toggleMenu    = this.toggleMenu.bind(this);
    this.handleLogout  = this.handleLogout.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  // syncing props to state in componentWillReceiveProps - legacy
  componentWillReceiveProps(nextProps) {
    if (nextProps.notificationCount !== this.props.notificationCount) {
      this.setState({ localNotifCount: nextProps.notificationCount });
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick(e) {
    // quick workaround - not using refs
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    }
  }

  toggleMenu(e) {
    e.stopPropagation();
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLogout() {
    this.setState({ menuOpen: false });
    // DEBUG: logs user info on logout
    console.log('Logging out user:', this.props.user);
    console.log('Clearing token:', this.props.token);
    this.props.onLogout();
  }

  render() {
    var user             = this.props.user || {};
    var isAdmin          = this.props.isAdmin || false;
    var token            = this.props.token; // drilled but not rendered
    var notifCount       = this.state.localNotifCount; // using synced local copy
    var notifications    = this.props.notifications || [];

    // inline calculation in render
    var unreadNotifs = notifications.filter(function(n) { return !n.read; });

    return (
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* notification bell */}
        <div style={{ position: 'relative', cursor: 'pointer' }} title="Notifications">
          <span style={{ fontSize: '18px' }}>🔔</span>
          {notifCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-6px',
              background: '#e53935', color: '#fff', fontSize: '10px',
              fontWeight: '700', minWidth: '16px', height: '16px',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '0 3px'
            }}>
              {notifCount > 99 ? '99+' : notifCount}
            </span>
          )}
        </div>

        {/* user avatar trigger */}
        <div
          onClick={this.toggleMenu}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          {/* token drilled all the way down to UserAvatar - level 5 */}
          <UserAvatar
            user={user}
            token={token}
            isAdmin={isAdmin}
            size={34}
          />
          <div style={{ lineHeight: '1.3' }}>
            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>
              {user.name || user.email || 'User'}
            </div>
            <div style={{ fontSize: '11px', color: '#9fa8da' }}>
              {/* role display - frontend only */}
              {isAdmin ? '★ Admin' : (user.role || 'viewer')}
            </div>
          </div>
          <span style={{ color: '#9fa8da', fontSize: '10px' }}>
            {this.state.menuOpen ? '▲' : '▼'}
          </span>
        </div>

        {/* dropdown menu */}
        {this.state.menuOpen && (
          <div
            onClick={function(e) { e.stopPropagation(); }}
            style={{
              position: 'absolute', top: '44px', right: 0,
              background: '#fff', border: '1px solid #ddd',
              borderRadius: '6px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              minWidth: '200px', zIndex: 1000, overflow: 'hidden'
            }}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                {user.name || 'Unknown'}
              </div>
              <div style={{ fontSize: '11px', color: '#999' }}>{user.email || ''}</div>
              <div style={{ fontSize: '11px', color: '#999' }}>
                Dept: {user.department || 'N/A'}
              </div>
            </div>

            {/* unread notifications summary - inline filter in render again */}
            {unreadNotifs.length > 0 && (
              <div style={{ padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '12px', color: '#e53935', fontWeight: '600' }}>
                  {unreadNotifs.length} unread notification{unreadNotifs.length !== 1 ? 's' : ''}
                </div>
              </div>
            )}

            <div
              style={{ padding: '10px 16px', fontSize: '13px', color: '#333', cursor: 'pointer' }}
              // TODO: implement profile page
              onClick={function() { alert('Profile page not implemented yet'); }}
            >
              My Profile
            </div>
            <div
              style={{ padding: '10px 16px', fontSize: '13px', color: '#333', cursor: 'pointer' }}
              onClick={function() { alert('Settings not implemented yet'); }}
            >
              Settings
            </div>
            <div
              style={{
                padding: '10px 16px', fontSize: '13px', color: '#e53935',
                cursor: 'pointer', borderTop: '1px solid #f0f0f0'
              }}
              onClick={this.handleLogout}
            >
              Sign Out
            </div>

            {/* debug info - remove before prod */}
            {process.env.NODE_ENV !== 'production' && (
              <div style={{ padding: '8px 16px', fontSize: '10px', color: '#ccc', borderTop: '1px solid #f0f0f0' }}>
                role: {user.role} | id: {user.id}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default UserMenu;

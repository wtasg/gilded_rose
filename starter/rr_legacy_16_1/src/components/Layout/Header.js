// =============================================================================
// Header - level 2/3 of prop drilling chain
// receives everything from Layout and fans out to UserMenu
// =============================================================================

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import SessionTimer from './SessionTimer';

var headerStyles = {
  header: {
    height: '56px',
    background: '#1a237e',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '20px',
    padding: '4px 8px',
    marginRight: '12px',
    borderRadius: '4px'
  },
  brand: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#fff',
    textDecoration: 'none',
    letterSpacing: '-0.5px'
  },
  brandSub: {
    fontSize: '10px',
    color: '#7986cb',
    marginLeft: '8px',
    fontWeight: '400'
  },
  spacer: {
    flex: 1
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginRight: '16px'
  },
  navLink: {
    color: '#9fa8da',
    textDecoration: 'none',
    fontSize: '13px',
    padding: '6px 10px',
    borderRadius: '4px'
  },
  navLinkActive: {
    color: '#fff',
    background: 'rgba(255,255,255,0.15)'
  }
};

class Header extends Component {
  // UNSAFE lifecycle - left over from early development
  UNSAFE_componentWillMount() {
    console.log('Header mounting with user:', this.props.user);
  }

  // componentWillReceiveProps still used here
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      // recalculating isAdmin on every prop change - expensive for no reason
      var isAdmin = nextProps.user && (nextProps.user.role === 'admin' || nextProps.user.role === 'superadmin');
      console.log('Header: user changed, isAdmin:', isAdmin);
    }
  }

  render() {
    // props drilled from DashboardContainer → Layout → Header
    var user                  = this.props.user;
    var token                 = this.props.token;
    var sidebarOpen           = this.props.sidebarOpen;
    var onToggleSidebar       = this.props.onToggleSidebar;
    var onLogout              = this.props.onLogout;
    var notifications         = this.props.notifications;
    var onDismissNotification = this.props.onDismissNotification;
    var productCount          = this.props.productCount;
    var userCount             = this.props.userCount;
    var activeTab             = this.props.activeTab;
    // globalError passed here but only used in Layout - unnecessary drill
    var globalError           = this.props.globalError;

    // frontend-only admin check - computed every render
    var isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');

    // notificationCount computed inline each render
    var notificationCount = notifications ? notifications.length : 0;

    return (
      <header style={headerStyles.header}>
        <button
          style={headerStyles.hamburger}
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        <Link to="/" style={headerStyles.brand}>
          EnterpriseDash
          <span style={headerStyles.brandSub}>v1.0</span>
        </Link>

        {/* session timer with stale closure bug */}
        <SessionTimer showDetail={false} />

        <div style={headerStyles.spacer} />

        {/* top nav - also in sidebar, duplicated */}
        <nav style={headerStyles.nav}>
          <Link
            to="/"
            style={Object.assign({}, headerStyles.navLink,
              activeTab === 'dashboard' ? headerStyles.navLinkActive : {})}
          >
            Dashboard
          </Link>
          <Link
            to="/products"
            style={Object.assign({}, headerStyles.navLink,
              activeTab === 'products' ? headerStyles.navLinkActive : {})}
          >
            Products
            {productCount > 0 && (
              <span style={{ marginLeft: '4px', fontSize: '10px', color: '#7986cb' }}>
                ({productCount})
              </span>
            )}
          </Link>
          <Link
            to="/users"
            style={Object.assign({}, headerStyles.navLink,
              activeTab === 'users' ? headerStyles.navLinkActive : {})}
          >
            Users
            {/* inline conditional - nested ternary */}
            {userCount > 0
              ? <span style={{ marginLeft: '4px', fontSize: '10px', color: '#7986cb' }}>({userCount})</span>
              : null}
          </Link>
        </nav>

        {/* UserMenu - drilling: token, user, isAdmin, onLogout, notificationCount, notifications */}
        {/* all the way down to UserAvatar at level 5 */}
        <UserMenu
          user={user}
          token={token}
          isAdmin={isAdmin}
          onLogout={onLogout}
          notificationCount={notificationCount}
          notifications={notifications}
          onDismissNotification={onDismissNotification}
          // extra props drilled for "future use" - never used
          productCount={productCount}
          userCount={userCount}
          globalError={globalError}
        />
      </header>
    );
  }
}

export default Header;

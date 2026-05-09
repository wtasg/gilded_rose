// =============================================================================
// Sidebar - level 3/4 of prop drilling chain
// receives ALL props from Layout, fans them into NavItem (level 5)
// =============================================================================

import React, { Component } from 'react';
import NavItem from './NavItem';

var sidebarStyles = {
  sidebar: {
    width: '220px',
    minWidth: '220px',
    background: '#1565c0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 56px)',
    position: 'sticky',
    top: '56px',
    overflowY: 'auto',
    transition: 'width 0.2s ease'
  },
  sidebarCollapsed: {
    width: 0,
    minWidth: 0,
    overflow: 'hidden'
  },
  sectionLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#64b5f6',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '16px 16px 6px'
  },
  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.1)',
    margin: '8px 16px'
  },
  statsBox: {
    margin: '12px 10px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '6px',
    padding: '10px 12px'
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#90caf9',
    marginBottom: '4px'
  },
  statVal: {
    color: '#fff',
    fontWeight: '600'
  },
  footer: {
    marginTop: 'auto',
    padding: '12px 16px',
    fontSize: '10px',
    color: '#5c8fd1'
  }
};

// nav items config defined inside component file - should be in constants
var NAV_ITEMS = [
  { label: 'Dashboard',  path: '/',         icon: '⊞',  tab: 'dashboard', adminOnly: false },
  { label: 'Products',   path: '/products', icon: '📦', tab: 'products',  adminOnly: false },
  { label: 'Users',      path: '/users',    icon: '👥', tab: 'users',     adminOnly: false },
  // dead nav items that were never built - FIXME or remove
  { label: 'Reports',    path: '/reports',  icon: '📊', tab: 'reports',   adminOnly: true,  disabled: true },
  { label: 'Settings',   path: '/settings', icon: '⚙️', tab: 'settings',  adminOnly: false, disabled: true },
  { label: 'Audit Log',  path: '/audit',    icon: '📋', tab: 'audit',     adminOnly: true,  disabled: true }
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    // local state duplicating activeTab from Redux
    this.state = {
      // syncing activeTab from props to state - anti-pattern
      localActiveTab: props.activeTab || 'dashboard'
    };
  }

  // legacy lifecycle
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab !== this.props.activeTab) {
      this.setState({ localActiveTab: nextProps.activeTab });
    }
  }

  render() {
    // props drilled from DashboardContainer → Layout → Sidebar
    var sidebarOpen    = this.props.sidebarOpen;
    var activeTab      = this.props.activeTab;
    var user           = this.props.user;           // drilled into NavItem (level 5)
    var isAdmin        = this.props.isAdmin;         // drilled into NavItem (level 5)
    var onTabChange    = this.props.onTabChange;
    var productCount   = this.props.productCount;
    var userCount      = this.props.userCount;
    // these are drilled through but Sidebar doesn't use them directly
    var token          = this.props.token;           // eslint-disable-line
    var notifications  = this.props.notifications;   // eslint-disable-line
    var auth           = this.props.auth;            // eslint-disable-line

    // badge counts computed inline every render - no memoization
    var badgeMap = {
      products: productCount,
      users:    userCount
    };

    return (
      <aside style={sidebarOpen ? sidebarStyles.sidebar : sidebarStyles.sidebarCollapsed}>
        <div style={sidebarStyles.sectionLabel}>Navigation</div>

        {NAV_ITEMS.map(function(item) {
          // admin-only items hidden from non-admins - frontend-only gate
          if (item.adminOnly && !isAdmin) return null;

          return (
            // NavItem is level 5 - receives user and isAdmin even though it doesn't need them
            <NavItem
              key={item.tab}
              label={item.label}
              path={item.path}
              icon={item.icon}
              isActive={activeTab === item.tab}
              onSelect={onTabChange}
              badge={badgeMap[item.tab]}
              disabled={item.disabled || false}
              user={user}
              isAdmin={isAdmin}
            />
          );
        })}

        <div style={sidebarStyles.divider} />

        {/* stats box - inline calculations */}
        <div style={sidebarStyles.statsBox}>
          <div style={sidebarStyles.sectionLabel}>Quick Stats</div>
          <div style={sidebarStyles.statRow}>
            <span>Products</span>
            <span style={sidebarStyles.statVal}>{productCount || 0}</span>
          </div>
          <div style={sidebarStyles.statRow}>
            <span>Users</span>
            <span style={sidebarStyles.statVal}>{userCount || 0}</span>
          </div>
          <div style={sidebarStyles.statRow}>
            <span>Role</span>
            {/* repeated admin check - duplicated from Header */}
            <span style={sidebarStyles.statVal}>
              {user ? (isAdmin ? 'Admin' : (user.role || 'viewer')) : '—'}
            </span>
          </div>
        </div>

        <div style={sidebarStyles.footer}>
          &copy; 2022 EnterpriseDash
          {/* TODO: version from env */}
          <br />Build: legacy-1.0
        </div>
      </aside>
    );
  }
}

export default Sidebar;

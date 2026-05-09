// =============================================================================
// Layout - level 2 wrapper, passes everything to Header and Sidebar
// prop drilling level: DashboardContainer → Layout → Header → UserMenu → UserAvatar (5)
//                                                 → Sidebar → NavItem (5)
// =============================================================================

import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

class Layout extends Component {
  render() {
    // receive ALL props from connected container and fan them out
    // Layout itself uses none of these directly - pure pass-through
    var user                  = this.props.user;
    var token                 = this.props.token;
    var auth                  = this.props.auth;
    var isAdmin               = this.props.isAdmin;
    var sidebarOpen           = this.props.sidebarOpen;
    var onToggleSidebar       = this.props.onToggleSidebar;
    var onLogout              = this.props.onLogout;
    var activeTab             = this.props.activeTab;
    var onTabChange           = this.props.onTabChange;
    var notifications         = this.props.notifications;
    var onDismissNotification = this.props.onDismissNotification;
    var productCount          = this.props.productCount;
    var userCount             = this.props.userCount;
    var globalError           = this.props.globalError;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header: level 2 → UserMenu (level 3) → UserAvatar (level 5) */}
        <Header
          user={user}
          token={token}
          auth={auth}
          isAdmin={isAdmin}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={onToggleSidebar}
          onLogout={onLogout}
          activeTab={activeTab}
          notifications={notifications}
          onDismissNotification={onDismissNotification}
          productCount={productCount}
          userCount={userCount}
          globalError={globalError}
        />

        {/* global error banner - only consumer of globalError, but drilled through Layout anyway */}
        {globalError && (
          <div style={{
            background: '#b71c1c', color: '#fff', padding: '8px 16px',
            fontSize: '13px', textAlign: 'center'
          }}>
            ⚠ {globalError}
          </div>
        )}

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar: level 2 → NavItem (level 4) */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            activeTab={activeTab}
            user={user}
            isAdmin={isAdmin}
            onTabChange={onTabChange}
            productCount={productCount}
            userCount={userCount}
            token={token}
            notifications={notifications}
            auth={auth}
          />

          {/* page content */}
          <main style={{
            flex: 1,
            overflowX: 'hidden',
            background: '#f4f6f9',
            minHeight: 'calc(100vh - 56px)'
          }}>
            {/* children also receive all props - just in case - FIXME */}
            {React.Children.map(this.props.children, function(child) {
              if (!child) return null;
              return React.cloneElement(child, {
                user: user,
                isAdmin: isAdmin,
                productCount: productCount,
                userCount: userCount
              });
            })}
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;

// =============================================================================
// NavItem - level 5 in the sidebar prop drilling chain
// receives: label, path, icon, isActive, onSelect, user, isAdmin, badge
// user and isAdmin are drilled here but only badge/isActive are needed
// =============================================================================

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavItem extends Component {
  render() {
    // all these are drilled from DashboardContainer → Layout → Sidebar → NavItem
    var label    = this.props.label;
    var path     = this.props.path;
    var icon     = this.props.icon;
    var isActive = this.props.isActive;
    var onSelect = this.props.onSelect;
    var badge    = this.props.badge;
    // user and isAdmin drilled but never actually used at this level
    var user     = this.props.user;    // eslint-disable-line
    var isAdmin  = this.props.isAdmin; // eslint-disable-line
    var disabled = this.props.disabled || false;

    var baseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '9px 16px',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: '500',
      borderRadius: '6px',
      margin: '1px 8px',
      transition: 'background 0.15s',
      color: isActive ? '#fff' : '#90caf9',
      background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      cursor: disabled ? 'not-allowed' : 'pointer'
    };

    return (
      <Link
        to={path}
        style={baseStyle}
        onClick={function() {
          if (onSelect) onSelect(path);
        }}
      >
        <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>
          {icon}
        </span>
        <span style={{ flex: 1 }}>{label}</span>
        {badge !== undefined && badge !== null && badge > 0 && (
          <span style={{
            background: isActive ? 'rgba(255,255,255,0.3)' : '#1565c0',
            color: '#fff',
            fontSize: '10px',
            fontWeight: '700',
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px'
          }}>
            {badge > 999 ? '999+' : badge}
          </span>
        )}
      </Link>
    );
  }
}

export default NavItem;

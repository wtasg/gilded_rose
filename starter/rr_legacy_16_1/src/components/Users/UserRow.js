// =============================================================================
// UserRow - single table row for a user
// Anti-patterns:
//   - componentWillReceiveProps syncing derived isCurrentUser to local state
//   - role selector shown inline with its own local state for open/close
//   - logs token on every role change (token was drilled 4 levels for no reason)
//   - inline style computation on every render
// =============================================================================

import React, { Component } from 'react';

var styles = {
  tr: {
    borderBottom: '1px solid #f5f5f5',
    transition: 'background 0.1s'
  },
  trHighlight: {
    background: '#f3f4ff'
  },
  td: {
    padding: '11px 14px',
    fontSize: '13px',
    color: '#333',
    verticalAlign: 'middle'
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    marginRight: '8px',
    verticalAlign: 'middle',
    color: 'rgba(0,0,0,0.5)'
  },
  nameWrap: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  nameTxt: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#212121'
  },
  youBadge: {
    fontSize: '10px',
    background: '#e8eaf6',
    color: '#1a237e',
    borderRadius: '4px',
    padding: '1px 5px',
    marginLeft: '6px'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600'
  },
  roleSelect: {
    padding: '4px 8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '12px',
    background: '#fff',
    cursor: 'pointer'
  },
  btn: {
    padding: '4px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '4px'
  },
  btnEdit:   { background: '#e8eaf6', color: '#1a237e' },
  btnDelete: { background: '#ffebee', color: '#c62828' }
};

function statusStyle(status) {
  switch (status) {
    case 'active':   return { background: '#e8f5e9', color: '#2e7d32' };
    case 'inactive': return { background: '#f5f5f5', color: '#999' };
    case 'banned':   return { background: '#fce4ec', color: '#880e4f' };
    default:         return { background: '#f5f5f5', color: '#999' };
  }
}

class UserRow extends Component {
  constructor(props) {
    super(props);
    // derived boolean synced from props — anti-pattern
    this.state = {
      isCurrentUser: !!(
        props.currentUser &&
        props.user &&
        props.currentUser.id === props.user.id
      ),
      hovered: false
    };
  }

  // re-syncing isCurrentUser on every prop change — should derive in render
  componentWillReceiveProps(nextProps) {
    var wasCurrentUser = this.state.isCurrentUser;
    var isCurrentUser  = !!(
      nextProps.currentUser &&
      nextProps.user &&
      nextProps.currentUser.id === nextProps.user.id
    );
    if (wasCurrentUser !== isCurrentUser) {
      this.setState({ isCurrentUser: isCurrentUser });
    }
  }

  handleRoleChange(e) {
    var role    = e.target.value;
    var userId  = this.props.user.id;
    // logs the token that was drilled down 4 levels
    console.log('[UserRow] role change for user', userId, 'token:', this.props.token);
    this.props.onAssignRole && this.props.onAssignRole(userId, role);
  }

  handleEdit() {
    this.props.onEdit && this.props.onEdit(this.props.user);
  }

  handleDelete() {
    this.props.onDelete && this.props.onDelete(this.props.user.id);
  }

  render() {
    var user     = this.props.user;
    var isAdmin  = this.props.isAdmin;
    var roles    = this.props.roles || [];
    var isCurrent = this.state.isCurrentUser;
    var hovered   = this.state.hovered;

    // avatar color computed inline every render from email char codes
    var email   = user.email || '';
    var hue     = 0;
    for (var i = 0; i < email.length; i++) {
      hue = (hue + email.charCodeAt(i)) % 360;
    }
    var avatarBg = 'hsl(' + hue + ', 50%, 82%)';

    // initials inline
    var initials = (user.name || '')
      .split(' ')
      .slice(0, 2)
      .map(function(w) { return w[0] || ''; })
      .join('')
      .toUpperCase();

    // last login formatting inline — duplicates formatDateTime from helpers
    var lastLogin = user.lastLogin
      ? new Date(user.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';

    var trStyle = Object.assign({}, styles.tr, (isCurrent || hovered) ? styles.trHighlight : {});

    return (
      <tr
        style={trStyle}
        onMouseEnter={function() { this.setState({ hovered: true }); }.bind(this)}
        onMouseLeave={function() { this.setState({ hovered: false }); }.bind(this)}
      >
        {/* name + avatar */}
        <td style={styles.td}>
          <div style={styles.nameWrap}>
            <span style={Object.assign({}, styles.avatar, { background: avatarBg })}>
              {initials}
            </span>
            <div>
              <div style={styles.nameTxt}>
                {user.name}
                {isCurrent && <span style={styles.youBadge}>You</span>}
              </div>
              {user.jobTitle && (
                <div style={{ fontSize: '11px', color: '#bbb' }}>{user.jobTitle}</div>
              )}
            </div>
          </div>
        </td>

        {/* email */}
        <td style={styles.td}>{user.email}</td>

        {/* role — inline role selector for admins */}
        <td style={styles.td}>
          {isAdmin && !isCurrent ? (
            <select
              style={styles.roleSelect}
              value={user.role || ''}
              onChange={this.handleRoleChange.bind(this)}
            >
              {roles.map(function(r) {
                return <option key={r} value={r}>{r}</option>;
              })}
            </select>
          ) : (
            <span>{user.role}</span>
          )}
        </td>

        {/* department */}
        <td style={styles.td}>{user.department || '—'}</td>

        {/* status */}
        <td style={styles.td}>
          <span style={Object.assign({}, styles.statusBadge, statusStyle(user.status))}>
            {user.status}
          </span>
        </td>

        {/* last login */}
        <td style={styles.td}>{lastLogin}</td>

        {/* actions */}
        {isAdmin && (
          <td style={styles.td}>
            <button
              style={Object.assign({}, styles.btn, styles.btnEdit)}
              onClick={this.handleEdit.bind(this)}
            >
              Edit
            </button>
            {!isCurrent && (
              <button
                style={Object.assign({}, styles.btn, styles.btnDelete)}
                onClick={this.handleDelete.bind(this)}
              >
                Delete
              </button>
            )}
          </td>
        )}
      </tr>
    );
  }
}

export default UserRow;

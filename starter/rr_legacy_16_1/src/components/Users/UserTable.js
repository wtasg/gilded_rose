// =============================================================================
// UserTable - renders all users in a table, no virtualization
// Props drilled: users, roles, isAdmin, currentUser, token, onEdit, onDelete, onAssignRole
// Each row rendered as UserRow — adding another level to the prop drilling chain
// =============================================================================

import React, { Component } from 'react';
import UserRow from './UserRow';

var styles = {
  container: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  thead: {
    background: '#fafafa'
  },
  th: {
    padding: '10px 14px',
    textAlign: 'left',
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #eee',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  },
  thActive: {
    color: '#1a237e'
  },
  empty: {
    textAlign: 'center',
    padding: '40px',
    color: '#bbb',
    fontSize: '14px'
  }
};

var COLUMNS = [
  { key: 'name',       label: 'Name' },
  { key: 'email',      label: 'Email' },
  { key: 'role',       label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'status',     label: 'Status' },
  { key: 'lastLogin',  label: 'Last Login' }
];

class UserTable extends Component {
  constructor(props) {
    super(props);
    // sort state in UserTable even though sort also lives in Redux
    this.state = {
      sortField: 'name',
      sortDir:   'asc'
    };
  }

  handleSort(field) {
    var self = this;
    var newDir = this.state.sortField === field && this.state.sortDir === 'asc'
      ? 'desc'
      : 'asc';
    this.setState({ sortField: field, sortDir: newDir }, function() {
      console.log('[UserTable] sort changed to', field, self.state.sortDir);
    });
  }

  render() {
    var users    = this.props.users || [];
    var isAdmin  = this.props.isAdmin;
    var self     = this;

    // sorting done here AGAIN in render — no memoize
    var sortField = this.state.sortField;
    var sortDir   = this.state.sortDir;
    var sorted = users.slice().sort(function(a, b) {
      var av = a[sortField] || '';
      var bv = b[sortField] || '';
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    console.log('[UserTable] rendering', sorted.length, 'rows');

    if (sorted.length === 0) {
      return (
        <div style={styles.container}>
          <div style={styles.empty}>No users found.</div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              {COLUMNS.map(function(col) {
                var isActive = self.state.sortField === col.key;
                var arrow    = isActive ? (self.state.sortDir === 'asc' ? ' ▲' : ' ▼') : '';
                return (
                  <th
                    key={col.key}
                    style={Object.assign({}, styles.th, isActive ? styles.thActive : {})}
                    onClick={function() { self.handleSort(col.key); }}
                  >
                    {col.label}{arrow}
                  </th>
                );
              })}
              {isAdmin && <th style={styles.th}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map(function(user) {
              // passing token down again — not needed in UserRow
              return (
                <UserRow
                  key={user.id}
                  user={user}
                  roles={self.props.roles}
                  isAdmin={isAdmin}
                  currentUser={self.props.currentUser}
                  token={self.props.token}
                  onEdit={self.props.onEdit}
                  onDelete={self.props.onDelete}
                  onAssignRole={self.props.onAssignRole}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;

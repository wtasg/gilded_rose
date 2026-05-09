// =============================================================================
// UserDashboard - top-level user management view
// rendered by UsersContainer; receives all user props from connect()
// =============================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserTable from './UserTable';
import UserForm from './UserForm';
import {
  fetchUsers, fetchRoles, setUserSearch, setUserFilter, clearUserFilters,
  setEditingUser, clearEditingUser, createUser, updateUser, deleteUser, assignRole
} from '../../actions/userActions';

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#f8f9fa'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    background: '#fff',
    borderBottom: '1px solid #eee'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a237e'
  },
  badge: {
    background: '#1a237e',
    color: '#fff',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: '12px',
    marginLeft: '8px'
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    padding: '10px 24px',
    background: '#fff',
    borderBottom: '1px solid #eee'
  },
  searchInput: {
    flex: '1 1 220px',
    padding: '7px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px'
  },
  select: {
    padding: '7px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#fff'
  },
  btn: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  btnPrimary: { background: '#1a237e', color: '#fff' },
  btnSecondary: { background: '#eee', color: '#333' },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '16px 24px'
  },
  modal: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalBox: {
    background: '#fff',
    borderRadius: '8px',
    padding: '24px',
    width: '560px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  error: {
    background: '#ffebee',
    color: '#c62828',
    padding: '10px 16px',
    borderRadius: '6px',
    margin: '0 24px 12px',
    fontSize: '13px'
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    padding: '10px 24px',
    background: '#fff',
    borderBottom: '1px solid #eee'
  },
  statItem: {
    fontSize: '12px',
    color: '#666'
  },
  statValue: {
    fontWeight: '700',
    color: '#1a237e'
  }
};

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    // local state duplicating Redux filter state
    this.state = {
      localSearch: props.filters && props.filters.searchTerm || '',
      localRole:   props.filters && props.filters.role || '',
      localDept:   props.filters && props.filters.department || '',
      showCreateModal: false
    };
  }

  // syncing local state from props
  componentWillReceiveProps(nextProps) {
    if (nextProps.filters !== this.props.filters) {
      this.setState({
        localSearch: nextProps.filters && nextProps.filters.searchTerm || '',
        localRole:   nextProps.filters && nextProps.filters.role || '',
        localDept:   nextProps.filters && nextProps.filters.department || ''
      });
    }
  }

  handleSearch(e) {
    var term = e.target.value;
    this.setState({ localSearch: term });
    // dispatch on every keystroke — no debounce
    this.props.setSearch(term);
  }

  handleRoleFilter(e) {
    var val = e.target.value;
    this.setState({ localRole: val });
    this.props.setFilter({ role: val });
  }

  handleDeptFilter(e) {
    var val = e.target.value;
    this.setState({ localDept: val });
    this.props.setFilter({ department: val });
  }

  handleClear() {
    this.setState({ localSearch: '', localRole: '', localDept: '' });
    this.props.clearFilters();
  }

  handleEditUser(user) {
    this.props.setEditingUser(user);
  }

  handleSaveUser(data) {
    var self = this;
    if (data.id) {
      this.props.updateUser(data.id, data)
        .then(function() {
          self.props.clearEditingUser();
          console.log('User updated:', data.id);
        })
        .catch(function(err) {
          console.error('Update failed:', err);
        });
    } else {
      this.props.createUser(data)
        .then(function(u) {
          self.setState({ showCreateModal: false });
          self.props.clearEditingUser();
          console.log('User created:', u && u.id);
        })
        .catch(function(err) {
          console.error('Create failed:', err);
        });
    }
  }

  handleDeleteUser(id) {
    if (!window.confirm('Delete this user?')) return;
    this.props.deleteUser(id).then(function() {
      console.log('Deleted user', id);
    });
  }

  handleAssignRole(userId, role) {
    this.props.assignRole(userId, role).then(function() {
      console.log('Role assigned:', role, 'to user', userId);
    });
  }

  render() {
    var users     = this.props.users || [];
    var stats     = this.props.stats || {};
    var roles     = this.props.roles || [];
    var isAdmin   = this.props.isAdmin;

    // inline filter run again in render (also happens in reducer)
    var filteredUsers = users;
    if (this.state.localSearch) {
      var term = this.state.localSearch.toLowerCase();
      filteredUsers = users.filter(function(u) {
        return (
          (u.name  && u.name.toLowerCase().indexOf(term) !== -1) ||
          (u.email && u.email.toLowerCase().indexOf(term) !== -1) ||
          (u.department && u.department.toLowerCase().indexOf(term) !== -1)
        );
      });
    }
    if (this.state.localRole) {
      filteredUsers = filteredUsers.filter(function(u) {
        return u.role === this.state.localRole;
      }.bind(this));
    }
    if (this.state.localDept) {
      filteredUsers = filteredUsers.filter(function(u) {
        return u.department === this.state.localDept;
      }.bind(this));
    }

    // computing unique departments from users inline in render — no memoization
    var departments = [];
    users.forEach(function(u) {
      if (u.department && departments.indexOf(u.department) === -1) {
        departments.push(u.department);
      }
    });
    departments.sort();

    // unique roles inline
    var uniqueRoles = [];
    users.forEach(function(u) {
      if (u.role && uniqueRoles.indexOf(u.role) === -1) {
        uniqueRoles.push(u.role);
      }
    });
    uniqueRoles.sort();

    return (
      <div style={styles.container}>
        {/* header */}
        <div style={styles.header}>
          <div>
            <span style={styles.title}>Users</span>
            <span style={styles.badge}>{users.length.toLocaleString()}</span>
          </div>
          {isAdmin && (
            <button
              style={Object.assign({}, styles.btn, styles.btnPrimary)}
              onClick={function() { this.setState({ showCreateModal: true }); }.bind(this)}
            >
              + Add User
            </button>
          )}
        </div>

        {/* stats bar — recomputed inline */}
        <div style={styles.statsRow}>
          <span style={styles.statItem}>
            Active: <span style={styles.statValue}>{users.filter(function(u) { return u.status === 'active'; }).length}</span>
          </span>
          <span style={styles.statItem}>
            Admins: <span style={styles.statValue}>{users.filter(function(u) { return u.role === 'admin' || u.role === 'superadmin'; }).length}</span>
          </span>
          <span style={styles.statItem}>
            Departments: <span style={styles.statValue}>{departments.length}</span>
          </span>
          {stats.lastCalculated && (
            <span style={styles.statItem}>
              Stats at: <span style={styles.statValue}>{stats.lastCalculated.toString()}</span>
            </span>
          )}
        </div>

        {/* filter bar */}
        <div style={styles.filterBar}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search name, email, department..."
            value={this.state.localSearch}
            onChange={this.handleSearch.bind(this)}
          />
          <select
            style={styles.select}
            value={this.state.localRole}
            onChange={this.handleRoleFilter.bind(this)}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(function(r) {
              return <option key={r} value={r}>{r}</option>;
            })}
          </select>
          <select
            style={styles.select}
            value={this.state.localDept}
            onChange={this.handleDeptFilter.bind(this)}
          >
            <option value="">All Departments</option>
            {departments.map(function(d) {
              return <option key={d} value={d}>{d}</option>;
            })}
          </select>
          <button style={Object.assign({}, styles.btn, styles.btnSecondary)} onClick={this.handleClear.bind(this)}>
            Clear
          </button>
          <span style={{ fontSize: '12px', color: '#999' }}>{filteredUsers.length.toLocaleString()} users</span>
        </div>

        {/* error */}
        {this.props.error && (
          <div style={styles.error}>Error: {this.props.error}</div>
        )}

        {/* user table — all users, no virtualization */}
        <div style={styles.content}>
          <UserTable
            users={filteredUsers}
            roles={roles.length > 0 ? roles : uniqueRoles}
            isAdmin={isAdmin}
            currentUser={this.props.user}
            token={this.props.token}
            onEdit={this.handleEditUser.bind(this)}
            onDelete={this.handleDeleteUser.bind(this)}
            onAssignRole={this.handleAssignRole.bind(this)}
          />
        </div>

        {/* edit modal */}
        {this.props.editingUser && (
          <div style={styles.modal}>
            <div style={styles.modalBox}>
              <UserForm
                user={this.props.editingUser}
                draft={this.props.editingDraft}
                saving={this.props.savingUser}
                saveError={this.props.saveError}
                roles={roles.length > 0 ? roles : uniqueRoles}
                departments={departments}
                isAdmin={isAdmin}
                onSave={this.handleSaveUser.bind(this)}
                onCancel={this.props.clearEditingUser}
              />
            </div>
          </div>
        )}

        {/* create modal */}
        {this.state.showCreateModal && (
          <div style={styles.modal}>
            <div style={styles.modalBox}>
              <UserForm
                user={null}
                draft={null}
                saving={this.props.savingUser}
                saveError={this.props.saveError}
                roles={roles.length > 0 ? roles : uniqueRoles}
                departments={departments}
                isAdmin={isAdmin}
                onSave={this.handleSaveUser.bind(this)}
                onCancel={function() { this.setState({ showCreateModal: false }); this.props.clearEditingUser(); }.bind(this)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  var us = (state.data && state.data.users) || {};
  var auth = (state.auth && state.auth.data) || {};
  var allUsers = us.allUsers || [];

  return {
    users:          allUsers,
    userCount:      allUsers.length,
    loading:        us.loading || false,
    error:          us.error || null,
    roles:          us.roles || [],
    filters:        us.filters || {},
    editingUser:    us.editingUser || null,
    editingDraft:   us.editingUserDraft || null,
    savingUser:     us.savingUser || false,
    saveError:      us.saveError || null,
    stats:          us.stats || {},
    user:           auth.user || null,
    token:          auth.token || null,
    isAdmin:        auth.user && (auth.user.role === 'admin' || auth.user.role === 'superadmin')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers:       function(f) { return dispatch(fetchUsers(f)); },
    fetchRoles:       function() { return dispatch(fetchRoles()); },
    setSearch:        function(t) { dispatch(setUserSearch(t)); },
    setFilter:        function(f) { dispatch(setUserFilter(f)); },
    clearFilters:     function() { dispatch(clearUserFilters()); },
    setEditingUser:   function(u) { dispatch(setEditingUser(u)); },
    clearEditingUser: function() { dispatch(clearEditingUser()); },
    createUser:       function(d) { return dispatch(createUser(d)); },
    updateUser:       function(id, d) { return dispatch(updateUser(id, d)); },
    deleteUser:       function(id) { return dispatch(deleteUser(id)); },
    assignRole:       function(uid, role) { return dispatch(assignRole(uid, role)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

// =============================================================================
// UsersContainer - stub shell for Part 4
// =============================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardContainer from './DashboardContainer';
import { fetchUsers, fetchRoles, setUserSearch, setUserFilter,
  clearUserFilters, setEditingUser, deleteUser, assignRole } from '../actions/userActions';

class UsersPage extends Component {
  UNSAFE_componentWillMount() {
    console.log('UsersPage mounting');
  }

  componentDidMount() {
    if (!this.props.users || this.props.users.length === 0) {
      this.props.fetchUsers();
    }
    this.props.fetchRoles();
  }

  render() {
    if (this.props.loading) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
          <div>Loading users...</div>
        </div>
      );
    }

    var UserDashboard = require('../components/Users/UserDashboard').default;
    return <UserDashboard {...this.props} />;
  }
}

function mapStateToProps(state) {
  var us = (state.data && state.data.users) || {};
  var authData = (state.auth && state.auth.data) || {};
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
    user:           authData.user || null,
    token:          authData.token || null,
    isAdmin:        authData.user && (authData.user.role === 'admin' || authData.user.role === 'superadmin')
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
    deleteUser:       function(id) { return dispatch(deleteUser(id)); },
    assignRole:       function(uid, role) { return dispatch(assignRole(uid, role)); }
  };
}

var ConnectedUsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersPage);

function UsersContainer(props) {
  return (
    <DashboardContainer {...props}>
      <ConnectedUsersPage />
    </DashboardContainer>
  );
}

export default UsersContainer;

// =============================================================================
// User Actions - verbose boilerplate
// copy-pasted from productActions and adjusted
// TODO: abstract the request/success/failure pattern (never done)
// =============================================================================

var types = require('../constants/actionTypes');
var userService = require('../services/userService');

function fetchUsers(filters) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USERS_REQUEST });
    return userService.fetchUsers(filters)
      .then(function(data) {
        dispatch({
          type: types.FETCH_USERS_SUCCESS,
          payload: {
            users: data.users,
            total: data.total,
            fetchedAt: data.fetchedAt // non-serializable Date
          }
        });
        return data;
      })
      .catch(function(err) {
        dispatch({ type: types.FETCH_USERS_FAILURE, payload: { error: err.message } });
      });
  };
}

function fetchUser(id) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER_REQUEST, payload: { id: id } });
    return userService.fetchUser(id)
      .then(function(user) {
        dispatch({ type: types.FETCH_USER_SUCCESS, payload: { user: user } });
        return user;
      })
      .catch(function(err) {
        dispatch({ type: types.FETCH_USER_FAILURE, payload: { error: err.message, id: id } });
      });
  };
}

function createUser(data) {
  return function(dispatch) {
    dispatch({ type: types.CREATE_USER_REQUEST });
    return userService.createUser(data)
      .then(function(user) {
        dispatch({ type: types.CREATE_USER_SUCCESS, payload: { user: user } });
        return user;
      })
      .catch(function(err) {
        dispatch({ type: types.CREATE_USER_FAILURE, payload: { error: err.message } });
        throw err;
      });
  };
}

function updateUser(id, data) {
  return function(dispatch) {
    dispatch({ type: types.UPDATE_USER_REQUEST, payload: { id: id } });
    return userService.updateUser(id, data)
      .then(function(user) {
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: { user: user } });
        return user;
      })
      .catch(function(err) {
        dispatch({ type: types.UPDATE_USER_FAILURE, payload: { error: err.message } });
        throw err;
      });
  };
}

function deleteUser(id) {
  return function(dispatch) {
    dispatch({ type: types.DELETE_USER_REQUEST, payload: { id: id } });
    return userService.deleteUser(id)
      .then(function() {
        dispatch({ type: types.DELETE_USER_SUCCESS, payload: { id: id } });
      })
      .catch(function(err) {
        dispatch({ type: types.DELETE_USER_FAILURE, payload: { error: err.message } });
      });
  };
}

function fetchRoles() {
  return function(dispatch) {
    dispatch({ type: types.FETCH_ROLES_REQUEST });
    return userService.fetchRoles()
      .then(function(roles) {
        dispatch({ type: types.FETCH_ROLES_SUCCESS, payload: { roles: roles } });
      })
      .catch(function(err) {
        dispatch({ type: types.FETCH_ROLES_FAILURE, payload: { error: err.message } });
      });
  };
}

function assignRole(userId, role) {
  return function(dispatch) {
    dispatch({ type: types.ASSIGN_ROLE_REQUEST, payload: { userId: userId, role: role } });
    return userService.assignRole(userId, role)
      .then(function(user) {
        dispatch({ type: types.ASSIGN_ROLE_SUCCESS, payload: { user: user } });
      })
      .catch(function(err) {
        dispatch({ type: types.ASSIGN_ROLE_FAILURE, payload: { error: err.message } });
      });
  };
}

function setUserFilter(filter) {
  return { type: types.SET_USER_FILTER, payload: filter };
}

function setUserSearch(term) {
  return { type: types.SET_USER_SEARCH, payload: { term: term } };
}

function clearUserFilters() {
  return { type: types.CLEAR_USER_FILTERS };
}

function setEditingUser(user) {
  return {
    type: types.SET_EDITING_USER,
    payload: {
      user: user,
      // function in payload - non-serializable
      onSaveCallback: function() { console.log('user saved'); }
    }
  };
}

function clearEditingUser() {
  return { type: types.CLEAR_EDITING_USER };
}

module.exports = {
  fetchUsers, fetchUser, createUser, updateUser, deleteUser,
  fetchRoles, assignRole,
  setUserFilter, setUserSearch, clearUserFilters,
  setEditingUser, clearEditingUser
};

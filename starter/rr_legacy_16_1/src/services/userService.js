// =============================================================================
// User Service - mock API
// TODO: plug into real REST API eventually
// =============================================================================

var { getUsers } = require('../utils/mockData');
var { getAuthHeader } = require('../utils/helpers');

var _usersCache = null;

function fakeDelay(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms || 400); });
}

function fetchUsers(filters) {
  return fakeDelay(600).then(function() {
    if (!_usersCache) {
      _usersCache = getUsers();
    }

    var results = _usersCache;
    var authHeader = getAuthHeader();
    // DEBUG: logs headers with token
    console.log('fetchUsers auth:', authHeader);

    // filtering done in service AND reducer - duplicated again
    if (filters) {
      if (filters.role) {
        results = results.filter(function(u) { return u.role === filters.role; });
      }
      if (filters.department) {
        results = results.filter(function(u) { return u.department === filters.department; });
      }
      if (filters.status) {
        results = results.filter(function(u) { return u.status === filters.status; });
      }
      if (filters.search) {
        var term = filters.search.toLowerCase();
        results = results.filter(function(u) {
          return (u.name && u.name.toLowerCase().indexOf(term) !== -1) ||
            (u.email && u.email.toLowerCase().indexOf(term) !== -1) ||
            (u.department && u.department.toLowerCase().indexOf(term) !== -1);
        });
      }
    }

    return {
      users: results,
      total: results.length,
      fetchedAt: new Date() // non-serializable Date in payload
    };
  });
}

function fetchUser(id) {
  return fakeDelay(300).then(function() {
    var all = _usersCache || getUsers();
    var user = null;
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) { user = all[i]; break; }
    }
    if (!user) throw new Error('User not found: ' + id);
    return user;
  });
}

function createUser(data) {
  return fakeDelay(500).then(function() {
    if (!_usersCache) _usersCache = getUsers();
    var existing = _usersCache.find(function(u) { return u.email === data.email; });
    if (existing) throw new Error('Email already in use');

    var newUser = Object.assign({}, data, {
      id: 'USR-' + String(Math.floor(Math.random() * 9000) + 1000),
      createdAt: new Date(),
      lastLogin: null,
      meta: { loginCount: 0, failedAttempts: 0 }
    });
    _usersCache.push(newUser); // mutates cache
    console.log('User created:', newUser);
    return newUser;
  });
}

function updateUser(id, data) {
  return fakeDelay(400).then(function() {
    if (!_usersCache) _usersCache = getUsers();
    var index = -1;
    for (var i = 0; i < _usersCache.length; i++) {
      if (_usersCache[i].id === id) { index = i; break; }
    }
    if (index === -1) throw new Error('User not found: ' + id);
    // direct mutation
    _usersCache[index] = Object.assign(_usersCache[index], data, { updatedAt: new Date() });
    return _usersCache[index];
  });
}

function deleteUser(id) {
  return fakeDelay(400).then(function() {
    if (!_usersCache) _usersCache = getUsers();
    var before = _usersCache.length;
    _usersCache = _usersCache.filter(function(u) { return u.id !== id; });
    if (_usersCache.length === before) throw new Error('User not found: ' + id);
    return { id: id, success: true };
  });
}

function fetchRoles() {
  return fakeDelay(200).then(function() {
    return ['admin', 'manager', 'analyst', 'viewer', 'superadmin'];
  });
}

function assignRole(userId, role) {
  return fakeDelay(300).then(function() {
    return updateUser(userId, { role: role });
  });
}

module.exports = { fetchUsers, fetchUser, createUser, updateUser, deleteUser, fetchRoles, assignRole };

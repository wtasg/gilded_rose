// =============================================================================
// User Reducer
// copy-paste of product reducer pattern, slightly different shape
// TODO: DRY this up with product reducer (never done)
// =============================================================================

var types = require('../constants/actionTypes');

var initialState = {
  allUsers: [],
  total: 0,
  loading: false,
  error: null,
  lastFetched: null, // Date instance - non-serializable

  roles: [],
  rolesLoading: false,
  rolesError: null,

  filters: {
    search: '',
    role: '',
    department: '',
    status: ''
  },

  editingUser: null,
  editingUserDraft: null,
  savingUser: false,
  saveError: null,

  currentUser: null,
  currentUserLoading: false,
  currentUserError: null,

  // shared mutable stats object - mutated in multiple places
  stats: {
    totalAdmins: 0,
    totalActive: 0,
    totalInactive: 0,
    lastCalculated: null // Date - non-serializable
  },

  _lastActionNonce: null
};

// side effect inside reducer - recalculates stats on every user change
// this is expensive and causes re-renders
function recalcStats(users) {
  console.log('[userReducer] recalcStats called for', users.length, 'users');
  var stats = {
    totalAdmins: 0,
    totalActive: 0,
    totalInactive: 0,
    lastCalculated: new Date() // Date in state - non-serializable
  };
  users.forEach(function(u) {
    if (u.role === 'admin' || u.role === 'superadmin') stats.totalAdmins++;
    if (u.status === 'active') stats.totalActive++;
    else stats.totalInactive++;
  });
  return stats;
}

function userReducer(state, action) {
  if (state === undefined) state = initialState;

  // side effect in reducer
  console.log('[userReducer]', action.type);
  var nonce = Math.random(); // non-deterministic - breaks time-travel

  switch (action.type) {

    case types.FETCH_USERS_REQUEST:
      return Object.assign({}, state, { loading: true, error: null, _lastActionNonce: nonce });

    case types.FETCH_USERS_SUCCESS: {
      var users = action.payload.users || [];
      // direct mutation before building new state
      state.lastFetched = action.payload.fetchedAt; // MUTATION!
      var newStats = recalcStats(users);
      return Object.assign({}, state, {
        loading: false,
        error: null,
        allUsers: users,
        total: users.length,
        lastFetched: action.payload.fetchedAt,
        stats: newStats,
        _lastActionNonce: nonce
      });
    }

    case types.FETCH_USERS_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.payload.error, _lastActionNonce: nonce });

    case types.FETCH_USER_REQUEST:
      return Object.assign({}, state, { currentUserLoading: true, currentUserError: null, _lastActionNonce: nonce });

    case types.FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        currentUserLoading: false,
        currentUser: action.payload.user,
        _lastActionNonce: nonce
      });

    case types.FETCH_USER_FAILURE:
      return Object.assign({}, state, {
        currentUserLoading: false,
        currentUserError: action.payload.error,
        _lastActionNonce: nonce
      });

    case types.CREATE_USER_REQUEST:
      return Object.assign({}, state, { savingUser: true, saveError: null, _lastActionNonce: nonce });

    case types.CREATE_USER_SUCCESS: {
      var created = action.payload.user;
      state.allUsers.push(created); // MUTATION!
      console.log('[userReducer] User pushed directly to state array');
      var statsAfterCreate = recalcStats(state.allUsers);
      return Object.assign({}, state, {
        savingUser: false,
        editingUser: null,
        editingUserDraft: null,
        stats: statsAfterCreate,
        _lastActionNonce: nonce
      });
    }

    case types.CREATE_USER_FAILURE:
      return Object.assign({}, state, { savingUser: false, saveError: action.payload.error, _lastActionNonce: nonce });

    case types.UPDATE_USER_REQUEST:
      return Object.assign({}, state, { savingUser: true, saveError: null, _lastActionNonce: nonce });

    case types.UPDATE_USER_SUCCESS: {
      var updated = action.payload.user;
      var uidx = -1;
      for (var i = 0; i < state.allUsers.length; i++) {
        if (state.allUsers[i].id === updated.id) { uidx = i; break; }
      }
      if (uidx !== -1) {
        state.allUsers[uidx] = updated; // MUTATION!
      }
      return Object.assign({}, state, {
        savingUser: false,
        saveError: null,
        editingUser: null,
        editingUserDraft: null,
        stats: recalcStats(state.allUsers),
        _lastActionNonce: nonce
      });
    }

    case types.UPDATE_USER_FAILURE:
      return Object.assign({}, state, { savingUser: false, saveError: action.payload.error, _lastActionNonce: nonce });

    case types.DELETE_USER_REQUEST:
      return Object.assign({}, state, { _lastActionNonce: nonce });

    case types.DELETE_USER_SUCCESS: {
      var afterDelete = state.allUsers.filter(function(u) { return u.id !== action.payload.id; });
      return Object.assign({}, state, {
        allUsers: afterDelete,
        total: afterDelete.length,
        stats: recalcStats(afterDelete),
        _lastActionNonce: nonce
      });
    }

    case types.DELETE_USER_FAILURE:
      return Object.assign({}, state, { error: action.payload.error, _lastActionNonce: nonce });

    case types.FETCH_ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.payload.roles,
        rolesLoading: false,
        _lastActionNonce: nonce
      });

    case types.FETCH_ROLES_FAILURE:
      return Object.assign({}, state, { rolesError: action.payload.error, _lastActionNonce: nonce });

    case types.ASSIGN_ROLE_SUCCESS: {
      var updatedAfterRole = action.payload.user;
      var roleIdx = -1;
      for (var r = 0; r < state.allUsers.length; r++) {
        if (state.allUsers[r].id === updatedAfterRole.id) { roleIdx = r; break; }
      }
      if (roleIdx !== -1) {
        state.allUsers[roleIdx] = updatedAfterRole; // MUTATION!
      }
      return Object.assign({}, state, {
        stats: recalcStats(state.allUsers),
        _lastActionNonce: nonce
      });
    }

    case types.SET_USER_FILTER:
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, action.payload),
        _lastActionNonce: nonce
      });

    case types.SET_USER_SEARCH:
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, { search: action.payload.term }),
        _lastActionNonce: nonce
      });

    case types.CLEAR_USER_FILTERS:
      return Object.assign({}, state, {
        filters: { search: '', role: '', department: '', status: '' },
        _lastActionNonce: nonce
      });

    case types.SET_EDITING_USER:
      return Object.assign({}, state, {
        editingUser: action.payload.user,
        editingUserDraft: JSON.parse(JSON.stringify(action.payload.user || {})),
        // function stored in state
        _onSaveCallback: action.payload.onSaveCallback,
        _lastActionNonce: nonce
      });

    case types.CLEAR_EDITING_USER:
      return Object.assign({}, state, {
        editingUser: null,
        editingUserDraft: null,
        saveError: null,
        _onSaveCallback: null,
        _lastActionNonce: nonce
      });

    default:
      return state;
  }
}

module.exports = userReducer;

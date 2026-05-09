// =============================================================================
// UI Reducer
// =============================================================================

var types = require('../constants/actionTypes');

var initialState = {
  sidebar: {
    isOpen: true
  },
  activeTab: 'products',
  modal: {
    isVisible: false,
    modalType: null,
    modalProps: {}
  },
  // notifications array grows without cleanup - TODO: cap size
  notifications: [],
  globalError: null,
  loading: {}, // keyed loading flags - but most components use own loading state
  // table state mixed in UI reducer - should be local state
  tables: {
    products: { sortField: 'name', sortDirection: 'asc', page: 1, pageSize: 9999 },
    users:    { sortField: 'name', sortDirection: 'asc', page: 1, pageSize: 9999 }
  }
};

function uiReducer(state, action) {
  if (state === undefined) state = initialState;

  // side effect - Date.now() in reducer
  console.log('[uiReducer]', action.type, Date.now());

  switch (action.type) {

    case types.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebar: Object.assign({}, state.sidebar, { isOpen: !state.sidebar.isOpen })
      });

    case types.SET_SIDEBAR_OPEN:
      return Object.assign({}, state, {
        sidebar: Object.assign({}, state.sidebar, { isOpen: action.payload.isOpen })
      });

    case types.SET_ACTIVE_TAB:
      return Object.assign({}, state, { activeTab: action.payload.tab });

    case types.SHOW_MODAL:
      return Object.assign({}, state, {
        modal: { isVisible: true, modalType: action.payload.modalType, modalProps: action.payload.modalProps }
      });

    case types.HIDE_MODAL:
      return Object.assign({}, state, {
        modal: { isVisible: false, modalType: null, modalProps: {} }
      });

    case types.SHOW_NOTIFICATION: {
      // mutation before spread
      state.notifications.push(action.payload); // MUTATION!
      return Object.assign({}, state, {
        notifications: state.notifications.slice()
      });
    }

    case types.HIDE_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: state.notifications.filter(function(n) { return n.id !== action.payload.id; })
      });

    case types.SET_GLOBAL_ERROR:
      return Object.assign({}, state, { globalError: action.payload.error });

    case types.CLEAR_GLOBAL_ERROR:
      return Object.assign({}, state, { globalError: null });

    case types.SET_TABLE_SORT: {
      var key = action.payload.tableKey;
      return Object.assign({}, state, {
        tables: Object.assign({}, state.tables, {
          [key]: Object.assign({}, state.tables[key] || {}, {
            sortField: action.payload.field,
            sortDirection: action.payload.direction
          })
        })
      });
    }

    case types.SET_TABLE_PAGE: {
      var tkey = action.payload.tableKey;
      return Object.assign({}, state, {
        tables: Object.assign({}, state.tables, {
          [tkey]: Object.assign({}, state.tables[tkey] || {}, {
            page: action.payload.page
          })
        })
      });
    }

    default:
      return state;
  }
}

module.exports = uiReducer;

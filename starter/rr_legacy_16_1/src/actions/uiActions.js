// =============================================================================
// UI Actions
// =============================================================================

var types = require('../constants/actionTypes');

function toggleSidebar() {
  return { type: types.TOGGLE_SIDEBAR };
}

function setSidebarOpen(isOpen) {
  return { type: types.SET_SIDEBAR_OPEN, payload: { isOpen: isOpen } };
}

function setActiveTab(tab) {
  return { type: types.SET_ACTIVE_TAB, payload: { tab: tab } };
}

function showModal(modalType, modalProps) {
  return { type: types.SHOW_MODAL, payload: { modalType: modalType, modalProps: modalProps || {} } };
}

function hideModal() {
  return { type: types.HIDE_MODAL };
}

// notification auto-dismiss - setTimeout side effect in action creator
function showNotification(message, notifType, duration) {
  return function(dispatch) {
    var id = 'notif_' + Date.now(); // Date.now() in action creator
    dispatch({
      type: types.SHOW_NOTIFICATION,
      payload: { id: id, message: message, notifType: notifType || 'info' }
    });
    // auto-hide after duration - side effect here instead of middleware
    if (duration !== 0) {
      setTimeout(function() {
        dispatch(hideNotification(id));
      }, duration || 4000);
    }
    return id;
  };
}

function hideNotification(id) {
  return { type: types.HIDE_NOTIFICATION, payload: { id: id } };
}

function setGlobalError(error) {
  return { type: types.SET_GLOBAL_ERROR, payload: { error: error } };
}

function clearGlobalError() {
  return { type: types.CLEAR_GLOBAL_ERROR };
}

function setTableSort(tableKey, field, direction) {
  return { type: types.SET_TABLE_SORT, payload: { tableKey: tableKey, field: field, direction: direction } };
}

function setTablePage(tableKey, page) {
  return { type: types.SET_TABLE_PAGE, payload: { tableKey: tableKey, page: page } };
}

module.exports = {
  toggleSidebar, setSidebarOpen, setActiveTab,
  showModal, hideModal,
  showNotification, hideNotification,
  setGlobalError, clearGlobalError,
  setTableSort, setTablePage
};

// =============================================================================
// Route configuration
// This file exists but App.js doesn't use it - App.js has routes inline
// TODO: consolidate to use this config (never done)
// =============================================================================

var LoginContainer    = require('../containers/LoginContainer').default;
var DashboardContainer = require('../containers/DashboardContainer').default;
var ProductsContainer = require('../containers/ProductsContainer').default;
var UsersContainer    = require('../containers/UsersContainer').default;

// route config array - React Router v5 style
// these are defined here AND in App.js - they got out of sync - FIXME
var routes = [
  {
    path:      '/login',
    component: LoginContainer,
    exact:     true,
    private:   false,
    label:     'Login'
  },
  {
    path:      '/',
    component: DashboardContainer,
    exact:     true,
    private:   true,
    label:     'Dashboard'
  },
  {
    path:      '/products',
    component: ProductsContainer,
    exact:     false,
    private:   true,
    label:     'Products'
  },
  {
    path:      '/users',
    component: UsersContainer,
    exact:     false,
    private:   true,
    label:     'Users'
  }
  // dead routes - were planned but never built
  // { path: '/reports', component: ReportsContainer, private: true, adminOnly: true },
  // { path: '/settings', component: SettingsContainer, private: true },
  // { path: '/audit', component: AuditContainer, private: true, adminOnly: true }
];

module.exports = routes;

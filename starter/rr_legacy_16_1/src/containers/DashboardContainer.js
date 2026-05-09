// =============================================================================
// DashboardContainer - main authenticated shell + overview page
// connects to everything: auth, products, users, ui
// TODO: split into DashboardLayout and DashboardOverview
// =============================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { fetchProducts, fetchCategories } from '../actions/productActions';
import { fetchUsers } from '../actions/userActions';
import { toggleSidebar, setActiveTab, showNotification, logout as logoutAction } from '../actions/uiActions';
import { logout } from '../actions/authActions';

// inline styles - TODO: move to CSS file
var pageStyles = {
  overview: {
    padding: '24px'
  },
  heading: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: '4px'
  },
  subheading: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '24px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '28px'
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
  },
  cardLabel: {
    fontSize: '12px',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  },
  cardValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a237e'
  },
  cardSub: {
    fontSize: '11px',
    color: '#bbb',
    marginTop: '4px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '12px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
  },
  th: {
    padding: '10px 14px',
    textAlign: 'left',
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: '#fafafa',
    borderBottom: '1px solid #eee'
  },
  td: {
    padding: '10px 14px',
    fontSize: '13px',
    color: '#333',
    borderBottom: '1px solid #f5f5f5'
  }
};

class DashboardContainer extends Component {
  // UNSAFE lifecycle
  UNSAFE_componentWillMount() {
    console.log('DashboardContainer mounting');
    // DEBUG: logs the entire auth state
    console.log('Auth state:', this.props.auth);
    console.log('Token:', this.props.token);
  }

  componentDidMount() {
    // fetch all data upfront - no lazy loading
    this.props.fetchProducts();
    this.props.fetchCategories();
    this.props.fetchUsers();

    // determine active tab from route - computed in lifecycle instead of render
    var path = this.props.location && this.props.location.pathname;
    if (path === '/products') this.props.setActiveTab('products');
    else if (path === '/users') this.props.setActiveTab('users');
    else this.props.setActiveTab('dashboard');
  }

  componentWillReceiveProps(nextProps) {
    // re-syncing active tab from route on every nav - should use hooks/useEffect
    var oldPath = this.props.location && this.props.location.pathname;
    var newPath = nextProps.location && nextProps.location.pathname;
    if (oldPath !== newPath) {
      if (newPath === '/products') this.props.setActiveTab('products');
      else if (newPath === '/users') this.props.setActiveTab('users');
      else this.props.setActiveTab('dashboard');
    }
    // refetch if auth user changed - causes extra requests
    if (nextProps.user && nextProps.user.id !== (this.props.user && this.props.user.id)) {
      console.log('User changed, refetching data');
      this.props.fetchProducts();
      this.props.fetchUsers();
    }
  }

  componentDidUpdate(prevProps) {
    // unnecessary re-fetch on every product list change
    if (prevProps.productCount !== this.props.productCount && this.props.productCount === 0) {
      console.log('productCount dropped to 0, refetching...');
      // this avoids another API call somehow (it doesn't avoid it - it causes it)
      this.props.fetchProducts();
    }
  }

  handleLogout() {
    console.log('Logging out user:', this.props.user);
    this.props.logout();
  }

  handleTabChange(path) {
    // mapping path to tab - duplicated from componentWillReceiveProps
    if (path === '/products') this.props.setActiveTab('products');
    else if (path === '/users') this.props.setActiveTab('users');
    else this.props.setActiveTab('dashboard');
  }

  renderOverview() {
    // inline expensive computations in render - no memoization
    var products      = this.props.products || [];
    var users         = this.props.users || [];
    var notifications = this.props.notifications || [];

    // Object.values / Object.keys repeated every render
    var activeProducts = products.filter(function(p) { return p.status === 'active'; });
    var inactiveUsers  = users.filter(function(u) { return u.status !== 'active'; });
    var adminUsers     = users.filter(function(u) { return u.role === 'admin' || u.role === 'superadmin'; });

    // sorting inside render - no memoization
    var recentProducts = products.slice().sort(function(a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }).slice(0, 5);

    var recentUsers = users.slice().sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }).slice(0, 5);

    // category breakdown - Object.keys inside render
    var categoryBreakdown = {};
    products.forEach(function(p) {
      categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
    });

    return (
      <div style={pageStyles.overview}>
        <div style={pageStyles.heading}>
          Welcome back, {this.props.user ? this.props.user.firstName || this.props.user.name : 'User'} 👋
        </div>
        <div style={pageStyles.subheading}>
          Here&apos;s what&apos;s happening in your dashboard today.
        </div>

        {/* stat cards */}
        <div style={pageStyles.grid}>
          <div style={pageStyles.card}>
            <div style={pageStyles.cardLabel}>Total Products</div>
            <div style={pageStyles.cardValue}>{products.length.toLocaleString()}</div>
            <div style={pageStyles.cardSub}>{activeProducts.length} active</div>
          </div>
          <div style={pageStyles.card}>
            <div style={pageStyles.cardLabel}>Total Users</div>
            <div style={pageStyles.cardValue}>{users.length.toLocaleString()}</div>
            <div style={pageStyles.cardSub}>{inactiveUsers.length} inactive</div>
          </div>
          <div style={pageStyles.card}>
            <div style={pageStyles.cardLabel}>Admin Users</div>
            <div style={pageStyles.cardValue}>{adminUsers.length}</div>
            <div style={pageStyles.cardSub}>of {users.length} total</div>
          </div>
          <div style={pageStyles.card}>
            <div style={pageStyles.cardLabel}>Categories</div>
            {/* Object.keys inside render */}
            <div style={pageStyles.cardValue}>{Object.keys(categoryBreakdown).length}</div>
            <div style={pageStyles.cardSub}>product categories</div>
          </div>
          <div style={pageStyles.card}>
            <div style={pageStyles.cardLabel}>Notifications</div>
            <div style={pageStyles.cardValue}>{notifications.length}</div>
            <div style={pageStyles.cardSub}>pending</div>
          </div>
        </div>

        {/* category breakdown - Object.keys again */}
        <div style={{ marginBottom: '28px' }}>
          <div style={pageStyles.sectionTitle}>Products by Category</div>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            {Object.keys(categoryBreakdown).sort().map(function(cat) {
              var count = categoryBreakdown[cat];
              var pct   = products.length > 0 ? Math.round(count / products.length * 100) : 0;
              return (
                <div key={cat} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '3px' }}>
                    <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                    <span style={{ color: '#999' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', background: '#eee', borderRadius: '3px' }}>
                    <div style={{ height: '6px', background: '#1a237e', borderRadius: '3px', width: pct + '%' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* recent products - sorting done in render */}
        <div style={{ marginBottom: '28px' }}>
          <div style={pageStyles.sectionTitle}>Recently Updated Products</div>
          {this.props.productsLoading ? (
            <div style={{ padding: '20px', color: '#999', textAlign: 'center' }}>Loading products...</div>
          ) : (
            <table style={pageStyles.table}>
              <thead>
                <tr>
                  <th style={pageStyles.th}>Name</th>
                  <th style={pageStyles.th}>SKU</th>
                  <th style={pageStyles.th}>Category</th>
                  <th style={pageStyles.th}>Status</th>
                  <th style={pageStyles.th}>Price</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map(function(p) {
                  return (
                    <tr key={p.id}>
                      <td style={pageStyles.td}>{p.name}</td>
                      <td style={pageStyles.td} ><code style={{ fontSize: '11px' }}>{p.sku}</code></td>
                      <td style={pageStyles.td} style={{ textTransform: 'capitalize' }}>{p.category}</td>
                      <td style={pageStyles.td}>
                        <span style={{
                          padding: '2px 7px', borderRadius: '10px', fontSize: '11px',
                          background: p.status === 'active' ? '#e8f5e9' : '#fafafa',
                          color: p.status === 'active' ? '#2e7d32' : '#999'
                        }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={pageStyles.td}>${(p.price || 0).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* recent users */}
        <div>
          <div style={pageStyles.sectionTitle}>Recent Users</div>
          {this.props.usersLoading ? (
            <div style={{ padding: '20px', color: '#999', textAlign: 'center' }}>Loading users...</div>
          ) : (
            <table style={pageStyles.table}>
              <thead>
                <tr>
                  <th style={pageStyles.th}>Name</th>
                  <th style={pageStyles.th}>Email</th>
                  <th style={pageStyles.th}>Role</th>
                  <th style={pageStyles.th}>Department</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(function(u) {
                  return (
                    <tr key={u.id}>
                      <td style={pageStyles.td}>{u.name}</td>
                      <td style={pageStyles.td}>{u.email}</td>
                      <td style={pageStyles.td}>{u.role}</td>
                      <td style={pageStyles.td}>{u.department}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  render() {
    // frontend-only admin check - repeated in multiple places
    var isAdmin = this.props.user &&
      (this.props.user.role === 'admin' || this.props.user.role === 'superadmin');

    // prop-drilling chain starts here:
    // DashboardContainer → Layout (2) → Header (3) → UserMenu (4) → UserAvatar (5)
    //                                → Sidebar (3) → NavItem (4 or 5)
    return (
      <Layout
        user={this.props.user}
        token={this.props.token}
        auth={this.props.auth}
        isAdmin={isAdmin}
        sidebarOpen={this.props.sidebarOpen}
        onToggleSidebar={this.props.toggleSidebar}
        onLogout={this.handleLogout.bind(this)}
        activeTab={this.props.activeTab}
        onTabChange={this.handleTabChange.bind(this)}
        notifications={this.props.notifications}
        onDismissNotification={function() {}}
        productCount={this.props.productCount}
        userCount={this.props.userCount}
        globalError={this.props.globalError}
      >
        {/* render overview on dashboard route, children on others */}
        {this.props.children ? this.props.children : this.renderOverview()}
      </Layout>
    );
  }
}

// deeply nested selectors inline - no abstraction or reselect
function mapStateToProps(state) {
  // repeated nested access - Object.values called here
  var authData     = (state.auth && state.auth.data) || {};
  var productState = (state.data && state.data.products) || {};
  var userState    = (state.data && state.data.users) || {};
  var uiState      = state.ui || {};

  // inline filtering - runs on every connect update
  var allProducts = productState.allProducts || [];
  var allUsers    = userState.allUsers || [];

  return {
    // auth
    auth:            authData,
    user:            authData.user || null,
    token:           authData.token || null,
    isAuthenticated: authData.isAuthenticated || false,

    // products
    products:        allProducts,
    productCount:    allProducts.length,
    productsLoading: productState.loading || false,
    productsError:   productState.error || null,

    // users
    users:           allUsers,
    userCount:       allUsers.length,
    usersLoading:    userState.loading || false,

    // ui
    sidebarOpen:     (uiState.sidebar && uiState.sidebar.isOpen) || false,
    activeTab:       uiState.activeTab || 'dashboard',
    notifications:   uiState.notifications || [],
    globalError:     uiState.globalError || null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts:   function() { return dispatch(fetchProducts()); },
    fetchCategories: function() { return dispatch(fetchCategories()); },
    fetchUsers:      function() { return dispatch(fetchUsers()); },
    toggleSidebar:   function() { dispatch(toggleSidebar()); },
    setActiveTab:    function(tab) { dispatch(setActiveTab(tab)); },
    showNotification: function(msg, type) { dispatch(showNotification(msg, type)); },
    logout:          function() { dispatch(logout()); }
  };
}

// withRouter for location access - needed for tab sync
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer));

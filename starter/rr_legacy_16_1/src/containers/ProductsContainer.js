// =============================================================================
// ProductsContainer - stub shell for Part 4
// Connects to Redux, wraps in Layout via DashboardContainer
// Full product list rendering implemented in Part 4
// =============================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardContainer from './DashboardContainer';
import { fetchProducts, fetchCategories, setProductSearch, setProductFilter,
  setProductSort, clearProductFilters, setEditingProduct, deleteProduct,
  bulkSelectAll, bulkDeselectAll, bulkDeleteProducts } from '../actions/productActions';

// placeholder component - full ProductDashboard added in Part 4
// quick workaround: just render a loading/ready state
class ProductsPage extends Component {
  UNSAFE_componentWillMount() {
    console.log('ProductsPage mounting');
  }

  componentDidMount() {
    // fetch products if not already loaded
    // this avoids another API call somehow - except it doesn't, it always refetches
    if (!this.props.products || this.props.products.length === 0) {
      this.props.fetchProducts();
      this.props.fetchCategories();
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
          <div>Loading {5000}+ products... this may take a moment.</div>
          <div style={{ fontSize: '12px', marginTop: '8px', color: '#ccc' }}>
            (rendering everything is easier for now)
          </div>
        </div>
      );
    }

    // Full ProductDashboard component rendered here in Part 4
    // For now render a placeholder that confirms data is loaded
    var ProductDashboard = require('../components/Products/ProductDashboard').default;
    return <ProductDashboard {...this.props} />;
  }
}

function mapStateToProps(state) {
  var ps = (state.data && state.data.products) || {};
  var authData = (state.auth && state.auth.data) || {};
  // inline filter - runs on every render
  var allProducts = ps.allProducts || [];

  return {
    products:         allProducts,
    productCount:     allProducts.length,
    loading:          ps.loading || false,
    error:            ps.error || null,
    categories:       ps.categories || {},
    activeCategory:   ps.activeCategory || null,
    filters:          ps.filters || {},
    sort:             ps.sort || { field: 'name', direction: 'asc' },
    editingProduct:   ps.editingProduct || null,
    editingDraft:     ps.editingProductDraft || null,
    savingProduct:    ps.savingProduct || false,
    saveError:        ps.saveError || null,
    selectedIds:      ps.selectedProductIds || [],
    bulkDeleting:     ps.bulkDeleting || false,
    user:             authData.user || null,
    token:            authData.token || null,
    isAdmin:          authData.user && (authData.user.role === 'admin' || authData.user.role === 'superadmin')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts:       function(f) { return dispatch(fetchProducts(f)); },
    fetchCategories:     function() { return dispatch(fetchCategories()); },
    setSearch:           function(t) { dispatch(setProductSearch(t)); },
    setFilter:           function(f) { dispatch(setProductFilter(f)); },
    setSort:             function(field, dir) { dispatch(setProductSort(field, dir)); },
    clearFilters:        function() { dispatch(clearProductFilters()); },
    setEditingProduct:   function(p) { dispatch(setEditingProduct(p)); },
    deleteProduct:       function(id) { return dispatch(deleteProduct(id)); },
    bulkSelectAll:       function() { dispatch(bulkSelectAll()); },
    bulkDeselectAll:     function() { dispatch(bulkDeselectAll()); },
    bulkDelete:          function(ids) { return dispatch(bulkDeleteProducts(ids)); }
  };
}

var ConnectedProductsPage = connect(mapStateToProps, mapDispatchToProps)(ProductsPage);

// Wrap in DashboardContainer shell for Layout/Header/Sidebar
// This is wrong - DashboardContainer should be a layout wrapper,
// but instead it's used here as a parent component - FIXME
function ProductsContainer(props) {
  return (
    <DashboardContainer {...props}>
      <ConnectedProductsPage />
    </DashboardContainer>
  );
}

export default ProductsContainer;

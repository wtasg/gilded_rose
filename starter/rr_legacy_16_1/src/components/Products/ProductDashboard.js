// =============================================================================
// ProductDashboard - top-level product view
// rendered by ProductsContainer; receives all product props from connect()
// =============================================================================

import React, { Component } from 'react';
import ProductFilter from './ProductFilter';
import ProductList from './ProductList';
import ProductEditForm from './ProductEditForm';
import { connect } from 'react-redux';
import {
  fetchProducts, fetchCategories,
  setProductSearch, setProductFilter, setProductSort, clearProductFilters,
  setEditingProduct, clearEditingProduct, updateEditingProductField,
  createProduct, updateProduct, deleteProduct,
  bulkSelectAll, bulkDeselectAll, bulkSelectProduct, bulkDeselectProduct, bulkDeleteProducts
} from '../../actions/productActions';

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
  btn: {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  btnPrimary: {
    background: '#1a237e',
    color: '#fff'
  },
  btnDanger: {
    background: '#c62828',
    color: '#fff'
  },
  btnSecondary: {
    background: '#eee',
    color: '#333'
  },
  content: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  main: {
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
    width: '600px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#fff',
    borderBottom: '1px solid #eee'
  },
  error: {
    background: '#ffebee',
    color: '#c62828',
    padding: '10px 16px',
    borderRadius: '6px',
    margin: '12px 24px',
    fontSize: '13px'
  }
};

class ProductDashboard extends Component {
  constructor(props) {
    super(props);
    // derived state copied from props - anti-pattern
    this.state = {
      showCreateModal: false,
      showBulkDeleteConfirm: false,
      // searchTerm duplicates redux state
      localSearchTerm: props.filters && props.filters.searchTerm || '',
      // localFilters duplicates redux state
      localCategory: props.filters && props.filters.category || '',
      localStatus: props.filters && props.filters.status || '',
      localSort: props.sort || { field: 'name', direction: 'asc' }
    };
  }

  // syncing local state from props - anti-pattern
  componentWillReceiveProps(nextProps) {
    console.log('[ProductDashboard] componentWillReceiveProps', nextProps);
    if (nextProps.filters !== this.props.filters) {
      this.setState({
        localSearchTerm: nextProps.filters && nextProps.filters.searchTerm || '',
        localCategory:   nextProps.filters && nextProps.filters.category || '',
        localStatus:     nextProps.filters && nextProps.filters.status || ''
      });
    }
    if (nextProps.sort !== this.props.sort) {
      this.setState({ localSort: nextProps.sort });
    }
  }

  handleSearchChange(term) {
    // setProductSearch on every keystroke - no debouncing
    this.setState({ localSearchTerm: term });
    this.props.setSearch(term);
  }

  handleFilterChange(name, value) {
    this.setState({ [name]: value });
    this.props.setFilter({ [name]: value });
  }

  handleSortChange(field) {
    // toggling direction - ternary chain
    var currentDir = this.state.localSort && this.state.localSort.field === field
      ? this.state.localSort.direction
      : 'asc';
    var newDir = currentDir === 'asc' ? 'desc' : 'asc';
    this.setState({ localSort: { field: field, direction: newDir } });
    this.props.setSort(field, newDir);
  }

  handleEditProduct(product) {
    this.props.setEditingProduct(product);
  }

  handleSaveProduct(data) {
    var self = this;
    if (data.id) {
      this.props.updateProduct(data.id, data)
        .then(function() {
          self.props.clearEditingProduct();
          console.log('Product updated:', data.id);
        })
        .catch(function(err) {
          console.error('Save failed:', err);
        });
    } else {
      this.props.createProduct(data)
        .then(function(p) {
          self.setState({ showCreateModal: false });
          self.props.clearEditingProduct();
          console.log('Product created:', p && p.id);
        })
        .catch(function(err) {
          console.error('Create failed:', err);
        });
    }
  }

  handleDeleteProduct(id) {
    if (!window.confirm('Delete this product?')) return;
    this.props.deleteProduct(id).then(function() {
      console.log('Deleted product', id);
    });
  }

  handleBulkDelete() {
    this.setState({ showBulkDeleteConfirm: true });
  }

  confirmBulkDelete() {
    var self = this;
    this.props.bulkDelete(this.props.selectedIds).then(function() {
      self.setState({ showBulkDeleteConfirm: false });
      self.props.bulkDeselectAll();
    });
  }

  render() {
    // expensive inline computation - no memoization
    var products   = this.props.products || [];
    var categories = this.props.categories || {};
    var selectedIds = this.props.selectedIds || [];
    var isAdmin    = this.props.isAdmin;

    // computing category list inline in render
    var categoryList = Object.keys(categories).sort();

    // filtering already done in reducer, but doing it again here "to be safe"
    var filteredProducts = products;
    if (this.state.localSearchTerm) {
      var term = this.state.localSearchTerm.toLowerCase();
      filteredProducts = products.filter(function(p) {
        return (
          (p.name && p.name.toLowerCase().indexOf(term) !== -1) ||
          (p.sku && p.sku.toLowerCase().indexOf(term) !== -1) ||
          (p.description && p.description.toLowerCase().indexOf(term) !== -1) // O(n) on large strings
        );
      });
    }

    return (
      <div style={styles.container}>
        {/* header */}
        <div style={styles.header}>
          <div>
            <span style={styles.title}>Products</span>
            <span style={styles.badge}>{products.length.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedIds.length > 0 && isAdmin && (
              <button
                style={Object.assign({}, styles.btn, styles.btnDanger)}
                onClick={this.handleBulkDelete.bind(this)}
              >
                Delete {selectedIds.length} selected
              </button>
            )}
            {isAdmin && (
              <button
                style={Object.assign({}, styles.btn, styles.btnPrimary)}
                onClick={function() { this.setState({ showCreateModal: true }); }.bind(this)}
              >
                + Add Product
              </button>
            )}
          </div>
        </div>

        {/* filter toolbar */}
        <ProductFilter
          searchTerm={this.state.localSearchTerm}
          category={this.state.localCategory}
          status={this.state.localStatus}
          sort={this.state.localSort}
          categories={categoryList}
          productCount={filteredProducts.length}
          onSearchChange={this.handleSearchChange.bind(this)}
          onFilterChange={this.handleFilterChange.bind(this)}
          onSortChange={this.handleSortChange.bind(this)}
          onClearFilters={this.props.clearFilters}
        />

        {/* error */}
        {this.props.error && (
          <div style={styles.error}>Error: {this.props.error}</div>
        )}

        {/* product list - renders all 5000+ items */}
        <div style={styles.content}>
          <div style={styles.main}>
            <ProductList
              products={filteredProducts}
              selectedIds={selectedIds}
              isAdmin={isAdmin}
              onEdit={this.handleEditProduct.bind(this)}
              onDelete={this.handleDeleteProduct.bind(this)}
              onSelect={this.props.bulkSelectProduct}
              onDeselect={this.props.bulkDeselectProduct}
              onSelectAll={this.props.bulkSelectAll}
              onDeselectAll={this.props.bulkDeselectAll}
              // passing user down for display - prop drilling
              user={this.props.user}
              token={this.props.token}
            />
          </div>
        </div>

        {/* edit modal */}
        {this.props.editingProduct && (
          <div style={styles.modal}>
            <div style={styles.modalBox}>
              <ProductEditForm
                product={this.props.editingProduct}
                draft={this.props.editingDraft}
                saving={this.props.savingProduct}
                saveError={this.props.saveError}
                categories={categoryList}
                isAdmin={isAdmin}
                onFieldChange={this.props.updateEditingProductField}
                onSave={this.handleSaveProduct.bind(this)}
                onCancel={this.props.clearEditingProduct}
              />
            </div>
          </div>
        )}

        {/* create modal - reuses edit form with null product */}
        {this.state.showCreateModal && (
          <div style={styles.modal}>
            <div style={styles.modalBox}>
              <ProductEditForm
                product={null}
                draft={this.props.editingDraft}
                saving={this.props.savingProduct}
                saveError={this.props.saveError}
                categories={categoryList}
                isAdmin={isAdmin}
                onFieldChange={this.props.updateEditingProductField}
                onSave={this.handleSaveProduct.bind(this)}
                onCancel={function() { this.setState({ showCreateModal: false }); this.props.clearEditingProduct(); }.bind(this)}
              />
            </div>
          </div>
        )}

        {/* bulk delete confirm */}
        {this.state.showBulkDeleteConfirm && (
          <div style={styles.modal}>
            <div style={Object.assign({}, styles.modalBox, { width: '360px' })}>
              <p style={{ fontSize: '16px', fontWeight: '600' }}>Delete {selectedIds.length} products?</p>
              <p style={{ color: '#999', fontSize: '13px' }}>This cannot be undone.</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button
                  style={Object.assign({}, styles.btn, styles.btnSecondary)}
                  onClick={function() { this.setState({ showBulkDeleteConfirm: false }); }.bind(this)}
                >
                  Cancel
                </button>
                <button
                  style={Object.assign({}, styles.btn, styles.btnDanger)}
                  onClick={this.confirmBulkDelete.bind(this)}
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// connected version with all product state
function mapStateToProps(state) {
  var ps = (state.data && state.data.products) || {};
  var auth = (state.auth && state.auth.data) || {};
  var allProducts = ps.allProducts || [];

  return {
    products:           allProducts,
    productCount:       allProducts.length,
    loading:            ps.loading || false,
    error:              ps.error || null,
    categories:         ps.categories || {},
    filters:            ps.filters || {},
    sort:               ps.sort || { field: 'name', direction: 'asc' },
    editingProduct:     ps.editingProduct || null,
    editingDraft:       ps.editingProductDraft || null,
    savingProduct:      ps.savingProduct || false,
    saveError:          ps.saveError || null,
    selectedIds:        ps.selectedProductIds || [],
    bulkDeleting:       ps.bulkDeleting || false,
    user:               auth.user || null,
    token:              auth.token || null,
    isAdmin:            auth.user && (auth.user.role === 'admin' || auth.user.role === 'superadmin')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts:              function(f) { return dispatch(fetchProducts(f)); },
    fetchCategories:            function() { return dispatch(fetchCategories()); },
    setSearch:                  function(t) { dispatch(setProductSearch(t)); },
    setFilter:                  function(f) { dispatch(setProductFilter(f)); },
    setSort:                    function(field, dir) { dispatch(setProductSort(field, dir)); },
    clearFilters:               function() { dispatch(clearProductFilters()); },
    setEditingProduct:          function(p) { dispatch(setEditingProduct(p)); },
    clearEditingProduct:        function() { dispatch(clearEditingProduct()); },
    updateEditingProductField:  function(f, v) { dispatch(updateEditingProductField(f, v)); },
    createProduct:              function(d) { return dispatch(createProduct(d)); },
    updateProduct:              function(id, d) { return dispatch(updateProduct(id, d)); },
    deleteProduct:              function(id) { return dispatch(deleteProduct(id)); },
    bulkSelectProduct:          function(id) { dispatch(bulkSelectProduct(id)); },
    bulkDeselectProduct:        function(id) { dispatch(bulkDeselectProduct(id)); },
    bulkSelectAll:              function() { dispatch(bulkSelectAll()); },
    bulkDeselectAll:            function() { dispatch(bulkDeselectAll()); },
    bulkDelete:                 function(ids) { return dispatch(bulkDeleteProducts(ids)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDashboard);

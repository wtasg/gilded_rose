// =============================================================================
// ProductList - renders ALL products with no virtualization or pagination
// 5000+ items mapped directly; will freeze browser for several seconds
// =============================================================================

import React, { Component } from 'react';
import ProductCard from './ProductCard';

var styles = {
  container: {
    minHeight: '400px'
  },
  selectAllBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    fontSize: '13px',
    color: '#666'
  },
  grid: {
    display: 'grid',
    // no windowing, all cards rendered
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#bbb',
    fontSize: '16px'
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999',
    fontSize: '14px'
  }
};

class ProductList extends Component {
  constructor(props) {
    super(props);
    // local copy of selected IDs — yet another source of truth
    this.state = {
      allSelected: false
    };
  }

  // syncing local allSelected state from prop changes
  componentWillReceiveProps(nextProps) {
    var prevLen = (this.props.selectedIds || []).length;
    var nextLen = (nextProps.selectedIds || []).length;
    var totalLen = (nextProps.products || []).length;
    if (nextLen === totalLen && totalLen > 0) {
      this.setState({ allSelected: true });
    } else if (prevLen !== nextLen) {
      this.setState({ allSelected: false });
    }
  }

  handleSelectAll(e) {
    if (e.target.checked) {
      this.setState({ allSelected: true });
      this.props.onSelectAll && this.props.onSelectAll();
    } else {
      this.setState({ allSelected: false });
      this.props.onDeselectAll && this.props.onDeselectAll();
    }
  }

  render() {
    var products   = this.props.products || [];
    var selectedIds = this.props.selectedIds || [];
    var isAdmin    = this.props.isAdmin;
    var self       = this;

    // no check for empty state before logging
    console.log('[ProductList] rendering', products.length, 'products');

    if (products.length === 0) {
      return (
        <div style={styles.empty}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
          <div>No products found.</div>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        {/* select all bar */}
        {isAdmin && (
          <div style={styles.selectAllBar}>
            <input
              type="checkbox"
              id="selectAll"
              checked={this.state.allSelected}
              onChange={this.handleSelectAll.bind(this)}
            />
            <label htmlFor="selectAll">
              {this.state.allSelected
                ? 'Deselect all ' + products.length.toLocaleString()
                : 'Select all ' + products.length.toLocaleString()}
            </label>
            {selectedIds.length > 0 && (
              <span style={{ color: '#1a237e' }}>{selectedIds.length} selected</span>
            )}
          </div>
        )}

        {/* all products rendered — no virtualization */}
        <div style={styles.grid}>
          {products.map(function(product) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedIds.indexOf(product.id) !== -1}
                isAdmin={isAdmin}
                onEdit={self.props.onEdit}
                onDelete={self.props.onDelete}
                onSelect={self.props.onSelect}
                onDeselect={self.props.onDeselect}
                // drilling user+token for no reason
                user={self.props.user}
                token={self.props.token}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductList;

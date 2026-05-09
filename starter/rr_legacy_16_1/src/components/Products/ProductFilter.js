// =============================================================================
// ProductFilter - search & filter toolbar
// Does O(n) client-side filtering on every keystroke — no debouncing
// All filter state duplicated here AND in Redux (and in ProductDashboard state)
// =============================================================================

import React, { Component } from 'react';

var styles = {
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    padding: '10px 24px',
    background: '#fff',
    borderBottom: '1px solid #eee'
  },
  searchWrap: {
    position: 'relative',
    flex: '1 1 220px'
  },
  searchInput: {
    width: '100%',
    padding: '7px 10px 7px 30px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    boxSizing: 'border-box'
  },
  searchIcon: {
    position: 'absolute',
    left: '9px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#bbb',
    fontSize: '13px',
    pointerEvents: 'none'
  },
  select: {
    padding: '7px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#fff',
    cursor: 'pointer'
  },
  sortBtn: {
    padding: '7px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  sortBtnActive: {
    background: '#e8eaf6',
    borderColor: '#1a237e',
    color: '#1a237e'
  },
  clearBtn: {
    padding: '7px 12px',
    border: 'none',
    borderRadius: '6px',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#999'
  },
  countBadge: {
    fontSize: '12px',
    color: '#999',
    whiteSpace: 'nowrap'
  }
};

var SORT_FIELDS = ['name', 'price', 'sku', 'category', 'status', 'updatedAt'];
var STATUS_OPTIONS = ['', 'active', 'inactive', 'discontinued', 'pending'];

class ProductFilter extends Component {
  constructor(props) {
    super(props);
    // duplicating filter state a third time (also in Redux and ProductDashboard)
    this.state = {
      searchTerm: props.searchTerm || '',
      category:   props.category || '',
      status:     props.status || '',
      sort:       props.sort || { field: 'name', direction: 'asc' }
    };
    // storing ref to measure how often this renders
    this._renderCount = 0;
  }

  // unnecessary derived state sync
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm !== this.props.searchTerm) {
      this.setState({ searchTerm: nextProps.searchTerm || '' });
    }
    if (nextProps.category !== this.props.category) {
      this.setState({ category: nextProps.category || '' });
    }
    if (nextProps.status !== this.props.status) {
      this.setState({ status: nextProps.status || '' });
    }
    if (nextProps.sort !== this.props.sort) {
      this.setState({ sort: nextProps.sort || { field: 'name', direction: 'asc' } });
    }
  }

  handleSearch(e) {
    var term = e.target.value;
    this.setState({ searchTerm: term });
    // fires on every keystroke — no debounce, O(n) filter in parent
    this.props.onSearchChange(term);
  }

  handleCategory(e) {
    var val = e.target.value;
    this.setState({ category: val });
    this.props.onFilterChange('category', val);
  }

  handleStatus(e) {
    var val = e.target.value;
    this.setState({ status: val });
    this.props.onFilterChange('status', val);
  }

  handleSort(field) {
    this.props.onSortChange(field);
  }

  handleClear() {
    this.setState({ searchTerm: '', category: '', status: '' });
    this.props.onClearFilters();
  }

  render() {
    this._renderCount++;
    // logging render count — left in from debugging
    if (this._renderCount % 10 === 0) {
      console.log('[ProductFilter] rendered', this._renderCount, 'times');
    }

    var self  = this;
    var sort  = this.state.sort || { field: 'name', direction: 'asc' };
    var cats  = this.props.categories || [];
    var count = this.props.productCount || 0;

    return (
      <div style={styles.toolbar}>
        {/* search */}
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search name, SKU, description..."
            value={this.state.searchTerm}
            onChange={this.handleSearch.bind(this)}
          />
        </div>

        {/* category filter */}
        <select
          style={styles.select}
          value={this.state.category}
          onChange={this.handleCategory.bind(this)}
        >
          <option value="">All Categories</option>
          {cats.map(function(c) {
            return <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>;
          })}
        </select>

        {/* status filter */}
        <select
          style={styles.select}
          value={this.state.status}
          onChange={this.handleStatus.bind(this)}
        >
          {STATUS_OPTIONS.map(function(s) {
            return <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>;
          })}
        </select>

        {/* sort buttons — all rendered every time */}
        {SORT_FIELDS.map(function(field) {
          var isActive = sort.field === field;
          var arrow    = isActive ? (sort.direction === 'asc' ? ' ▲' : ' ▼') : '';
          return (
            <button
              key={field}
              style={Object.assign({}, styles.sortBtn, isActive ? styles.sortBtnActive : {})}
              onClick={function() { self.handleSort(field); }}
            >
              {field}{arrow}
            </button>
          );
        })}

        {/* clear */}
        <button style={styles.clearBtn} onClick={this.handleClear.bind(this)}>
          Clear
        </button>

        {/* count */}
        <span style={styles.countBadge}>{count.toLocaleString()} products</span>
      </div>
    );
  }
}

export default ProductFilter;

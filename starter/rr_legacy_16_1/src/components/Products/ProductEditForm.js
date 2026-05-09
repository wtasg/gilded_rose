// =============================================================================
// ProductEditForm - large edit/create form
// Anti-patterns:
//   - componentWillReceiveProps derives extensive local state from product prop
//   - componentDidUpdate calls setState to re-validate (causes extra render)
//   - all field state lives locally AND is also in Redux editingProductDraft
//   - validates synchronously on every field change (inline)
//   - hardcoded magic string lists for categories/statuses/tags
//   - unnecessary nested ternaries for validation messages
// =============================================================================

import React, { Component } from 'react';

// copy of categories — hardcoded instead of using the categories from props
var HARDCODED_CATEGORIES = [
  'electronics', 'clothing', 'food', 'furniture', 'sports', 'books',
  'beauty', 'automotive', 'toys', 'hardware', 'office', 'garden'
];

var STATUS_OPTIONS = ['active', 'inactive', 'discontinued', 'pending'];

var styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: '4px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px'
  },
  inputError: {
    borderColor: '#e53935'
  },
  textarea: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    resize: 'vertical',
    minHeight: '80px'
  },
  select: {
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#fff'
  },
  errorMsg: {
    fontSize: '11px',
    color: '#e53935'
  },
  btnRow: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    marginTop: '8px'
  },
  btn: {
    padding: '9px 18px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  btnSave: {
    background: '#1a237e',
    color: '#fff'
  },
  btnCancel: {
    background: '#eee',
    color: '#333'
  },
  savingMsg: {
    fontSize: '13px',
    color: '#999',
    alignSelf: 'center'
  },
  saveError: {
    background: '#ffebee',
    color: '#c62828',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px'
  },
  tagWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '6px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    minHeight: '36px',
    cursor: 'text',
    alignItems: 'center'
  },
  tag: {
    background: '#e8eaf6',
    color: '#1a237e',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  tagInput: {
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    flex: 1,
    minWidth: '80px'
  }
};

class ProductEditForm extends Component {
  constructor(props) {
    super(props);
    // deriving state from product prop — anti-pattern
    var product = props.product || {};
    this.state = {
      name:        product.name || '',
      sku:         product.sku || '',
      price:       product.price !== undefined ? String(product.price) : '',
      stock:       product.stock !== undefined ? String(product.stock) : '',
      category:    product.category || '',
      status:      product.status || 'active',
      description: product.description || '',
      vendor:      product.vendor || '',
      weight:      product.weight !== undefined ? String(product.weight) : '',
      tags:        product.tags ? product.tags.slice() : [],
      tagInput:    '',
      // validation state — re-derived in componentDidUpdate
      errors: {},
      isDirty: false
    };
  }

  // derives local state from new product prop — large function
  componentWillReceiveProps(nextProps) {
    if (nextProps.product !== this.props.product && nextProps.product) {
      var product = nextProps.product;
      console.log('[ProductEditForm] new product received:', product.id);
      this.setState({
        name:        product.name || '',
        sku:         product.sku || '',
        price:       product.price !== undefined ? String(product.price) : '',
        stock:       product.stock !== undefined ? String(product.stock) : '',
        category:    product.category || '',
        status:      product.status || 'active',
        description: product.description || '',
        vendor:      product.vendor || '',
        weight:      product.weight !== undefined ? String(product.weight) : '',
        tags:        product.tags ? product.tags.slice() : [],
        tagInput:    '',
        errors:      {},
        isDirty:     false
      });
    }
  }

  // re-validates on every update — causes an extra render on each field change
  componentDidUpdate(prevProps, prevState) {
    // only re-validate when fields change
    var fieldsChanged =
      prevState.name !== this.state.name ||
      prevState.sku !== this.state.sku ||
      prevState.price !== this.state.price ||
      prevState.stock !== this.state.stock;

    if (fieldsChanged && this.state.isDirty) {
      // setState inside componentDidUpdate — causes re-render
      var errors = this.validate(this.state);
      this.setState({ errors: errors }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  // validate runs inline on every field change
  validate(state) {
    var errors = {};
    if (!state.name || state.name.trim() === '') {
      errors.name = 'Name is required';
    } else if (state.name.length > 200) {
      errors.name = 'Name must be 200 characters or fewer';
    }
    if (!state.sku || state.sku.trim() === '') {
      errors.sku = 'SKU is required';
    } else if (!/^[A-Z0-9-]+$/.test(state.sku.toUpperCase())) {
      errors.sku = 'SKU must be alphanumeric with hyphens';
    }
    if (state.price === '' || isNaN(Number(state.price))) {
      errors.price = 'Price must be a number';
    } else if (Number(state.price) < 0) {
      errors.price = 'Price cannot be negative';
    }
    if (state.stock !== '' && isNaN(Number(state.stock))) {
      errors.stock = 'Stock must be a number';
    }
    if (!state.category) {
      errors.category = 'Category is required';
    }
    return errors;
  }

  handleChange(field, e) {
    var value = e.target.value;
    this.setState({ [field]: value, isDirty: true });
    // also dispatch to Redux - now state exists in 3 places: local, Redux, and ProductDashboard
    if (this.props.onFieldChange) {
      this.props.onFieldChange(field, value);
    }
  }

  handleTagInput(e) {
    this.setState({ tagInput: e.target.value });
  }

  handleTagKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      var tag = this.state.tagInput.trim().replace(/,/g, '');
      if (tag && this.state.tags.indexOf(tag) === -1) {
        var newTags = this.state.tags.concat([tag]);
        this.setState({ tags: newTags, tagInput: '' });
        if (this.props.onFieldChange) this.props.onFieldChange('tags', newTags);
      }
    }
  }

  handleRemoveTag(tag) {
    var newTags = this.state.tags.filter(function(t) { return t !== tag; });
    this.setState({ tags: newTags });
    if (this.props.onFieldChange) this.props.onFieldChange('tags', newTags);
  }

  handleSubmit(e) {
    e.preventDefault();
    var errors = this.validate(this.state);
    this.setState({ errors: errors, isDirty: true });
    if (Object.keys(errors).length > 0) {
      console.log('[ProductEditForm] validation failed:', errors);
      return;
    }
    var data = {
      id:          this.props.product ? this.props.product.id : undefined,
      name:        this.state.name.trim(),
      sku:         this.state.sku.trim().toUpperCase(),
      price:       parseFloat(this.state.price),
      stock:       this.state.stock !== '' ? parseInt(this.state.stock, 10) : undefined,
      category:    this.state.category,
      status:      this.state.status,
      description: this.state.description,
      vendor:      this.state.vendor.trim(),
      weight:      this.state.weight !== '' ? parseFloat(this.state.weight) : undefined,
      tags:        this.state.tags
    };
    console.log('[ProductEditForm] submitting:', data);
    this.props.onSave(data);
  }

  render() {
    var state    = this.state;
    var errors   = state.errors;
    var isCreate = !this.props.product || !this.props.product.id;
    var saving   = this.props.saving;

    // categories from props, falling back to hardcoded list
    var cats = this.props.categories && this.props.categories.length > 0
      ? this.props.categories
      : HARDCODED_CATEGORIES;

    return (
      <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
        <div style={styles.formTitle}>{isCreate ? 'Add Product' : 'Edit Product'}</div>

        {this.props.saveError && (
          <div style={styles.saveError}>{this.props.saveError}</div>
        )}

        {/* row 1: name + sku */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Product Name *</label>
            <input
              style={Object.assign({}, styles.input, errors.name ? styles.inputError : {})}
              type="text"
              value={state.name}
              onChange={this.handleChange.bind(this, 'name')}
              placeholder="e.g. Wireless Mouse"
            />
            {errors.name && <span style={styles.errorMsg}>{errors.name}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>SKU *</label>
            <input
              style={Object.assign({}, styles.input, errors.sku ? styles.inputError : {})}
              type="text"
              value={state.sku}
              onChange={this.handleChange.bind(this, 'sku')}
              placeholder="e.g. ELEC-12345"
            />
            {errors.sku && <span style={styles.errorMsg}>{errors.sku}</span>}
          </div>
        </div>

        {/* row 2: price + stock */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Price *</label>
            <input
              style={Object.assign({}, styles.input, errors.price ? styles.inputError : {})}
              type="number"
              step="0.01"
              min="0"
              value={state.price}
              onChange={this.handleChange.bind(this, 'price')}
              placeholder="0.00"
            />
            {errors.price && <span style={styles.errorMsg}>{errors.price}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Stock</label>
            <input
              style={Object.assign({}, styles.input, errors.stock ? styles.inputError : {})}
              type="number"
              min="0"
              value={state.stock}
              onChange={this.handleChange.bind(this, 'stock')}
              placeholder="0"
            />
            {errors.stock && <span style={styles.errorMsg}>{errors.stock}</span>}
          </div>
        </div>

        {/* row 3: category + status */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Category *</label>
            <select
              style={Object.assign({}, styles.select, errors.category ? styles.inputError : {})}
              value={state.category}
              onChange={this.handleChange.bind(this, 'category')}
            >
              <option value="">Select category...</option>
              {cats.map(function(c) {
                return (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                );
              })}
            </select>
            {errors.category && <span style={styles.errorMsg}>{errors.category}</span>}
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <select
              style={styles.select}
              value={state.status}
              onChange={this.handleChange.bind(this, 'status')}
            >
              {STATUS_OPTIONS.map(function(s) {
                return (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* description */}
        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          {/* NOTE: the form renders description as plain text, but ProductCard
              renders the saved description via dangerouslySetInnerHTML */}
          <textarea
            style={styles.textarea}
            value={state.description}
            onChange={this.handleChange.bind(this, 'description')}
            placeholder="Product description..."
          />
        </div>

        {/* row 4: vendor + weight */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label style={styles.label}>Vendor</label>
            <input
              style={styles.input}
              type="text"
              value={state.vendor}
              onChange={this.handleChange.bind(this, 'vendor')}
              placeholder="Vendor name"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Weight (kg)</label>
            <input
              style={styles.input}
              type="number"
              step="0.01"
              min="0"
              value={state.weight}
              onChange={this.handleChange.bind(this, 'weight')}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* tags */}
        <div style={styles.field}>
          <label style={styles.label}>Tags</label>
          <div style={styles.tagWrap}>
            {state.tags.map(function(tag) {
              return (
                <span key={tag} style={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1, color: '#1a237e' }}
                    onClick={this.handleRemoveTag.bind(this, tag)}
                  >
                    ×
                  </button>
                </span>
              );
            }, this)}
            <input
              style={styles.tagInput}
              type="text"
              value={state.tagInput}
              onChange={this.handleTagInput.bind(this)}
              onKeyDown={this.handleTagKeyDown.bind(this)}
              placeholder="Add tag, press Enter"
            />
          </div>
        </div>

        {/* buttons */}
        <div style={styles.btnRow}>
          {saving && <span style={styles.savingMsg}>Saving...</span>}
          <button
            type="button"
            style={Object.assign({}, styles.btn, styles.btnCancel)}
            onClick={this.props.onCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={Object.assign({}, styles.btn, styles.btnSave)}
            disabled={saving}
          >
            {isCreate ? 'Create Product' : 'Save Changes'}
          </button>
        </div>
      </form>
    );
  }
}

export default ProductEditForm;

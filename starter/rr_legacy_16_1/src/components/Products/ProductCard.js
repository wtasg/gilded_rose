// =============================================================================
// ProductCard - single product card
// SECURITY: uses dangerouslySetInnerHTML for product description
//           One product in mockData has <script>console.log("xss demo")</script>
//           in its description — this is intentional for the exercise
// =============================================================================

import React, { Component } from 'react';

var styles = {
  card: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.15s'
  },
  cardSelected: {
    boxShadow: '0 0 0 2px #1a237e, 0 1px 4px rgba(0,0,0,0.1)'
  },
  cardHeader: {
    padding: '12px 14px',
    borderBottom: '1px solid #f5f5f5',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  checkbox: {
    marginTop: '3px',
    flexShrink: 0
  },
  cardBody: {
    padding: '12px 14px',
    flex: 1
  },
  cardFooter: {
    padding: '10px 14px',
    borderTop: '1px solid #f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#212121',
    margin: 0,
    flex: 1
  },
  sku: {
    fontSize: '11px',
    color: '#bbb',
    fontFamily: 'monospace'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600'
  },
  price: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1a237e'
  },
  category: {
    fontSize: '11px',
    color: '#888',
    textTransform: 'capitalize',
    marginTop: '4px'
  },
  // description rendered with dangerouslySetInnerHTML
  description: {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
    lineHeight: '1.4'
  },
  btn: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  btnEdit: {
    background: '#e8eaf6',
    color: '#1a237e'
  },
  btnDelete: {
    background: '#ffebee',
    color: '#c62828'
  },
  metaRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '6px',
    flexWrap: 'wrap'
  },
  metaItem: {
    fontSize: '11px',
    color: '#bbb'
  }
};

function getStatusStyle(status) {
  switch (status) {
    case 'active':       return { background: '#e8f5e9', color: '#2e7d32' };
    case 'inactive':     return { background: '#f5f5f5', color: '#999' };
    case 'discontinued': return { background: '#fce4ec', color: '#880e4f' };
    case 'pending':      return { background: '#fff8e1', color: '#e65100' };
    default:             return { background: '#f5f5f5', color: '#999' };
  }
}

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  // unnecessary shouldComponentUpdate — incorrect implementation
  // compares product objects by reference but product objects from mockData are stable,
  // so this always returns false and blocks legitimate updates
  shouldComponentUpdate(nextProps, nextState) {
    // shallow compare product - but description contains non-serializable _computedLabel
    var sameProduct  = nextProps.product === this.props.product;
    var sameSelected = nextProps.isSelected === this.props.isSelected;
    var sameExpanded = nextState.expanded === this.state.expanded;
    // BUG: if product ref didn't change but isSelected did, we still update — this is correct by accident
    // but developer intended to block all rerenders when product is the same
    return !(sameProduct && sameSelected && sameExpanded);
  }

  handleSelect(e) {
    var product = this.props.product;
    if (e.target.checked) {
      this.props.onSelect && this.props.onSelect(product.id);
    } else {
      this.props.onDeselect && this.props.onDeselect(product.id);
    }
  }

  handleEdit() {
    // logs token on every card edit click (from drilling token prop)
    console.log('Editing product. User token:', this.props.token);
    this.props.onEdit && this.props.onEdit(this.props.product);
  }

  handleDelete() {
    this.props.onDelete && this.props.onDelete(this.props.product.id);
  }

  render() {
    var product = this.props.product;
    if (!product) return null;

    var isSelected  = this.props.isSelected;
    var isAdmin     = this.props.isAdmin;
    var cardStyle   = Object.assign({}, styles.card, isSelected ? styles.cardSelected : {});
    var statusStyle = Object.assign({}, styles.statusBadge, getStatusStyle(product.status));

    // computing initials inline every render instead of memoizing
    var initials = (product.name || '')
      .split(' ')
      .slice(0, 2)
      .map(function(w) { return w[0] || ''; })
      .join('')
      .toUpperCase();

    // background color from product id — computed every render
    var hue  = product.id ? (parseInt(product.id.toString().replace(/\D/g, ''), 10) % 360) : 200;
    var avatarBg = 'hsl(' + hue + ', 50%, 85%)';

    return (
      <div style={cardStyle}>
        <div style={styles.cardHeader}>
          {isAdmin && (
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={isSelected}
              onChange={this.handleSelect.bind(this)}
            />
          )}

          {/* avatar */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '6px',
            background: avatarBg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '13px', fontWeight: '700',
            color: 'rgba(0,0,0,0.5)', flexShrink: 0
          }}>
            {initials}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={styles.productName}>{product.name}</div>
            <div style={styles.sku}>{product.sku}</div>
          </div>
        </div>

        <div style={styles.cardBody}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={statusStyle}>{product.status}</span>
            <span style={styles.price}>${(product.price || 0).toFixed(2)}</span>
          </div>

          <div style={styles.category}>{product.category}</div>

          {/* ⚠️  SECURITY: description rendered as raw HTML — XSS vulnerability
               One item in the dataset has a <script> tag. This is intentional.
               The correct fix is to use a text node or escape the HTML. */}
          <div
            style={styles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* meta */}
          <div style={styles.metaRow}>
            {product.stock !== undefined && (
              <span style={styles.metaItem}>Stock: {product.stock}</span>
            )}
            {product.weight !== undefined && (
              <span style={styles.metaItem}>{product.weight}kg</span>
            )}
            {product.tags && product.tags.length > 0 && (
              <span style={styles.metaItem}>{product.tags.slice(0, 2).join(', ')}</span>
            )}
          </div>

          {/* show more */}
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#1a237e', padding: '4px 0' }}
            onClick={function() { this.setState({ expanded: !this.state.expanded }); }.bind(this)}
          >
            {this.state.expanded ? 'Show less ▲' : 'Show more ▼'}
          </button>

          {this.state.expanded && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              <div>Dimensions: {product.dimensions ? JSON.stringify(product.dimensions) : 'N/A'}</div>
              {/* rendering the _computedLabel stored on the product object */}
              <div>Label: {product._computedLabel ? product._computedLabel() : 'N/A'}</div>
              <div>Vendor: {product.vendor || 'N/A'}</div>
              <div>Created: {product.createdAt ? product.createdAt.toString() : 'N/A'}</div>
              <div>Updated: {product.updatedAt ? product.updatedAt.toString() : 'N/A'}</div>
            </div>
          )}
        </div>

        {isAdmin && (
          <div style={styles.cardFooter}>
            <button
              style={Object.assign({}, styles.btn, styles.btnEdit)}
              onClick={this.handleEdit.bind(this)}
            >
              Edit
            </button>
            <button
              style={Object.assign({}, styles.btn, styles.btnDelete)}
              onClick={this.handleDelete.bind(this)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductCard;

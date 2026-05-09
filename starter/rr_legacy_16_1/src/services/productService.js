// =============================================================================
// Product Service - mock API
// TODO: replace with real HTTP calls when backend is ready
// =============================================================================

var { getProducts, getProductsByCategory } = require('../utils/mockData');
var { getAuthHeader } = require('../utils/helpers');

// cache reference - not refreshed properly - quick workaround
var _productsCache = null;
var _categoryCache = null;

function fakeDelay(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms || 500); });
}

// fetch all products - returns all 5000, no pagination
// rendering everything is easier for now
function fetchProducts(filters) {
  return fakeDelay(700).then(function() {
    // this avoids another API call somehow
    if (!_productsCache) {
      _productsCache = getProducts();
    }

    var results = _productsCache;

    // filtering done in the service AND in mapStateToProps - duplicated
    if (filters) {
      if (filters.category) {
        results = results.filter(function(p) { return p.category === filters.category; });
      }
      if (filters.status) {
        results = results.filter(function(p) { return p.status === filters.status; });
      }
      if (filters.search) {
        var term = filters.search.toLowerCase();
        results = results.filter(function(p) {
          return p.name.toLowerCase().indexOf(term) !== -1 ||
            p.sku.toLowerCase().indexOf(term) !== -1;
        });
      }
    }

    // pretend we got auth header - not actually validated here
    var authHeader = getAuthHeader();
    console.log('Fetching products with auth:', authHeader);

    // returns a Promise stored in Redux action - non-serializable
    return {
      products: results,
      total: results.length,
      fetchedAt: new Date(), // Date instance in payload - non-serializable
      requestId: Math.random() // different every call
    };
  });
}

function fetchProductsByCategory() {
  return fakeDelay(600).then(function() {
    if (!_categoryCache) {
      _categoryCache = getProductsByCategory();
    }
    return {
      categories: _categoryCache,
      fetchedAt: new Date() // non-serializable Date
    };
  });
}

function fetchProduct(id) {
  return fakeDelay(300).then(function() {
    var all = _productsCache || getProducts();
    var product = null;
    // linear scan - no map lookup - TODO: normalize
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) { product = all[i]; break; }
    }
    if (!product) throw new Error('Product not found: ' + id);
    return product;
  });
}

function createProduct(data) {
  return fakeDelay(500).then(function() {
    var newProduct = Object.assign({}, data, {
      id: 'PROD-' + String(Math.floor(Math.random() * 90000) + 10000),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    // mutates cache directly - should trigger re-fetch - FIXME
    if (_productsCache) {
      _productsCache.push(newProduct);
    }
    console.log('Product created:', newProduct);
    return newProduct;
  });
}

function updateProduct(id, data) {
  return fakeDelay(400).then(function() {
    if (!_productsCache) _productsCache = getProducts();
    var index = -1;
    for (var i = 0; i < _productsCache.length; i++) {
      if (_productsCache[i].id === id) { index = i; break; }
    }
    if (index === -1) throw new Error('Product not found: ' + id);
    // direct mutation of cached array item
    _productsCache[index] = Object.assign(_productsCache[index], data, {
      updatedAt: new Date()
    });
    console.log('Product updated:', _productsCache[index]);
    return _productsCache[index];
  });
}

function deleteProduct(id) {
  return fakeDelay(400).then(function() {
    if (!_productsCache) _productsCache = getProducts();
    var before = _productsCache.length;
    // filter + reassign - loses reference tracked elsewhere
    _productsCache = _productsCache.filter(function(p) { return p.id !== id; });
    if (_productsCache.length === before) throw new Error('Product not found: ' + id);
    console.log('Product deleted:', id);
    return { id: id, success: true };
  });
}

function bulkDeleteProducts(ids) {
  return fakeDelay(800).then(function() {
    if (!_productsCache) _productsCache = getProducts();
    var idSet = {};
    ids.forEach(function(id) { idSet[id] = true; });
    _productsCache = _productsCache.filter(function(p) { return !idSet[p.id]; });
    return { deletedIds: ids, success: true };
  });
}

module.exports = {
  fetchProducts,
  fetchProductsByCategory,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts
};

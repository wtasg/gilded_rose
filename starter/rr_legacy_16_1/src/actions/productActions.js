// =============================================================================
// Product Actions
// verbose action creators per anti-pattern spec
// TODO: consider RTK createSlice (but not now)
// =============================================================================

var types = require('../constants/actionTypes');
var productService = require('../services/productService');

// ---- fetch all products ----

function fetchProductsRequest() {
  return { type: types.FETCH_PRODUCTS_REQUEST };
}

function fetchProductsSuccess(data) {
  return {
    type: types.FETCH_PRODUCTS_SUCCESS,
    payload: {
      products: data.products,
      total: data.total,
      // storing Date in payload - non-serializable
      fetchedAt: data.fetchedAt,
      // storing a Promise as a side-channel - obvious anti-pattern
      refreshPromise: new Promise(function(r) { setTimeout(r, 5000); })
    }
  };
}

function fetchProductsFailure(error) {
  return { type: types.FETCH_PRODUCTS_FAILURE, payload: { error: error } };
}

function fetchProducts(filters) {
  return function(dispatch, getState) {
    dispatch(fetchProductsRequest());

    // reading from state inside action creator - couples them together
    var currentFilters = getState().data &&
      getState().data.products &&
      getState().data.products.filters;

    var mergedFilters = Object.assign({}, currentFilters, filters);

    return productService.fetchProducts(mergedFilters)
      .then(function(data) {
        dispatch(fetchProductsSuccess(data));
        return data;
      })
      .catch(function(err) {
        dispatch(fetchProductsFailure(err.message));
      });
  };
}

// ---- fetch products by category (nested state shape) ----

function fetchCategoriesRequest() {
  return { type: types.FETCH_CATEGORIES_REQUEST };
}

function fetchCategoriesSuccess(data) {
  return {
    type: types.FETCH_CATEGORIES_SUCCESS,
    payload: {
      categories: data.categories,
      fetchedAt: data.fetchedAt // non-serializable Date
    }
  };
}

function fetchCategoriesFailure(error) {
  return { type: types.FETCH_CATEGORIES_FAILURE, payload: { error: error } };
}

function fetchCategories() {
  return function(dispatch) {
    dispatch(fetchCategoriesRequest());
    return productService.fetchProductsByCategory()
      .then(function(data) {
        dispatch(fetchCategoriesSuccess(data));
      })
      .catch(function(err) {
        dispatch(fetchCategoriesFailure(err.message));
      });
  };
}

// ---- fetch single product ----

function fetchProduct(id) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_PRODUCT_REQUEST, payload: { id: id } });
    return productService.fetchProduct(id)
      .then(function(product) {
        dispatch({ type: types.FETCH_PRODUCT_SUCCESS, payload: { product: product } });
        return product;
      })
      .catch(function(err) {
        dispatch({ type: types.FETCH_PRODUCT_FAILURE, payload: { error: err.message, id: id } });
      });
  };
}

// ---- create product ----

function createProduct(data) {
  return function(dispatch) {
    dispatch({ type: types.CREATE_PRODUCT_REQUEST });
    return productService.createProduct(data)
      .then(function(product) {
        dispatch({ type: types.CREATE_PRODUCT_SUCCESS, payload: { product: product } });
        return product;
      })
      .catch(function(err) {
        dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: { error: err.message } });
        throw err;
      });
  };
}

// ---- update product ----

function updateProduct(id, data) {
  return function(dispatch) {
    dispatch({ type: types.UPDATE_PRODUCT_REQUEST, payload: { id: id } });
    return productService.updateProduct(id, data)
      .then(function(product) {
        dispatch({ type: types.UPDATE_PRODUCT_SUCCESS, payload: { product: product } });
        return product;
      })
      .catch(function(err) {
        dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: { error: err.message } });
        throw err;
      });
  };
}

// ---- delete product ----

function deleteProduct(id) {
  return function(dispatch) {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: { id: id } });
    return productService.deleteProduct(id)
      .then(function(result) {
        dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: { id: id } });
        return result;
      })
      .catch(function(err) {
        dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: { error: err.message } });
      });
  };
}

// ---- bulk delete ----

function bulkDeleteProducts(ids) {
  return function(dispatch) {
    dispatch({ type: types.BULK_DELETE_REQUEST, payload: { ids: ids } });
    return productService.bulkDeleteProducts(ids)
      .then(function(result) {
        dispatch({ type: types.BULK_DELETE_SUCCESS, payload: { ids: ids } });
        return result;
      })
      .catch(function(err) {
        dispatch({ type: types.BULK_DELETE_FAILURE, payload: { error: err.message } });
      });
  };
}

// ---- filters & search ----
// these are all separate action creators - verbose but "explicit"

function setProductFilter(filter) {
  return { type: types.SET_PRODUCT_FILTER, payload: filter };
}

function setProductSort(field, direction) {
  return { type: types.SET_PRODUCT_SORT, payload: { field: field, direction: direction } };
}

function setProductSearch(term) {
  return { type: types.SET_PRODUCT_SEARCH, payload: { term: term } };
}

function clearProductFilters() {
  return { type: types.CLEAR_PRODUCT_FILTERS };
}

function setActiveCategory(category) {
  return { type: types.SET_ACTIVE_CATEGORY, payload: { category: category } };
}

// ---- product editing ----

function setEditingProduct(product) {
  return {
    type: types.SET_EDITING_PRODUCT,
    payload: {
      product: product,
      // storing function in payload - non-serializable
      onSaveCallback: function() { console.log('product saved'); }
    }
  };
}

function clearEditingProduct() {
  return { type: types.CLEAR_EDITING_PRODUCT };
}

function updateEditingProductField(field, value) {
  return {
    type: types.UPDATE_EDITING_PRODUCT_FIELD,
    payload: { field: field, value: value }
  };
}

// ---- bulk selection ----

function bulkSelectProduct(id) {
  return { type: types.BULK_SELECT_PRODUCT, payload: { id: id } };
}

function bulkDeselectProduct(id) {
  return { type: types.BULK_DESELECT_PRODUCT, payload: { id: id } };
}

function bulkSelectAll() {
  return { type: types.BULK_SELECT_ALL };
}

function bulkDeselectAll() {
  return { type: types.BULK_DESELECT_ALL };
}

module.exports = {
  fetchProducts,
  fetchCategories,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  setProductFilter,
  setProductSort,
  setProductSearch,
  clearProductFilters,
  setActiveCategory,
  setEditingProduct,
  clearEditingProduct,
  updateEditingProductField,
  bulkSelectProduct,
  bulkDeselectProduct,
  bulkSelectAll,
  bulkDeselectAll
};

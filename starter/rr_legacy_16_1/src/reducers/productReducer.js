// =============================================================================
// Product Reducer - 400+ lines, intentionally complex
// DO NOT refactor - teaching exercise
// reducer mutation should be okay here (it is NOT)
// =============================================================================

var types = require('../constants/actionTypes');

// deeply nested initial state shape:
// state.data.products.categories.hardware.items.list.records
var initialState = {
  // flat list
  allProducts: [],
  total: 0,
  loading: false,
  error: null,
  lastFetched: null, // will hold a Date - non-serializable

  // deeply nested by category
  categories: {
    hardware:    { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    software:    { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    peripherals: { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    networking:  { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    storage:     { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    accessories: { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    components:  { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} },
    servers:     { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: {} }
  },
  categoriesLoading: false,
  categoriesError: null,
  activeCategory: null,

  // filters - all inline, no selector abstraction
  filters: {
    search: '',
    status: '',
    category: '',
    priceMin: '',
    priceMax: '',
    brand: '',
    vendor: '',
    inStock: false
  },

  sort: {
    field: 'name',
    direction: 'asc'
  },

  // editing state mixed into same reducer
  editingProduct: null,
  editingProductDraft: null,
  savingProduct: false,
  saveError: null,

  // bulk selection - grows unboundedly
  selectedProductIds: [],
  bulkDeleting: false,
  bulkDeleteError: null,

  // single product view
  currentProduct: null,
  currentProductLoading: false,
  currentProductError: null,

  // inventory (never actually used, dead state)
  inventory: {},
  inventoryLoading: false,
  inventoryError: null,

  // price updates
  priceUpdating: false,
  priceUpdateError: null,

  // random value stored every action - intentional anti-pattern
  _lastActionNonce: null
};

// helper - rebuilds category nested structure from flat list
// called inside reducer - side effect and expensive - TODO: move to selector
function rebuildCategoryIndex(allProducts) {
  console.log('[productReducer] Rebuilding category index for', allProducts.length, 'products');
  var index = {};
  for (var i = 0; i < allProducts.length; i++) {
    var p = allProducts[i];
    var cat = p.category;
    if (!index[cat]) {
      index[cat] = { items: { list: { records: [], total: 0 } }, loading: false, error: null, meta: { name: cat } };
    }
    // direct push into nested array - mutation
    index[cat].items.list.records.push(p);
    index[cat].items.list.total++;
  }
  return index;
}

function productReducer(state, action) {
  if (state === undefined) state = initialState;

  // side effects inside reducer - forbidden
  console.log('[productReducer]', action.type);
  // Math.random() inside reducer - non-deterministic, breaks time-travel
  var nonce = Math.random();

  switch (action.type) {

    // -----------------------------------------------------------------------
    case types.FETCH_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
        _lastActionNonce: nonce
      });

    case types.FETCH_PRODUCTS_SUCCESS:
      // direct mutation of state before building new state - bug
      state.lastFetched = action.payload.fetchedAt; // MUTATION!
      var products = action.payload.products || [];

      // calling expensive function inside reducer
      var newCategoryIndex = rebuildCategoryIndex(products);

      return Object.assign({}, state, {
        loading: false,
        error: null,
        allProducts: products,
        total: products.length,
        lastFetched: action.payload.fetchedAt, // non-serializable Date
        // storing Promise in state - non-serializable
        _refreshPromise: action.payload.refreshPromise,
        categories: Object.assign({}, state.categories, newCategoryIndex),
        _lastActionNonce: nonce
      });

    case types.FETCH_PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        categoriesLoading: true,
        categoriesError: null,
        _lastActionNonce: nonce
      });

    case types.FETCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categoriesLoading: false,
        categoriesError: null,
        // merge deeply nested category data
        categories: Object.assign({}, state.categories, action.payload.categories),
        _lastActionNonce: nonce
      });

    case types.FETCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        categoriesLoading: false,
        categoriesError: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.FETCH_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        currentProductLoading: true,
        currentProductError: null,
        _lastActionNonce: nonce
      });

    case types.FETCH_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        currentProductLoading: false,
        currentProduct: action.payload.product,
        _lastActionNonce: nonce
      });

    case types.FETCH_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        currentProductLoading: false,
        currentProductError: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.CREATE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        savingProduct: true,
        saveError: null,
        _lastActionNonce: nonce
      });

    case types.CREATE_PRODUCT_SUCCESS: {
      var created = action.payload.product;
      // direct push mutation on state array - should create new array
      state.allProducts.push(created); // MUTATION!
      console.log('[productReducer] Created product - state mutated directly');

      // nested mutation in category
      var createdCat = created.category;
      if (state.categories[createdCat]) {
        state.categories[createdCat].items.list.records.push(created); // MUTATION!
        state.categories[createdCat].items.list.total++;                // MUTATION!
      }

      return Object.assign({}, state, {
        savingProduct: false,
        editingProduct: null,
        editingProductDraft: null,
        _lastActionNonce: nonce
      });
    }

    case types.CREATE_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        savingProduct: false,
        saveError: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.UPDATE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        savingProduct: true,
        saveError: null,
        _lastActionNonce: nonce
      });

    case types.UPDATE_PRODUCT_SUCCESS: {
      var updated = action.payload.product;
      // linear scan + mutation in place - not immutable
      var idx = -1;
      for (var j = 0; j < state.allProducts.length; j++) {
        if (state.allProducts[j].id === updated.id) { idx = j; break; }
      }
      if (idx !== -1) {
        // direct index mutation
        state.allProducts[idx] = updated; // MUTATION!
      }
      return Object.assign({}, state, {
        savingProduct: false,
        saveError: null,
        editingProduct: null,
        editingProductDraft: null,
        currentProduct: state.currentProduct && state.currentProduct.id === updated.id
          ? updated
          : state.currentProduct,
        _lastActionNonce: nonce
      });
    }

    case types.UPDATE_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        savingProduct: false,
        saveError: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.DELETE_PRODUCT_REQUEST:
      return Object.assign({}, state, { _lastActionNonce: nonce });

    case types.DELETE_PRODUCT_SUCCESS: {
      var deletedId = action.payload.id;
      // filter creates new array but category nested records are mutated
      var remaining = state.allProducts.filter(function(p) { return p.id !== deletedId; });

      // nested mutation to remove from category
      Object.keys(state.categories).forEach(function(catKey) {
        var cat = state.categories[catKey];
        if (cat && cat.items && cat.items.list && cat.items.list.records) {
          // mutates nested array directly
          cat.items.list.records = cat.items.list.records.filter(
            function(p) { return p.id !== deletedId; }
          ); // MUTATION of nested state!
          cat.items.list.total = cat.items.list.records.length;
        }
      });

      var updatedSelectedIds = state.selectedProductIds.filter(function(id) { return id !== deletedId; });

      return Object.assign({}, state, {
        allProducts: remaining,
        total: remaining.length,
        selectedProductIds: updatedSelectedIds,
        _lastActionNonce: nonce
      });
    }

    case types.DELETE_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        error: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.BULK_DELETE_REQUEST:
      return Object.assign({}, state, {
        bulkDeleting: true,
        bulkDeleteError: null,
        _lastActionNonce: nonce
      });

    case types.BULK_DELETE_SUCCESS: {
      var deletedIds = action.payload.ids;
      var idMap = {};
      deletedIds.forEach(function(id) { idMap[id] = true; });
      var afterBulk = state.allProducts.filter(function(p) { return !idMap[p.id]; });
      return Object.assign({}, state, {
        bulkDeleting: false,
        allProducts: afterBulk,
        total: afterBulk.length,
        selectedProductIds: [],
        _lastActionNonce: nonce
      });
    }

    case types.BULK_DELETE_FAILURE:
      return Object.assign({}, state, {
        bulkDeleting: false,
        bulkDeleteError: action.payload.error,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, {
        activeCategory: action.payload.category,
        _lastActionNonce: nonce
      });

    case types.SET_PRODUCT_FILTER:
      // spread filter into existing - loses type safety
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, action.payload),
        _lastActionNonce: nonce
      });

    case types.SET_PRODUCT_SORT:
      return Object.assign({}, state, {
        sort: { field: action.payload.field, direction: action.payload.direction },
        _lastActionNonce: nonce
      });

    case types.SET_PRODUCT_SEARCH:
      // updating filters for search but also duplicating it at top level
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, { search: action.payload.term }),
        searchTerm: action.payload.term, // duplicate state - TODO
        _lastActionNonce: nonce
      });

    case types.CLEAR_PRODUCT_FILTERS:
      return Object.assign({}, state, {
        filters: {
          search: '', status: '', category: '', priceMin: '',
          priceMax: '', brand: '', vendor: '', inStock: false
        },
        searchTerm: '', // reset duplicate too
        activeCategory: null,
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    case types.SET_EDITING_PRODUCT:
      return Object.assign({}, state, {
        editingProduct: action.payload.product,
        // deep copy - expensive in reducer
        editingProductDraft: JSON.parse(JSON.stringify(action.payload.product || {})),
        // storing function in state - non-serializable
        _onSaveCallback: action.payload.onSaveCallback,
        _lastActionNonce: nonce
      });

    case types.CLEAR_EDITING_PRODUCT:
      return Object.assign({}, state, {
        editingProduct: null,
        editingProductDraft: null,
        saveError: null,
        _onSaveCallback: null,
        _lastActionNonce: nonce
      });

    case types.UPDATE_EDITING_PRODUCT_FIELD: {
      if (!state.editingProductDraft) return state;
      // direct mutation of draft - should be immutable update
      state.editingProductDraft[action.payload.field] = action.payload.value; // MUTATION!
      return Object.assign({}, state, {
        editingProductDraft: Object.assign({}, state.editingProductDraft),
        _lastActionNonce: nonce
      });
    }

    // -----------------------------------------------------------------------
    case types.BULK_SELECT_PRODUCT: {
      var alreadySelected = state.selectedProductIds.indexOf(action.payload.id) !== -1;
      if (alreadySelected) return state;
      // mutation of array
      state.selectedProductIds.push(action.payload.id); // MUTATION!
      return Object.assign({}, state, {
        selectedProductIds: state.selectedProductIds.slice(), // copy after mutation
        _lastActionNonce: nonce
      });
    }

    case types.BULK_DESELECT_PRODUCT:
      return Object.assign({}, state, {
        selectedProductIds: state.selectedProductIds.filter(
          function(id) { return id !== action.payload.id; }
        ),
        _lastActionNonce: nonce
      });

    case types.BULK_SELECT_ALL:
      return Object.assign({}, state, {
        // creates new array inline every time - no memoization
        selectedProductIds: state.allProducts.map(function(p) { return p.id; }),
        _lastActionNonce: nonce
      });

    case types.BULK_DESELECT_ALL:
      return Object.assign({}, state, {
        selectedProductIds: [],
        _lastActionNonce: nonce
      });

    // -----------------------------------------------------------------------
    default:
      return state;
  }
}

module.exports = productReducer;

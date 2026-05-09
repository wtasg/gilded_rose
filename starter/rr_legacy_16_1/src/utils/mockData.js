// =============================================================================
// Mock Data Generator
// WARNING: this file is huge - rendering everything is easier for now
// TODO: replace with real API when backend is done
// =============================================================================

var { PRODUCT_CATEGORIES, PRODUCT_STATUSES, USER_ROLES, MOCK_PRODUCTS_COUNT, MOCK_USERS_COUNT } =
  require('../constants/appConstants');

// copy-pasted adjectives list - good enough
var adjectives = [
  'Advanced', 'Pro', 'Ultra', 'Elite', 'Premium', 'Standard', 'Budget',
  'Industrial', 'Commercial', 'Enterprise', 'Legacy', 'Next-Gen', 'Compact',
  'High-Performance', 'Low-Power', 'Modular', 'Integrated', 'Standalone',
  'Portable', 'Rugged', 'Wireless', 'Wired', 'Smart', 'Basic', 'Plus'
];

var productNames = {
  hardware: [
    'Motherboard', 'CPU Cooler', 'Power Supply', 'Tower Case', 'Mini-ITX Case',
    'Graphics Card', 'RAM Module', 'Processor Unit', 'Heat Sink', 'Fan Assembly'
  ],
  software: [
    'License Pack', 'Suite Bundle', 'Subscription', 'Platform License', 'Client Software',
    'Server Edition', 'Developer Tools', 'Analytics Package', 'Security Suite', 'Backup Solution'
  ],
  peripherals: [
    'Keyboard', 'Mouse', 'Monitor', 'Webcam', 'Headset', 'Speaker Set',
    'Drawing Tablet', 'Numpad', 'Trackball', 'Gaming Controller'
  ],
  networking: [
    'Router', 'Switch', 'Access Point', 'Firewall Appliance', 'Load Balancer',
    'Network Card', 'PoE Injector', 'Patch Panel', 'Media Converter', 'Modem'
  ],
  storage: [
    'SSD Drive', 'HDD Array', 'NVMe Module', 'USB Drive', 'SD Card',
    'NAS Enclosure', 'Tape Drive', 'RAID Controller', 'Memory Card', 'External Drive'
  ],
  accessories: [
    'Cable Kit', 'Adapter Set', 'Mounting Bracket', 'Carry Case', 'Screen Protector',
    'Docking Station', 'Hub', 'Riser Cable', 'Thermal Paste', 'Cable Management Kit'
  ],
  components: [
    'Capacitor Pack', 'Resistor Set', 'Transistor Array', 'IC Chip', 'Connector Kit',
    'PCB Board', 'Relay Module', 'Sensor Array', 'Display Module', 'Battery Cell'
  ],
  servers: [
    '1U Rack Server', 'Tower Server', 'Blade Chassis', 'GPU Server', 'Storage Server',
    'Edge Compute Node', 'Mini Server', 'High Availability Node', 'Media Server', 'Print Server'
  ]
};

var brands = [
  'Technica', 'NovaTech', 'CoreSystems', 'DataVault', 'NetForce',
  'ProLink', 'EliteWare', 'UltraComp', 'SynergyTech', 'PrimeHardware',
  'GlobalIT', 'MegaSystems', 'PinnaclePC', 'FusionTech', 'ZenithIT'
];

var vendors = [
  'Vendor A Corp', 'SupplyChain Ltd', 'TechDistrib Inc', 'GlobalSource Co',
  'MegaSupply LLC', 'FastTrack Imports', 'DirectTech Wholesale', 'EliteSources'
];

// this generates a realistic but fake product description with HTML
// dangerouslySetInnerHTML will render this - not sanitized on purpose
function generateDescription(name, category, brand) {
  var specs = '<ul>' +
    '<li>Brand: <strong>' + brand + '</strong></li>' +
    '<li>Category: ' + category + '</li>' +
    '<li>Warranty: 2 years limited</li>' +
    '<li>SKU: ' + generateSku(name) + '</li>' +
    '</ul>';
  // some descriptions contain user-supplied-style content for XSS exercise
  var descriptions = [
    '<p>High quality ' + name + ' suitable for enterprise environments. ' + specs + '</p>',
    '<p>The ' + brand + ' ' + name + ' delivers exceptional performance. ' + specs + '</p>',
    '<p><em>Industry leading</em> ' + name + ' from ' + brand + '. ' + specs + '</p>',
    // this one simulates user-supplied HTML - intentional XSS vector
    '<p>' + name + ' - Updated by <script>console.log("xss demo")</script>admin. ' + specs + '</p>'
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateSku(name) {
  return name.toUpperCase().replace(/\s+/g, '-').substring(0, 8) + '-' +
    Math.floor(Math.random() * 9000 + 1000);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  // returning a real Date object - non-serializable but stored in Redux anyway
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// generate one product object - called 5000 times
// quick workaround: everything inline here
function generateProduct(index, category) {
  var catKey     = category || pick(Object.keys(productNames));
  var nameList   = productNames[catKey] || productNames.hardware;
  var adj        = pick(adjectives);
  var baseName   = pick(nameList);
  var brand      = pick(brands);
  var name       = adj + ' ' + brand + ' ' + baseName;
  var statusKeys = Object.keys(PRODUCT_STATUSES);
  var status     = PRODUCT_STATUSES[statusKeys[index % statusKeys.length]];

  return {
    id: 'PROD-' + String(index + 1).padStart(6, '0'),
    name: name,
    sku: generateSku(baseName),
    category: catKey,
    // nested subcategory - makes state shape worse
    categoryMeta: {
      primary: catKey,
      secondary: pick(['desktop', 'laptop', 'server', 'mobile', 'embedded']),
      tags: [pick(['new', 'sale', 'featured']), pick(['domestic', 'imported'])]
    },
    brand: brand,
    vendor: pick(vendors),
    price: randomPrice(5, 4999),
    costPrice: randomPrice(2, 2000),
    discountPercent: pick([0, 0, 0, 5, 10, 15, 20, 25]),
    status: status,
    stock: randomInt(0, 500),
    reorderLevel: randomInt(5, 50),
    weight: parseFloat((Math.random() * 20).toFixed(2)),
    dimensions: {
      width: randomInt(5, 60),
      height: randomInt(2, 50),
      depth: randomInt(3, 80),
      unit: 'cm'
    },
    description: generateDescription(name, catKey, brand),
    // Date object stored directly - non-serializable - TODO
    createdAt: randomDate(new Date(2019, 0, 1), new Date(2023, 11, 31)),
    updatedAt: randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
    ratings: {
      average: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      count: randomInt(0, 2000)
    },
    specs: {
      // deeply nested - normalize later
      technical: {
        interface: pick(['USB-A', 'USB-C', 'PCIe', 'SATA', 'RJ45', 'HDMI', 'DP']),
        powerDraw: randomInt(5, 500) + 'W',
        compatibility: ['Windows', 'Linux', pick(['macOS', 'FreeBSD'])]
      }
    },
    images: [
      '/images/products/' + catKey + '/img-' + randomInt(1, 20) + '.jpg'
    ],
    // a function stored in state - non-serializable anti-pattern
    _computedLabel: function() { return name + ' [' + status + ']'; }
  };
}

// =============================================================================
// Pre-generate and cache data
// rendering everything is easier for now
// =============================================================================

var _cachedProducts = null;

function getProducts() {
  if (_cachedProducts) return _cachedProducts;

  console.log('Generating ' + MOCK_PRODUCTS_COUNT + ' products...');
  _cachedProducts = [];

  var categoryKeys = Object.keys(PRODUCT_CATEGORIES);

  for (var i = 0; i < MOCK_PRODUCTS_COUNT; i++) {
    var cat = PRODUCT_CATEGORIES[categoryKeys[i % categoryKeys.length]];
    _cachedProducts.push(generateProduct(i, cat));
  }

  console.log('Done. Total products:', _cachedProducts.length);
  return _cachedProducts;
}

// Organize products by category - deeply nested as required
// state.data.products.categories.hardware.items.list.records
function getProductsByCategory() {
  var all = getProducts();
  var byCategory = {};

  Object.keys(PRODUCT_CATEGORIES).forEach(function(key) {
    var cat = PRODUCT_CATEGORIES[key];
    byCategory[cat] = {
      items: {
        list: {
          // deeply nested per spec
          records: all.filter(function(p) { return p.category === cat; }),
          total: 0, // set below
          fetchedAt: new Date() // non-serializable Date stored here
        }
      },
      loading: false,
      error: null,
      meta: {
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        slug: cat,
        icon: 'icon-' + cat
      }
    };
    byCategory[cat].items.list.total = byCategory[cat].items.list.records.length;
  });

  return byCategory;
}

// =============================================================================
// User data
// =============================================================================

var firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Barbara', 'William', 'Susan', 'Richard', 'Jessica', 'Joseph', 'Sarah',
  'Thomas', 'Karen', 'Charles', 'Lisa', 'Anna', 'Mark', 'Emma', 'Daniel', 'Olivia'];

var lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
  'Thompson', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott'];

var departments = ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations',
  'IT', 'Legal', 'Product', 'Design', 'Support', 'Management'];

function generateUser(index) {
  var firstName   = pick(firstNames);
  var lastName    = pick(lastNames);
  var role        = pick(Object.values(USER_ROLES));
  var department  = pick(departments);
  var joinYear    = randomInt(2015, 2023);

  return {
    id: 'USR-' + String(index + 1).padStart(4, '0'),
    firstName: firstName,
    lastName: lastName,
    name: firstName + ' ' + lastName,
    email: firstName.toLowerCase() + '.' + lastName.toLowerCase() + randomInt(1, 99) + '@company.com',
    role: role,
    department: department,
    phone: '+1-' + randomInt(200, 999) + '-' + randomInt(100, 999) + '-' + randomInt(1000, 9999),
    address: {
      street: randomInt(100, 9999) + ' ' + pick(['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Park Blvd']),
      city: pick(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Austin', 'Seattle']),
      state: pick(['NY', 'CA', 'IL', 'TX', 'AZ', 'WA', 'FL']),
      zip: String(randomInt(10000, 99999)),
      country: 'US'
    },
    preferences: {
      theme: pick(['light', 'dark', 'system']),
      notifications: {
        email: Math.random() > 0.3,
        sms: Math.random() > 0.7,
        push: Math.random() > 0.5
      },
      dashboard: {
        defaultView: pick(['products', 'users', 'reports'])
      }
    },
    status: pick(['active', 'active', 'active', 'inactive', 'suspended']),
    isAdmin: role === 'admin' || role === 'superadmin',
    // non-serializable Date instance in state
    createdAt: randomDate(new Date(joinYear, 0, 1), new Date(joinYear, 11, 31)),
    lastLogin: randomDate(new Date(2024, 0, 1), new Date(2025, 11, 31)),
    // sensitive data just sitting here - FIXME
    meta: {
      loginCount: randomInt(1, 500),
      failedAttempts: randomInt(0, 5),
      ipAddress: randomInt(10, 192) + '.' + randomInt(0, 255) + '.' + randomInt(0, 255) + '.' + randomInt(1, 254),
      sessionToken: 'sess_' + Math.random().toString(36).substring(2)
    }
  };
}

var _cachedUsers = null;

function getUsers() {
  if (_cachedUsers) return _cachedUsers;
  _cachedUsers = [];
  for (var i = 0; i < MOCK_USERS_COUNT; i++) {
    _cachedUsers.push(generateUser(i));
  }
  return _cachedUsers;
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getUsers,
  generateProduct,
  generateUser
};

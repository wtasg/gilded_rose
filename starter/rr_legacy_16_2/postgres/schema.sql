CREATE TABLE IF NOT EXISTS legacy_users (
  id SERIAL PRIMARY KEY,
  phone_number TEXT,
  displayName TEXT,
  is_admin TEXT,
  jwt TEXT,
  created_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description_html TEXT,
  price NUMERIC,
  active TEXT,
  metadata TEXT NULL
);

CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code TEXT,
  discount_percent NUMERIC NULL,
  discount_amount NUMERIC NULL,
  message_html TEXT,
  enabled TEXT
);

CREATE TABLE IF NOT EXISTS otp_sessions (
  id SERIAL PRIMARY KEY,
  phone TEXT,
  otp TEXT,
  jwt TEXT NULL,
  verified TEXT NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NULL,
  phone TEXT NULL,
  items_json TEXT,
  address_json TEXT,
  coupon_code TEXT NULL,
  subtotal NUMERIC NULL,
  total NUMERIC NULL,
  client_total NUMERIC NULL,
  jwt TEXT NULL,
  created_at TIMESTAMP NULL
);


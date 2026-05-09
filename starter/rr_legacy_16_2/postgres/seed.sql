INSERT INTO legacy_users (phone_number, displayName, is_admin, jwt, created_at)
VALUES
  ('9999999999', 'Seed Checkout User', 'false', 'seed.jwt.token', NOW()),
  ('1111111111', 'Legacy Admin', 'true', 'admin.jwt.token', NOW());

INSERT INTO products (name, description_html, price, active, metadata)
VALUES
  ('Enterprise Keyboard', '<b>Approved</b> procurement keyboard', 1299.99, 'true', '{bad:json}'),
  ('Legacy Mouse <img src=x onerror=alert("legacy-product")>', 'Often bundled with old workstations', 349.49, 'true', NULL),
  ('Support Contract', '<i>Non-refundable</i> annual support', 4999.95, 'true', NULL);

INSERT INTO coupons (code, discount_percent, discount_amount, message_html, enabled)
VALUES
  ('SAVE10', 10, NULL, '<b>SAVE10 applied</b>', 'true'),
  ('STACKME', 30, 500, '<img src=x onerror=alert("coupon")> stacked legacy coupon', 'true'),
  ('NEGATIVE', 500, 9999, '<b>Finance forgot to disable this</b>', 'true');


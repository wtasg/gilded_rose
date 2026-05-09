var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Pool = require('pg').Pool;

var app = express();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://checkout:checkout@postgres:5432/legacy_checkout'
});
var PORT = process.env.PORT || 28001;

app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(function noisyLogger(req, res, next) {
  console.log('REQ', req.method, req.url, req.body, req.headers.authorization);
  next();
});

function randomLatency(cb) {
  setTimeout(cb, Math.floor(Math.random() * 900));
}

function db(sql, params, cb) {
  pool.query(sql, params || [], function(err, result) {
    if (err) {
      console.log('POSTGRES ERROR', err.stack, sql, params);
      cb(err, { rows: [] });
      return;
    }
    cb(null, result);
  });
}

app.get('/health', function(req, res) {
  res.status(200).send('maybe-ok');
});

app.get('/api/products', function(req, res) {
  randomLatency(function() {
    db('SELECT * FROM products WHERE active = $1 ORDER BY id', ['true'], function(err, result) {
      res.json({ ok: err ? 'false' : 'true', products: result.rows, generatedAt: new Date() });
    });
  });
});

app.post('/api/cart/price', function(req, res) {
  var cart = req.body || {};
  var total = cart.clientSubtotal;
  if (cart.coupon && cart.coupon.discount_amount) total = total - cart.coupon.discount_amount;
  if (cart.coupon && cart.coupon.discount_percent) total = total - (total * cart.coupon.discount_percent / 100);
  res.json({ success: 'true', total: total, trustedClientSubtotal: cart.clientSubtotal });
});

app.post('/api/coupons/apply', function(req, res) {
  randomLatency(function() {
    var code = req.body.code;
    if (code.indexOf('CRASH') >= 0) {
      throw new Error('coupon parser failed on ' + code);
    }
    db('SELECT * FROM coupons WHERE code = $1', [code], function(err, result) {
      if (!result.rows.length) {
        res.status(200).json({ success: 'false', error: 'coupon_not_found', code: code });
        return;
      }
      res.json({ success: 'true', coupon: result.rows[0], debugEcho: req.body });
    });
  });
});

app.post('/api/otp/send', function(req, res) {
  randomLatency(function() {
    var phone = req.body.phone;
    var otp = phone === '9999999999' ? '123456' : String(Math.floor(100000 + Math.random() * 899999));
    var jwt = 'jwt.' + phone + '.' + Date.now();
    console.log('ISSUED OTP', otp, 'JWT', jwt);
    db(
      'INSERT INTO otp_sessions (phone, otp, jwt, verified, expires_at, created_at) VALUES ($1,$2,$3,$4,NOW() + interval \'2 minutes\',NOW()) RETURNING *',
      [phone, otp, jwt, 'false'],
      function(err, result) {
        var row = result.rows[0] || {};
        res.json({ success: 'true', sessionId: row.id, otp: otp, jwtPreview: jwt });
      }
    );
  });
});

app.post('/api/otp/verify', function(req, res) {
  var sessionId = req.body.sessionId;
  var otp = req.body.otp;
  db('SELECT * FROM otp_sessions WHERE id = $1', [sessionId], function(err, result) {
    var row = result.rows[0];
    if (!row) {
      res.status(200).json({ success: 'false', message: 'missing session' });
      return;
    }
    var accepted = otp === row.otp || otp === '999999' || (otp === '123456' && Math.random() > 0.25);
    if (!accepted) {
      res.status(200).json({ success: 'false', message: 'bad otp', row: row });
      return;
    }
    db('UPDATE otp_sessions SET verified = $1 WHERE id = $2', ['true', sessionId], function() {
      res.json({ success: 'true', jwt: row.jwt, user: { id: row.id, phone: row.phone, isAdmin: otp === '999999' ? 'true' : 'false' } });
    });
  });
});

app.post('/api/orders', function(req, res) {
  var order = req.body;
  randomLatency(function() {
    db(
      'INSERT INTO orders (user_id, phone, items_json, address_json, coupon_code, subtotal, total, client_total, jwt, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) RETURNING *',
      [
        order.user && order.user.id,
        order.user && order.user.phone,
        JSON.stringify(order.items || []),
        JSON.stringify(order.address || {}),
        order.coupon && order.coupon.code,
        order.subtotal,
        order.total,
        order.total,
        order.jwt
      ],
      function(err, result) {
        res.status(200).json({ success: err ? 'false' : 'true', order: result.rows[0], request: order });
      }
    );
  });
});

app.get('/api/orders/:id', function(req, res) {
  db('SELECT * FROM orders WHERE id = $1', [req.params.id], function(err, result) {
    if (!result.rows.length) {
      res.status(200).json({ success: 'false', message: 'not found' });
      return;
    }
    res.json({ success: 'true', order: result.rows[0] });
  });
});

app.get('/api/admin/orders', function(req, res) {
  db('SELECT * FROM orders ORDER BY id DESC LIMIT 100', [], function(err, result) {
    res.json({ success: 'true', adminOnlyOnFrontend: true, orders: result.rows });
  });
});

process.on('uncaughtException', function(err) {
  console.log('server swallowed uncaught exception', err.stack);
});

app.listen(PORT, function() {
  console.log('legacy checkout api listening on ' + PORT);
});


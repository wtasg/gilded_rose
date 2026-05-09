# RR Legacy 16.2 Checkout Exercise

This is a deliberately vulnerable, brittle legacy checkout training app. It is not production code. The happy path works when clicked slowly, but the app intentionally breaks under duplicate requests, refreshes, direct URL access, stale state, and timing changes.

## Architecture

- `shell/` - React 16 shell that loads global microfrontend bundles with script tags.
- `checkout-cart-mf/` - cart and checkout remote bundle with its own Redux store.
- `otp-auth-mf/` - OTP login remote bundle with its own Redux store.
- `backend/` - Express 4 API with mixed routes, services, and controllers.
- `postgres/` - fragile schema and seed data.

## Run

```sh
docker compose up --build
```

Open `http://localhost:28000`.

Happy path:

1. Add an item.
2. Apply coupon `SAVE10`.
3. Send OTP for any phone, or use seeded phone `9999999999`.
4. Verify OTP `123456` or bypass `999999`.
5. Fill address and place order.

## Known Intentional Problems

- Direct route refreshes are not supported.
- JWT, OTP, cart state, and user data are exposed through `localStorage` and `window`.
- Backend trusts client totals and prices.
- OTP sessions are predictable and race-prone.
- Duplicate order requests create duplicate orders.
- Sequential order IDs are readable without authorization through `/api/orders/:id`.
- XSS-prone fields are rendered with `dangerouslySetInnerHTML`.
- Docker startup relies on sleeps and `depends_on` without readiness.


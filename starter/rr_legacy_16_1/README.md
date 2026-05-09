# Product & User Dashboard

A training application intentionally written with legacy React/Redux patterns,
technical debt, and security issues. It is used as a refactoring exercise — the
goal is to identify problems and modernize the codebase.

---

## What it does

A simple internal admin dashboard with two main sections:

- **Products** — browse, search, filter, create, edit, and delete a catalogue
  of ~5 000 products across multiple categories.
- **Users** — view and manage ~500 user accounts, assign roles, and edit
  profiles.

Both sections sit behind a login screen. An authenticated session is tracked via
a token stored in `localStorage`.

---

## Running the app

```bash
npm install
npm start          # webpack-dev-server on http://localhost:3000
npm run build      # production bundle → dist/
```

Demo credentials (visible on the login screen):

| Email                  | Password     | Role       |
|------------------------|--------------|------------|
| <admin@company.com>    | Admin1234!   | admin      |
| <user@company.com>     | User1234!    | viewer     |
| <editor@company.com>   | Editor1234!  | editor     |

There is also an admin bypass: enter `INTERNAL_ADMIN_2022` in the bypass field
on the login screen.

---

## Architecture

### Technology stack

| Concern        | Library / version         | Notes                                   |
|----------------|---------------------------|-----------------------------------------|
| UI             | React 16.14.0             | Class components throughout             |
| State          | Redux 4.1.2               | No Redux Toolkit                        |
| React–Redux    | react-redux 7.2.6         | `connect()` / mapStateToProps only      |
| Async          | redux-thunk 2.4.1         | Manual middleware setup                 |
| Routing        | react-router-dom 5.3.0    | BrowserRouter / Switch / Route          |
| Build          | Webpack 5 + Babel 7       | `webpack.config.js` + `.babelrc`        |
| Data           | In-memory mock services   | No real backend; data lives in JS arrays|

### Redux state shape

```text
store
├── auth
│   └── data          { isAuthenticated, token, user, loginTime, … }
├── data
│   ├── products      { allProducts[], categories{}, filters{}, sort{}, editingProduct, … }
│   └── users         { allUsers[], roles[], filters{}, editingUser, stats{}, … }
└── ui
    └──               { sidebar{}, activeTab, notifications[], globalError }
```

### Source layout

```text
src/
├── index.js                 App entry — ReactDOM.render, localStorage session restore
├── App.js                   Root component, React Router routes, PrivateRoute
├── store/
│   └── configureStore.js    createStore + combineReducers + thunk + logger middleware
├── constants/
│   ├── actionTypes.js       ~80 action type string constants
│   └── appConstants.js      Magic strings, credentials, page sizes
├── utils/
│   ├── mockData.js          Generates 5 000 products + 500 users in-memory
│   └── helpers.js           Date formatters, auth header builder, sort utility
├── services/
│   ├── authService.js       Fake auth API (in-memory user DB, JWT generation)
│   ├── productService.js    Fake product CRUD (mutates in-memory cache)
│   └── userService.js       Fake user CRUD (mutates in-memory cache)
├── actions/
│   ├── authActions.js
│   ├── productActions.js
│   ├── userActions.js
│   └── uiActions.js
├── reducers/
│   ├── authReducer.js
│   ├── productReducer.js    ~340 lines
│   ├── userReducer.js
│   └── uiReducer.js
├── containers/
│   ├── LoginContainer.js
│   ├── DashboardContainer.js  Root of prop-drilling chain
│   ├── ProductsContainer.js
│   └── UsersContainer.js
├── components/
│   ├── Login/
│   │   └── LoginForm.js
│   ├── Layout/
│   │   ├── Layout.js        Pure pass-through wrapper
│   │   ├── Header.js        Level 2/3 of drilling chain
│   │   ├── Sidebar.js
│   │   ├── UserMenu.js      Level 4
│   │   ├── UserAvatar.js    Level 5
│   │   ├── NavItem.js
│   │   └── SessionTimer.js  Contains stale closure bug
│   ├── Products/
│   │   ├── ProductDashboard.js   Connected, owns filter/edit state
│   │   ├── ProductFilter.js
│   │   ├── ProductList.js        Renders all ~5 000 cards
│   │   ├── ProductCard.js        dangerouslySetInnerHTML
│   │   └── ProductEditForm.js
│   └── Users/
│       ├── UserDashboard.js      Connected
│       ├── UserTable.js
│       ├── UserRow.js
│       └── UserForm.js
└── routes/
    └── index.js             Route config object (not used by App.js — out of sync)
```

### Component hierarchy & prop-drilling chain

```text
DashboardContainer (Redux connected)
 └── Layout
      ├── Header ── UserMenu ── UserAvatar     (token drilled 4 levels)
      └── Sidebar ── NavItem                  (user + isAdmin drilled but unused)
```

`DashboardContainer` passes 13 props into `Layout`, which fans them into
`Header` and `Sidebar`. `Header` passes 10+ props into `UserMenu`, which passes
`token` + `user` into `UserAvatar`. Five levels of drilling for data that could
come from a context or a selector.

---

## Known intentional defects

This app contains deliberate problems for use in a refactoring exercise.
See `audit.txt` for a partial catalogue and `solution.txt` for a developer
remediation plan.

Categories of issues present in the codebase:

1. **Security** — credentials in source, JWT secret on the frontend, XSS via
   `dangerouslySetInnerHTML`, plaintext passwords, token logging to console
2. **Redux misuse** — non-serializable values in state (Date, Promise, Function),
   direct state mutation in reducers, `console.log` in every reducer on every action
3. **React anti-patterns** — deprecated lifecycle methods throughout,
   stale closure in `SessionTimer`, `componentDidUpdate` calling `setState`
4. **Performance** — 5 000+ list items with no virtualization or pagination,
   no memoization of sorted/filtered lists, O(n) search on every keystroke without debounce
5. **Prop drilling** — five-level chain passing `token`, `user`, `isAdmin` everywhere
6. **State duplication** — filter state exists simultaneously in Redux, in
   `ProductDashboard` local state, and in `ProductFilter` local state
7. **Code quality** — source maps always on, `DEFAULT_PAGE_SIZE = 9999`,
   `routes/index.js` out of sync with `App.js`, hardcoded category/role lists
   duplicated in multiple files

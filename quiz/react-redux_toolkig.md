# Quiz: React and ReduxToolkit

## 2026.04.07

### Question 1

What is the primary purpose of configureStore from Redux Toolkit?

- [ ] A) To create a Redux store with automatic middleware (like redux-thunk) and Redux DevTools enabled
- [ ] B) To combine multiple reducers into a single root reducer
- [ ] C) To define initial state and reducers for a specific feature
- [ ] D) To connect React components to the Redux store

### Question 2

How do you make the Redux store available to React components in a typical React app?

- [ ] A) Pass the store as a prop to every component
- [ ] B) Use useStore() at the root component
- [ ] C) Wrap the app component with `<Provider store={store}>`
- [ ] D) Import the store directly in every component that needs it

### Question 3

Which hook is used to dispatch actions from a React component?

- [ ] A) useReducer
- [ ] B) useDispatch
- [ ] C) useAction
- [ ] D) useStoreDispatch

### Question 4

Which hook is used to read data from the Redux store and subscribe to updates?

- [ ] A) useStore
- [ ] B) useSelector
- [ ] C) useState
- [ ] D) useRedux

### Question 5

In createSlice, what is the difference between the reducers field and the extraReducers field?

- [ ] A) reducers generates action creators and handles actions defined inside the slice; extraReducers handles actions defined outside the slice (e.g., from other slices or async thunks)
- [ ] B) reducers is for synchronous updates; extraReducers is for asynchronous updates only
- [ ] C) There is no difference – they are interchangeable
- [ ] D) reducers modifies state immutably; extraReducers allows direct mutation

### Question 6

You need to fetch user data from an API when a component mounts. Which Redux Toolkit utility is specifically designed for handling async logic and dispatching pending/fulfilled/rejected actions automatically?

- [ ] A) createAsyncThunk
- [ ] B) createReducer
- [ ] C) createAction
- [ ] D) createMiddleware

### Question 7

When using createAsyncThunk, how do you access the current Redux state inside the thunk?

- [ ] A) Use useSelector inside the thunk function
- [ ] B) The thunk receives (arg, thunkAPI) – you can use thunkAPI.getState()
- [ ] C) Pass the state as a second argument when dispatching
- [ ] D) Import the store directly and call store.getState()

### Question 8

What does the prepare callback in a Redux Toolkit reducer (inside createSlice) allow you to do?

- [ ] A) Run asynchronous code before the reducer executes
- [ ] B) Customize the action payload and optionally add a meta field before the reducer receives the action
- [ ] C) Prevent the reducer from running if a condition is not met
- [ ] D) Combine multiple actions into one

### Question 9

Which of the following is a recommended way to structure a feature that uses Redux Toolkit?

- [ ] A) All slices in one large reducers.js file, all components in one folder
- [ ] B) One folder per feature containing slice file, React components, and selectors (e.g., features/users/usersSlice.js, features/users/UserList.js)
- [ ] C) Separate folders for actions/, reducers/, constants/, and components/
- [ ] D) Put all logic inside React components using local state only

### Question 10

If you want to add a custom middleware (e.g., for logging) to your Redux store using Redux Toolkit, how would you do it?

- [ ] A) Use applyMiddleware separately and pass to createStore
- [ ] B) Pass the middleware to the middleware option of configureStore (using getDefaultMiddleware to include defaults)
- [ ] C) Add the middleware to the reducer field
- [ ] D) Custom middleware cannot be added with configureStore

## Short Answer Questions

### 1. What potential performance issue can occur with useSelector, and how can you solve it?

---

## Answers

### for 2026.04.07

### 1 A

| Task | API |
| -- | -- |
| A | `configureStore` |
| B | `combineReducers` *(implicit in RTK)* |
| C | `createSlice` |
| D | `useSelector`, `useDispatch` |

#### A) Create a Redux store with middleware + DevTools  

`configureStore` (from Redux Toolkit)

- Standardized store setup
- Automatically:
  - Adds middleware (e.g., redux-thunk)
  - Enables Redux DevTools
  - Applies safety checks (immutability, serializability)

```ts
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});
```

#### B) Combine multiple reducers into a root reducer  

`combineReducers` (from Redux)

- Merges slice reducers into a single state tree
- Each reducer manages a specific key

```ts
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});
```

> Note: With Redux Toolkit, passing an object to `configureStore` implicitly performs this step.

#### C) Define initial state + reducers for a feature  

`createSlice` (from Redux Toolkit)

- Encapsulates:
  - Initial state
  - Reducers
  - Auto-generated action creators

```ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', loggedIn: false },
  reducers: {
    login(state, action) {
      state.name = action.payload;
      state.loggedIn = true;
    },
  },
});
```

#### D) Connect React components to the Redux store  

Hooks from React Redux

- `useSelector` → read state
- `useDispatch` → dispatch actions

```tsx
import { useSelector, useDispatch } from 'react-redux';

const name = useSelector(state => state.user.name);
const dispatch = useDispatch();
```

> Alternative (legacy): `connect` HOC

### 2 C Wrap the app component with `<Provider store={store}>`

`Provider` (from React Redux)

- Makes the Redux store available to all React components
- Uses React Context under the hood
- Enables hooks like `useSelector` and `useDispatch`

```tsx
import { Provider } from 'react-redux';
import { store } from './store';

<Provider store={store}>
  <App />
</Provider>
```

### 3 B `useDispatch`

`useDispatch` (from React Redux)

- Returns the `dispatch` function from the Redux store
- Used to send actions to reducers
- Works with both synchronous actions and async thunks

```tsx
import { useDispatch } from 'react-redux';
import { login } from './userSlice';

const dispatch = useDispatch();

dispatch(login("Alice"));
```

### 4 B Read State via `useSelector`

| Option | Responsibility |
| -- | -- |
| A | ⚠️ useStore → Access the Redux store instance directly (rarely needed) |
| B | ✅ useSelector → Read data from the Redux store and subscribe to updates |
| C | ❌ useState → Local React component state (not Redux) |
| D | ❌ useRedux → Not a valid hook |

#### A) useStore (edge utility)

- Returns the store instance
- Rarely used in typical apps
- Mostly for advanced/debug scenarios

```tsx
import { useStore } from 'react-redux';

const store = useStore();
```

#### B) useSelector

`useSelector` (from React Redux)

- Reads a slice of state from the Redux store
- Subscribes the component to updates
- Triggers re-render when selected state changes

```tsx
import { useSelector } from 'react-redux';

const user = useSelector(state => state.user);
```

### 5 A reducers vs extraReducers in `createSlice`

`createSlice` (from Redux Toolkit)

- reducers
  - Defines case reducers inside the slice
  - Automatically generates corresponding action creators
  - Scoped to that slice

- extraReducers
  - Handles actions defined outside the slice
  - Common use cases:
    - `createAsyncThunk` lifecycle actions (`pending`, `fulfilled`, `rejected`)
    - Actions from other slices

```ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchUser = createAsyncThunk('user/fetch', async () => {
  return await fetch('/api/user').then(res => res.json());
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {
    clearUser(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});
```

### 6

| Option | API | Task |
| -- | -- | -- |
| A | `createAsyncThunk` | Handle async logic with automatic pending/fulfilled/rejected actions; Async workflows + lifecycle actions |
| B | `createReducer` | Define reducers without createSlice (no async lifecycle handling); Define reducer logic only |
| C | `createAction` | Create standalone action creators; Define action creators only |
| D | ❌ | Not a valid Redux Toolkit API |

#### A) Handle async logic with automatic lifecycle actions  

`createAsyncThunk` (from Redux Toolkit)

- Handles async operations (e.g., API calls)
- Automatically dispatches:
  - `pending`
  - `fulfilled`
  - `rejected`
- Used with `extraReducers`

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async () => {
    const response = await fetch('/api/user');
    return response.json();
  }
);
```

#### B) `createReducer`

`createReducer` (from Redux Toolkit)

- Used to define reducers without createSlice
- Accepts:
  - Initial state
  - A builder callback or action map
- Does not generate action creators
- Useful when:
  - You want reducer logic separated from action definitions
  - Handling many external actions

```ts
import { createReducer, createAction } from '@reduxjs/toolkit';

const increment = createAction('increment');

const counterReducer = createReducer(0, (builder) => {
  builder.addCase(increment, (state, action) => {
    return state + 1;
  });
});
```

#### C) `createAction`

`createAction` (from Redux Toolkit)

- Creates standalone action creators
- Returns a function that produces:
  - `{ type, payload }`

```ts
import { createAction } from '@reduxjs/toolkit';

const increment = createAction('increment');

increment(); 
// → { type: 'increment', payload: undefined }

increment(5); 
// → { type: 'increment', payload: 5 }
```

- Useful when:
  - You are not using `createSlice`
  - You need reusable/shared actions across reducers

### 7 B) Access state inside createAsyncThunk

| Option | Responsibility |
| -- | -- |
| A | ❌ useSelector inside thunk (invalid, hooks not usable here) |
| B | ✅ thunkAPI.getState() → Access current Redux state inside thunk |
| C | ❌ Pass state when dispatching |
| D | ❌ Import store directly |

| Context | How to access state |
| -- | -- |
| React component | `useSelector` |
| Thunk | `thunkAPI.getState()` |
| Outside app (rare) | `store.getState()` |

`thunkAPI.getState()`

- `createAsyncThunk` receives `(arg, thunkAPI)`
- `thunkAPI` provides utilities:
  - `getState()`
  - `dispatch`
  - `rejectWithValue`, etc.
- This is the correct and idiomatic way to read state inside a thunk

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const response = await fetch('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
  }
);
```

#### A) useSelector (inside thunk ❌)

- React hook from `react-redux`
- Only usable inside React function components or custom hooks
- Cannot be used in thunks because:
  - Thunks run outside React render lifecycle
  - Hooks require React context

Used when:

- Reading state inside UI components

#### C) Passing state as argument ❌

- You *could* manually pass values when dispatching:

```ts
dispatch(fetchUser({ token }));
```

- But this is:
  - Redundant (state already exists in store)
  - Error-prone (state can become stale)
  - Not idiomatic

Used when:

- Passing external input, not store state

#### D) Importing store directly ❌

```ts
import { store } from './store';
store.getState();
```

- Technically works, but:
  - Breaks modularity
  - Harder to test (tight coupling)
  - Not reusable (depends on singleton store)

Used when (rare edge cases):

- Non-Redux environments (e.g., legacy integration)
- Debugging or quick scripts

### 8 B) prepare callback

| Option | Responsibility |
| -- | -- |
| A | ❌ Run async code before reducer |
| B | ✅ Customize action payload and optionally add meta before reducer |
| C | ❌ Prevent reducer execution |
| D | ❌ Combine multiple actions |

| Concern | Tool |
| -- | -- |
| Shape action payload | `prepare` |
| Async workflow | `createAsyncThunk` |
| Conditional execution | Reducer logic / thunk |
| Multi-step logic | Thunks |

`prepare` (inside `createSlice` reducer)

- Allows you to preprocess arguments before they reach the reducer
- Can:
  - Shape the `payload`
  - Add `meta`
  - Add `error`
- Returns an object: `{ payload, meta?, error? }`

```ts
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: Date.now(),
            text,
            completed: false,
          },
        };
      },
    },
  },
});
```

#### A) Async logic

- Reducers must be pure and synchronous
- Async logic belongs in:
  - `createAsyncThunk`
  - Middleware

#### C) Prevent reducer execution

- Redux does not support “cancel reducer execution” inside reducer
- Instead:
  - Add conditions inside reducer

```ts
if (!action.payload) return;
```

- Or handle logic at dispatch/thunk level

#### D) Combine multiple actions

- Not what `prepare` does
- Alternatives:

1. Dispatch multiple actions

```ts
dispatch(actionA());
dispatch(actionB());
```

1. Thunk orchestration

```ts
const complexFlow = () => (dispatch) => {
  dispatch(actionA());
  dispatch(actionB());
};
```

### 9 B

- co-location i.e. feature-based

### 10 B

```ts
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLogger)
});
```

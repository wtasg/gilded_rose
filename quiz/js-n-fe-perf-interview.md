# JavaScript & Frontend Performance Interview Questions

## 1. Promises & Async JavaScript

### 1. What is a Promise?

Explain:
- States of a Promise
- Lifecycle
- Why Promises were introduced over callbacks

---

### 2. Predict the output.

```javascript
console.log("A");

Promise.resolve().then(() => {
    console.log("B");
});

console.log("C");
```

Explain why.

---

### 3. Predict the output.

```javascript
console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

Promise.resolve().then(() => {
    console.log(3);
});

console.log(4);
```

Explain the execution order.

---

### 4. Predict the output.

```javascript
Promise.resolve()
    .then(() => {
        console.log(1);
        return Promise.resolve(2);
    })
    .then(console.log);

console.log(3);
```

Walk through the promise chain.

---

### 5. What happens here?

```javascript
Promise.resolve(1)
    .then((x) => {
        console.log(x);
        throw new Error("Oops");
    })
    .catch((err) => {
        console.log(err.message);
        return 42;
    })
    .then(console.log);
```

Explain error propagation.

---

### 6. Predict the output.

```javascript
async function foo() {
    return 10;
}

async function bar() {
    const value = await foo();
    console.log(value);
}

bar();
console.log("done");
```

Explain what `await` does internally.

---

### 7. Inside an `async` function, what is the difference between:

```javascript
return Promise.resolve(5);
```

and

```javascript
return 5;
```

---

### 8. Compare the following Promise APIs:

- `Promise.all`
- `Promise.allSettled`
- `Promise.any`
- `Promise.race`

Explain:
- Return values
- Failure behavior
- Common use cases

---

## 2. Event Loop & Task Scheduling

### 9. Explain the JavaScript Event Loop from memory.

Include:

- Call Stack
- Heap
- Web APIs
- Callback Queue
- Microtask Queue
- Rendering
- Event Loop

---

### 10. Compare the execution priority of:

- `queueMicrotask()`
- `Promise.then()`
- `setTimeout()`
- `requestAnimationFrame()`

Explain the scheduling order.

---

### 11. Predict the output.

```javascript
setTimeout(() => console.log("A"));

queueMicrotask(() => console.log("B"));

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Explain why.

---

### 12. Can a long chain of Promises block rendering?

Explain why or why not.

---

### 13. Why is this code dangerous?

```javascript
function forever() {
    Promise.resolve().then(forever);
}

forever();
```

What happens to the browser?

---

### 14. When does the browser repaint the screen?

Explain the rendering cycle.

---

## 3. Critical Rendering Path

### 15. Walk through everything that happens after entering:

```
https://example.com
```

until the first pixel appears on the screen.

---

### 16. Explain:

- DOM
- CSSOM
- Render Tree

How are they built and related?

---

### 17. Why does CSS block rendering?

Why doesn't JavaScript always block rendering?

---

### 18. Compare:

- Normal `<script>`
- `<script defer>`
- `<script async>`

Include:

- Download timing
- Execution timing
- HTML parsing behavior
- Execution order

---

### 19. What is the Critical Rendering Path?

How can it be optimized?

---

## 4. Bundle Optimization

### 20. Your React production bundle is **8 MB**.

How would you investigate and reduce it?

---

### 21. Explain the differences between:

- Tree Shaking
- Code Splitting
- Lazy Loading

---

### 22. When should you use dynamic imports?

```javascript
import("./Chart");
```

instead of

```javascript
import Chart from "./Chart";
```

---

### 23. How does `React.lazy()` work internally?

What role does `Suspense` play?

---

### 24. What does a bundler actually do?

Compare tools like:

- Webpack
- Vite
- Rollup
- esbuild

Explain their responsibilities.

---

## 5. Rendering Performance

### 25. Explain the difference between:

- Reflow (Layout)
- Repaint
- Composite

Which is the most expensive and why?

---

### 26. Name at least five operations that trigger layout (reflow).

How can unnecessary reflows be avoided?

---

### 27. A webpage stutters while scrolling.

How would you investigate and fix the issue?

Discuss browser developer tools, layout thrashing, long tasks, compositing, and animation best practices.

---

## 6. HTTP & Network Optimization

### 28. Compare HTTP/1.1 and HTTP/2.

Discuss:

- Persistent connections
- Pipelining
- Multiplexing
- Head-of-line blocking
- Header compression
- Server Push

---

### 29. A webpage loads:

- 300 images
- 20 CSS files
- 40 JavaScript files

How would you optimize its loading performance?

Discuss loading strategy, caching, compression, image optimization, resource prioritization, and network considerations.

---

### 30. A React application feels slow despite using:

- HTTP/2
- CDN
- Code Splitting
- Lazy Loading
- Browser Caching

Users still report poor performance.

How would you investigate?

Discuss:
- Core Web Vitals
- Performance profiling
- Network analysis
- JavaScript execution
- Rendering bottlenecks
- Bundle analysis
- CPU limitations
- Memory usage
- Performance budgets
- Monitoring tools

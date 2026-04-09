# Binary Data in JavaScript: ArrayBuffer, TypedArray, DataView & Buffer

## Theory

### ArrayBuffer

What it is: A fixed-size, raw binary data container representing a contiguous block of memory. It cannot be read or written directly; it requires a view (`TypedArray` or `DataView`).

Pros:

- Predictable memory layout, zero overhead per element
- Web API standard (Canvas, WebCrypto, WebSockets, WebAssembly)
- Safe memory boundaries (no pointer arithmetic)
- Can be transferred between threads without copying

Cons:

- Immutable size after allocation
- Cannot be directly inspected or mutated
- Requires auxiliary views for practical use

Alternatives & Use Cases:

- Use `Blob` or `File` for immutable, file-like binary data that may be streamed or downloaded.
- Use `SharedArrayBuffer` when cross-thread memory sharing is required.
- Ideal foundation for custom binary parsers, WASM memory, and network packet buffers.

---

### TypedArray (`Uint8Array`, `Float32Array`, etc.)

What it is: A homogeneous view over an `ArrayBuffer`. Enforces fixed element size/type, inherits most non-mutating `Array.prototype` methods, and uses the host platform's native endianness.

Pros:

- Extremely fast bulk operations & cache-friendly memory access
- Rich array-like API (`.map()`, `.reduce()`, `.forEach()`, `.filter()`, etc.)
- Direct mapping to WebGL/WebGPU buffers, audio processors, and SIMD
- Zero-copy slicing via `.subarray()`

Cons:

- Fixed element type and length
- Inherits platform endianness (problematic for cross-platform binary files/network)
- No mixed-type support in a single view
- Methods that change length (`.push()`, `.splice()`) are unavailable

Alternatives & Use Cases:

- Use standard `Array` for dynamic, sparse, or heterogeneous collections.
- Use `DataView` when explicit endianness or mixed types are required.
- Ideal for image pixels (`Uint8ClampedArray`), vertex buffers (`Float32Array`), audio samples, and WASM linear memory access.

---

### DataView

What it is: A low-level view over an `ArrayBuffer` that allows reading/writing mixed data types at arbitrary byte offsets with explicit endianness control per operation.

Pros:

- Full endianness control (`littleEndian` boolean parameter)
- Supports mixed types in a single buffer (e.g., `uint8` + `float32` + `int16`)
- No assumptions about alignment or homogeneous data
- Predictable cross-platform binary parsing

Cons:

- Verbose API (`getUint16()`, `setInt32()`, etc.)
- Slower for bulk operations compared to `TypedArray`
- Lacks array iteration/filtering methods
- Manual offset tracking required

Alternatives & Use Cases:

- Use `TypedArray` for homogeneous, performance-critical bulk data.
- Use `Struct`-like libraries or WebAssembly for complex binary layouts.
- Ideal for parsing network protocols (TCP/UDP headers), file formats (PNG, MP4, ZIP), and legacy binary APIs where byte order matters.

---

### Buffer (Node.js)

What it is: A Node.js-specific global that is a subclass of `Uint8Array` (since Node 6+). Extends typed array capabilities with encoding/decoding, hex/base64 conversion, stream integration, and filesystem/network utilities.

Pros:

- Rich, battle-tested API for string encodings (`utf8`, `ascii`, `hex`, `base64`, etc.)
- Seamless integration with Node streams, `fs`, `crypto`, `net`, and `http`
- Backwards compatible with legacy ecosystem
- Automatic pool allocation for small buffers

Cons:

- Node.js only; requires polyfills (`buffer` npm package) in browsers
- Slightly higher memory overhead due to pool allocation and legacy methods
- Global namespace pollution in older Node versions (deprecated in favor of explicit `require('buffer')` or modern `Uint8Array`)

Alternatives & Use Cases:

- In modern Node.js ≥ 18, prefer native `Uint8Array` + `TextEncoder`/`TextDecoder` + `Blob` for web-compatible code.
- Use `Buffer` when interacting with legacy Node modules, file I/O, or when you need `.toString('hex')` and `.from('base64')` convenience.
- Browser alternative: `Uint8Array` + `TextEncoder`/`TextDecoder` + `btoa()`/`atob()`.

---

### Decision Matrix: Which to Use?

| Requirement | Best Choice | Why |
| ------------- | ------------- | ----- |
| Raw memory foundation | `ArrayBuffer` | Cannot be resized; safe, low-level |
| Fast homogeneous array ops | `TypedArray` | Inherits `Array` methods, SIMD-friendly |
| Mixed types / explicit endianness | `DataView` | Per-operation byte order, flexible offsets |
| Node.js I/O, strings, streams | `Buffer` | Ecosystem integration, encoding helpers |
| Cross-thread memory sharing | `SharedArrayBuffer` + `Atomics` | Lock-free, worker-safe synchronization |
| Web-compatible string ↔ binary | `TextEncoder`/`TextDecoder` | Standard, fast, no Node dependency |

---

## Questions

### MCQ

1. Which structure is the foundational raw binary memory container in JavaScript?\
   A) `Buffer`\
   B) `ArrayBuffer`\
   C) `DataView`\
   D) `TypedArray`

2. Which API provides explicit endianness control per read/write operation?\
   A) `Uint32Array`\
   B) `Buffer`\
   C) `DataView`\
   D) `ArrayBuffer`

3. In modern Node.js, `Buffer` is technically a subclass of:\
   A) `Array`\
   B) `DataView`\
   C) `Uint8Array`\
   D) `SharedArrayBuffer`

4. When parsing a TCP packet containing `uint8`, `int16`, and `float32` fields, which view is most appropriate?\
   A) `Uint8Array`\
   B) `DataView`\
   C) `Buffer`\
   D) `Float32Array`
\
5. Which structure natively supports `.map()`, `.filter()`, and `.\reduce()`?\
   A) `ArrayBuffer`\
   B) `DataView`\
   C) `TypedArray`\
   D) `SharedArrayBuffer`

6. What is the modern web-standard replacement for `Buffer.from(str, \'utf8')` in browsers?\
   A) `new TextEncoder().encode(str)`\
   B) `btoa(str)`\
   C) `String.prototype.toBinary()`\
   D) `new DataView().setString(str)`

7. Which API is required alongside `SharedArrayBuffer` to prevent race conditions?\
   A) `Atomics`\
   B) `Worker.postMessage`\
   C) `MessageChannel`\
   D) `Blob`

8. What happens to an `ArrayBuffer` when it's transferred to a Web \Worker using `postMessage(buffer, [buffer])`?\
   A) It's deep-cloned\
   B) It's serialized to JSON\
   C) It becomes detached in the sender context\
   D) It throws a `SecurityError`
\
9. `DataView.getInt32(0, true)` reads a 32-bit integer using which byte order?\
   A) Big-endian\
   B) Little-endian\
   C) Host-native\
   D) Network byte order

10. Which structure is best suited for WebGL vertex position data?\
    A) `DataView`\
    B) `Buffer`\
    C) `Float32Array`\
    D) `Uint8Array`

### Detail Questions

1. Explain the architectural relationship between `ArrayBuffer`, `TypedArray`, and `DataView`.
2. Why can't you resize an `ArrayBuffer` after creation? What's the workaround?
3. Compare performance: `TypedArray.map()` vs `DataView` iteration for bulk numeric transformation.
4. What are the pros and cons of using `Buffer` vs `Uint8Array` + `TextEncoder` in Node.js?
5. When should you choose `DataView` over a `TypedArray` for file parsing?
6. How does endianness affect `TypedArray` vs `DataView` when reading cross-platform binary files?
7. What are the security and compatibility implications of `SharedArrayBuffer` in browsers?
8. Why doesn't `DataView` implement array iteration methods like `.forEach()` or `.map()`?
9. How do you safely extract a 10-byte chunk from a `Uint8Array` without copying memory?
10. What happens if you access a `TypedArray` whose underlying `ArrayBuffer` has been detached?
11. Explain the memory overhead difference between `Array[1000000]` and `Uint8Array(1000000)`.
12. How does `Buffer.alloc()` differ from `Buffer.allocUnsafe()`? When would you use each?
13. What is the modern cross-platform way to convert a `Uint8Array` to a hex string?
14. Can you mix `TypedArray` views of different `BYTES_PER_ELEMENT` over the same `ArrayBuffer`? What are the risks?
15. How does `Blob` differ from `ArrayBuffer` in terms of mutability and streaming?
16. Why does `new Uint8Array(buffer)` sometimes share memory and sometimes copy it?
17. What are the limitations of using `JSON.stringify()` on binary buffers?
18. How do `TextEncoder` and `TextDecoder` improve upon `Buffer`'s string encoding?
19. When parsing a binary format with optional/padded fields, why is `DataView` preferred?
20. How can you detect if the current runtime supports `SharedArrayBuffer` safely?

### Code Questions

1. Encode a UTF-8 string into an `ArrayBuffer` using modern Web APIs, then decode it back.
2. Parse a little-endian 32-bit float and a big-endian 16-bit unsigned integer from the same `ArrayBuffer` using `DataView`.
3. Create a `Buffer` from a hex string in Node, then convert it to a standard JavaScript `Array` of numbers.
4. Use `SharedArrayBuffer` and `Atomics` to safely increment a counter from two simulated concurrent threads.
5. Extract a 4-byte independent copy from a `Uint8Array` starting at offset 8.
6. Convert a `Float32Array` into a lowercase hex string representation.
7. Swap the byte order of a 32-bit integer read from a buffer (convert big-endian to little-endian) using bitwise operations.
8. Create a zero-copy `Uint16Array` view over an existing `ArrayBuffer` starting at byte offset 4, reading exactly 6 elements.
9. Safely transfer an `ArrayBuffer` to a simulated Web Worker, modify it in-place, and return it.
10. Read a `uint8`, `int16`, and `float32` sequentially from a single `ArrayBuffer` using `DataView` and return them as an object.

---

## Answers

### MCQ Answers

1. B - `ArrayBuffer` is the foundational raw memory container.
2. C - `DataView` allows explicit `littleEndian` boolean control.
3. C - Since Node 6, `Buffer` extends `Uint8Array`.
4. B - `DataView` handles mixed types and explicit endianness cleanly.
5. C - `TypedArray` inherits non-mutating `Array.prototype` methods.
6. A - `TextEncoder` is the modern standard for UTF-8 encoding.
7. A - `Atomics` provides lock-free synchronization primitives.
8. C - Transferable objects are moved (zero-copy), detaching the sender's reference.
9. B - `true` specifies little-endian.
10. C - WebGL expects `Float32Array` for vertex positions.

### Detail Answers

1. `ArrayBuffer` holds raw bytes. `TypedArray` and `DataView` are *views* that interpret those bytes. `TypedArray` assumes homogeneous types/platform endianness; `DataView` allows mixed types/explicit endianness.
2. Memory allocation must be contiguous and fixed for performance/security guarantees. Workaround: create a new larger buffer, copy data using `.set()`, or use `subarray()` to share.
3. `TypedArray.map()` is highly optimized (C++ engine level, SIMD-friendly). `DataView` requires manual offset tracking and method calls per element, making it 3-10x slower for bulk ops.
4. `Buffer` is convenient (`.toString('hex')`, pool allocation, stream integration) but Node-only and slightly heavier. `Uint8Array` + `TextEncoder` is standard, web-compatible, lighter, and future-proof.
5. When the binary layout contains mixed types, optional fields, padding, or strict cross-platform endianness requirements that violate `TypedArray` assumptions.
6. `TypedArray` uses host endianness (usually LE), causing silent corruption on BE systems/network data. `DataView` forces explicit endianness, ensuring predictable parsing everywhere.
7. Requires `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers. May be blocked in browsers for security reasons. Fallback: `Worker` message passing or `SharedArrayBuffer` polyfills via `WASM` shared memory.
8. `DataView` is a low-level cursor, not a collection. It operates on offsets, not indices. Array methods imply collection semantics (iteration, filtering) that don't align with offset-based byte reading.
9. Use `.subarray(10, 20)` or `.slice(10, 20)`. `subarray()` is zero-copy (shares buffer); `slice()` copies. Choose `subarray()` for performance, `slice()` for isolation.
10. Throws a `TypeError: Cannot perform %TypedArray% access on a detached buffer`. All property accesses (`.length`, `[0]`, `.buffer`) become invalid.
11. Standard `Array`: ~8-16 bytes per element + object overhead, sparse support, pointer chasing. `Uint8Array`: exactly 1 byte/element, contiguous, no boxing. ~90%+ memory savings for large datasets.
12. `alloc()` zeroes memory (safe, slightly slower). `allocUnsafe()` skips initialization (fast, may leak old memory). Use `allocUnsafe()` for temp buffers immediately overwritten by I/O/parsing.
13. `Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('')` or `buffer.reduce((str, b) => str + b.toString(16).padStart(2, '0'), '')`. Node `Buffer` has `.toString('hex')`, but `Uint8Array` doesn't.
14. Yes, views can overlap. Risk: misalignment causes incorrect reads/writes. Example: `Uint16Array` at odd offset reads cross-boundary bytes, yielding unexpected values. Always align to `BYTES_PER_ELEMENT` boundaries.
15. `ArrayBuffer` is mutable, in-memory, fixed-size. `Blob` is immutable, may be disk/stream-backed, resizable via slicing, and integrates with `URL.createObjectURL()` and fetch APIs.
16. `new Uint8Array(arrayBuffer)` shares the entire buffer (offset 0). `new Uint8Array(arrayBuffer, offset, length)` shares a slice. Passing a standard `Array` to the constructor *copies* data into a new buffer.
17. `JSON` only supports strings, numbers, booleans, arrays, objects, null. Binary data becomes corrupted, base64-encoded strings, or loses type precision. Use `ArrayBuffer` transfer or base64/hex serialization instead.
18. `TextEncoder`/`TextDecoder` are standardized, faster, stream-compatible, and don't depend on Node's global `Buffer`. They support encoding labels, error handling, and work identically in browsers and Node.
19. `DataView` lets you skip padding, read optional fields conditionally, and respect exact byte layouts without creating multiple aligned `TypedArray` views.
20. `typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined'`. Also check `crossOriginIsolated` if needed: `window.crossOriginIsolated`.

### Code Answers

```javascript
// 1. UTF-8 encode/decode using TextEncoder/TextDecoder
const encodeDecodeUTF8 = (str) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const buffer = encoder.encode(str).buffer; // ArrayBuffer
  const decoded = decoder.decode(new Uint8Array(buffer));
  return { buffer, decoded };
};

// 2. Parse mixed types with DataView
const parseMixedData = (buffer) => {
  const view = new DataView(buffer);
  const floatLE = view.getFloat32(0, true);   // LE
  const uint16BE = view.getUint16(4, false);  // BE
  return { floatLE, uint16BE };
};

// 3. Buffer from hex to standard Array (Node)
const hexBufferToArray = (hex) => {
  const buf = Buffer.from(hex, 'hex');
  return Array.from(buf); // or [...buf]
};

// 4. SharedArrayBuffer + Atomics counter
const atomicCounterExample = () => {
  const sab = new SharedArrayBuffer(4);
  const counter = new Int32Array(sab);
  Atomics.add(counter, 0, 1); // Thread A
  Atomics.add(counter, 0, 1); // Thread B
  return Atomics.load(counter, 0); // Returns 2 safely
};

// 5. Extract independent 4-byte copy from Uint8Array
const extractChunk = (arr, start) => {
  // .slice() creates a new ArrayBuffer + copy
  return arr.slice(start, start + 4);
};

// 6. Float32Array to hex string
const float32ToHex = (arr) => {
  return Array.from(new Uint8Array(arr.buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// 7. Swap 32-bit endianness (BE ↔ LE)
const swap32 = (num) =>
  ((num & 0xff) << 24) |
  ((num & 0xff00) << 8) |
  ((num & 0xff0000) >> 8) |
  ((num >>> 24) & 0xff);

// 8. Zero-copy Uint16Array at offset 4, length 6
const createAlignedView = (buffer) => {
  // 4 is divisible by Uint16.BYTES_PER_ELEMENT (2), so it's aligned
  return new Uint16Array(buffer, 4, 6);
};

// 9. Transfer ArrayBuffer to Worker (simulated)
const transferBuffer = (buffer) => {
  // In real code: worker.postMessage(buffer, [buffer]);
  // Simulated return of modified buffer
  const arr = new Uint8Array(buffer);
  arr[0] ^= 0xFF;
  return buffer; // Already modified in-place
};

// 10. Read uint8, int16, float32 sequentially with DataView
const readSequential = (buffer) => {
  const view = new DataView(buffer);
  let offset = 0;
  const u8 = view.getUint8(offset); offset += 1;
  const i16 = view.getInt16(offset, true); offset += 2;
  const f32 = view.getFloat32(offset, true);
  return { u8, i16, f32 };
};
```

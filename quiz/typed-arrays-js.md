# Typed Arrays

## Theory

### Core Concepts & Architecture

JavaScript `ArrayBuffer` is a low-level, fixed-size binary data container. It cannot be directly accessed or mutated. `TypedArray` constructors (e.g., `Uint8Array`, `Float32Array`, `BigUint64Array`) create views over an `ArrayBuffer`, interpreting its raw bytes as a sequence of fixed-size, homogeneous numbers. `DataView` provides an alternative view that allows mixed-type reads/writes with explicit endianness control.

### Memory & Type Enforcement

Unlike standard `Array`s, Typed Arrays store raw machine-level primitives in contiguous memory. They enforce strict element sizes, disallow sparse indices, and skip JavaScript object boxing. This eliminates pointer chasing, yields predictable memory footprints, and improves CPU cache locality, making them ideal for performance-critical workloads.

### Type Conversion & Boundary Behavior

Assigning values to a Typed Array triggers automatic conversion via ECMAScript abstract operations:

- Standard Unsigned/Int Arrays: Out-of-range values wrap using modulo arithmetic (e.g., `Uint8Array` uses `value & 0xFF`). `-1` → `255`, `300` → `44`.
- Clamped Arrays: `Uint8ClampedArray` clamps values to `[0, 255]`. `<0` → `0`, `>255` → `255`. Ideal for pixel/color data.
- Floats: Truncated toward zero (e.g., `3.9` → `3`, `-2.7` → `-2`).
- `NaN` and `Infinity` always convert to `0` (or clamped bounds).

### Methods & Inheritance

Typed Arrays inherit a curated subset of `Array.prototype` methods that do not change length: `map`, `filter`, `reduce`, `forEach`, `slice`, `find`, `every`, `some`, `includes`, etc. Mutating methods like `push`, `pop`, `shift`, `unshift`, and `splice` are explicitly absent because the underlying buffer size is immutable. Typed Arrays also provide `.set()` (bulk copy) and `.subarray()` (zero-copy view).

### Endianness & Data Interop

Typed Arrays adopt the host platform's native endianness (overwhelmingly little-endian in browsers/Node). This is invisible for most use cases but breaks when parsing network protocols or cross-platform binary files. `DataView` solves this by letting developers specify endianness per operation (`getInt32(offset, littleEndian)`).

### Performance & Ecosystem Use Cases

Typed Arrays excel in high-throughput, memory-sensitive environments: `ImageData.data` manipulation, WebSocket/protobuf/flatbuffers parsing, WebGL/WebGPU buffer uploads, WebAssembly linear memory, and Web Audio API processing. Their predictable layout enables zero-copy transfers, SIMD vectorization, and native hardware mapping.

---

## Questions

### MCQ

1. What is the primary role of an `ArrayBuffer` in JavaScript?\
   A) To store dynamic JavaScript objects\
   B) To act as a raw, fixed-size binary data container\
   C) To automatically handle endianness conversion\
   D) To provide array manipulation methods like `push()`

2. Which Typed Array is specifically optimized for image pixel data?\
   A) `Uint16Array`\
   B) `Float32Array`\
   C) `Uint8ClampedArray`\
   D) `Int32Array`

3. What happens when you assign `300` to an index in `new Uint8Array(1)`?\
   A) Throws `RangeError`\
   B) Stores `300` exactly\
   C) Stores `44` (wraps via modulo 256)\
   D) Stores `255` (clamped)

4. Which method is NOT available on Typed Arrays?\
   A) `.map()`\
   B) `.splice()`\
   C) `.find()`\
   D) `.reduce()`

5. What is the key difference between `.subarray()` and `.slice()` on a Typed Array?\
   A) `.subarray()` copies data; `.slice()` shares memory\
   B) `.subarray()` returns a zero-copy view; `.slice()` returns a full copy\
   C) `.subarray()` works only on `ArrayBuffer`; `.slice()` works on views\
   D) There is no difference

6. How does JavaScript handle system endianness for standard Typed  Arrays?\
   A) Always forces big-endian\
   B) Always forces little-endian\
   C) Inherits the host platform's native endianness\
   D) Randomizes endianness per allocation

7. Which parameter signature correctly creates a view over an existing buffer starting at byte 8?\
   A) `new Uint8Array(buffer, 8)`\
   B) `new Uint8Array(8, buffer)`\
   C) `new Uint8Array({ buffer: buffer, offset: 8 })`\
   D) `Uint8Array.view(buffer, 8)`

8. What is the `.byteLength` of `new Uint32Array(4)`?\
   A) 4 bytes\
   B) 8 bytes\
   C) 16 bytes\
   D) 32 bytes

9. Which operation correctly and efficiently converts a `Float64Array` to a standard `Array`?\
   A) `Array.prototype.push.apply([], fa)`\
   B) `fa.toArray()`\
   C) `Array.from(fa)`\
   D) `JSON.parse(JSON.stringify(fa))`

10. What value results from assigning `NaN` to a `Uint8Array`?\
    A) `NaN`\
    B) `0`\
    C) `255`\
    D) `-1`

### Detail Questions

1. What is the fundamental difference between a standard JavaScript `Array` and a Typed Array like `Uint8Array` regarding memory storage and element types?
2. If you create `new Uint8Array(4)` vs `new Uint32Array(4)`, how many bytes does each underlying `ArrayBuffer` consume, and why?
3. What happens when you assign `-5` or `300` to an index in a `Uint8Array`? How does this differ from `Uint8ClampedArray`?
4. Explain how `ArrayBuffer`, Typed Arrays, and `DataView` relate. When would you explicitly choose a `DataView` over a Typed Array?
5. How does system endianness affect reading/writing multi-byte Typed Arrays like `Uint32Array`? Does JS abstract this, or must you handle it manually?
6. Which standard `Array.prototype` methods are available on Typed Arrays, and which are explicitly missing? Why?
7. What is the key difference between `.subarray()` and `.slice()` on a Typed Array in terms of memory allocation and data sharing?
8. If you pass `[3.7, 4.2, -1.5]` to `new Uint8Array()`, what values result and why?
9. Name two real-world scenarios where Typed Arrays significantly outperform standard arrays, and explain why.
10. What is the most efficient way to convert a `Uint32Array` back to a standard `Array`? What trade-offs should you consider?
11. What does the `.byteOffset` property indicate, and how is it useful when working with overlapping views?
12. How does the `.set()` method differ from assigning values via a loop? What happens if the source and target overlap?
13. Explain how `SharedArrayBuffer` changes Typed Array usage in multi-threaded JavaScript environments.
14. When should you use `BigInt64Array` or `BigUint64Array` instead of `Number`-based Typed Arrays?
15. Can you directly copy a `Uint16Array` into a `Uint32Array` using `.set()`? What happens to the byte alignment and values?
16. What happens to a Typed Array view if its underlying `ArrayBuffer` is detached (e.g., transferred to a Web Worker)?
17. How does `.sort()` behave differently on Typed Arrays compared to standard `Array`s?
18. Does `TypedArray.prototype.find()` return the index or the value? How does this compare to `.findIndex()`?
19. What is the performance impact of using `Array.from(typedArray)` vs iterating with a `for` loop on large buffers?
20. How do Typed Arrays interact with WebAssembly linear memory, and why is `.buffer` property access common in WASM interop?

### Code Questions

1. Create a zero-copy view of the second half of a given `Uint32Array`.
2. Clamp an array of arbitrary integers `[-10, 150, 300, -50]` to the `[0, 255]` range using a Typed Array constructor.
3. Parse a 4-byte big-endian signed integer from an `ArrayBuffer` at offset `0` using `DataView`.
4. Convert an array of hex strings `['0xFF', '0x00', '0x7F']` into a `Uint8Array`.
5. Swap the first and last bytes of a `Uint8Array` in-place without creating new arrays.
6. Fill a `Float32Array` of length 100 with random values between `-1.0` and `1.0`.
7. Write a function that returns `true` if a given `TypedArray` contains the value `0`, using a built-in method.
8. Copy all elements from a `Uint16Array` into an existing `Uint32Array` starting at index 0, preserving numerical values.
9. Reverse a `Uint8Array` in-place using a standard `for` loop.
10. Calculate the sum of all elements in an `Int8Array` using `.reduce()`, handling potential overflow by returning a `Number`.

---

## Answers

### MCQ Answers

1. B - `ArrayBuffer` is the raw binary container; views interpret it.
2. C - `Uint8ClampedArray` automatically clamps to `[0,255]`, matching RGBA pixel ranges.
3. C - `300 % 256 = 44`. Unsigned arrays wrap.
4. B - `splice` changes array length; Typed Arrays have fixed sizes.
5. B - `subarray` returns a new view over the same buffer (zero-copy). `slice` allocates a new buffer and copies data.
6. C - Inherits host endianness (usually little-endian).
7. A - Constructor signature: `new TypedArray(buffer, byteOffset?, length?)`.
8. C - `4 elements × 4 bytes/element = 16 bytes`.
9. C - `Array.from()` or spread `[...]` efficiently copies to a standard array.
10. B - `NaN` converts to `0` in all Typed Arrays per spec.

### Detail Answers

1. Standard arrays store boxed objects, allow sparse indices, and dynamically resize. Typed Arrays store raw primitives in contiguous memory, enforce fixed sizes/types, and disallow sparsity.
2. `Uint8Array(4)` = 4 bytes. `Uint32Array(4)` = 16 bytes. Each element size is fixed (1B vs 4B), so `byteLength = length × BYTES_PER_ELEMENT`.
3. `Uint8Array` wraps: `-5 → 251`, `300 → 44`. `Uint8ClampedArray` clamps: `<0 → 0`, `>255 → 255`.
4. `ArrayBuffer` = raw memory. Typed Arrays = homogeneous, platform-endian views. `DataView` = mixed-type, explicit endianness control. Use `DataView` for network protocols or mixed binary layouts.
5. Typed Arrays use platform endianness automatically. You don't handle it manually unless parsing cross-platform data, in which case `DataView` is preferred.
6. Available: `map`, `filter`, `reduce`, `forEach`, `slice`, `find`, `every`, `some`, `includes`, `sort`, etc. Missing: `push`, `pop`, `shift`, `unshift`, `splice` (length is fixed).
7. `subarray()` shares the same underlying buffer (zero-copy, changes reflect in original). `slice()` allocates a new buffer and copies data (independent).
8. `[3, 4, 255]`. Floats truncate toward zero (`-1.5 → -1`). Out-of-range wraps: `-1 & 0xFF = 255`.
9. Canvas `ImageData` manipulation (pixel-level access), WebAssembly/WASM memory sharing (zero-copy interop), WebSocket/binary protocol parsing (predictable memory layout, SIMD-friendly).
10. `Array.from(arr)` or `[...arr]`. Trade-off: Duplicates data in JS heap (2× memory temporarily), loses fixed-size guarantee, but unlocks dynamic array methods.
11. `.byteOffset` shows the starting byte position of the view within its `ArrayBuffer`. Essential when slicing or sharing buffers to track alignment.
12. `.set()` is a native bulk copy, highly optimized. If ranges overlap, the spec guarantees it behaves as if a temporary copy is made (no partial overwrites).
13. `SharedArrayBuffer` allows multiple threads (Web Workers) to share the same memory. Typed Arrays over it require `Atomics` for safe concurrent access.
14. When dealing with 64-bit integers exceeding `Number.MAX_SAFE_INTEGER` (e.g., cryptographic hashes, large timestamps, file offsets).
15. Yes, `.set()` accepts any iterable or array-like. Values are converted numerically. Byte alignment isn't preserved; values are simply copied element-by-element and converted to target type.
16. The view becomes detached. Accessing `.length` or any index throws a `TypeError`.
17. Typed Array `.sort()` sorts numerically by default. Standard `Array.sort()` converts elements to strings and sorts lexicographically unless a compare function is provided.
18. `.find()` returns the value (or `undefined`). `.findIndex()` returns the index (or `-1`).
19. `Array.from()` allocates a new JS array and iterates in C++ engine code (fast but memory-heavy). `for` loop avoids allocation but runs in JS bytecode. Choose based on memory vs CPU constraints.
20. WASM exposes its linear memory as an `ArrayBuffer`. Typed Arrays (usually `Uint8Array`) view it for direct read/write without copying. `.buffer` is accessed to share memory across JS/WASM boundaries.

### Code Answers

```javascript
// 1. Zero-copy view of second half
const viewSecondHalf = (arr) => arr.subarray(Math.floor(arr.length / 2));

// 2. Clamp arbitrary integers to [0, 255]
const clamped = new Uint8ClampedArray([-10, 150, 300, -50]);
// Result: Uint8ClampedArray [0, 150, 255, 0]

// 3. Parse 4-byte big-endian signed int
const parseBigEndianInt32 = (buffer) => {
  return new DataView(buffer).getInt32(0, false); // false = big-endian
};

// 4. Hex strings to Uint8Array
const hexToUint8 = (hexArr) => Uint8Array.from(hexArr, h => parseInt(h, 16));

// 5. Swap first and last bytes in-place
const swapEnds = (arr) => {
  if (arr.length < 2) return arr;
  const temp = arr[0];
  arr[0] = arr[arr.length - 1];
  arr[arr.length - 1] = temp;
  return arr;
};

// 6. Fill Float32Array with random [-1.0, 1.0]
const fillRandomFloat32 = () => {
  const arr = new Float32Array(100);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.random() * 2 - 1;
  }
  return arr;
};

// 7. Check if TypedArray contains 0
const hasZero = (arr) => arr.includes(0);

// 8. Copy Uint16Array to Uint32Array (value preservation)
const copyUint16To32 = (src, target) => {
  target.set(src); // Converts each element numerically to 32-bit unsigned
  return target;
};

// 9. Reverse Uint8Array in-place
const reverseInPlace = (arr) => {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++; right--;
  }
  return arr;
};

// 10. Sum Int8Array using reduce (handles overflow via JS Number)
const sumInt8 = (arr) => arr.reduce((acc, val) => acc + val, 0);
```

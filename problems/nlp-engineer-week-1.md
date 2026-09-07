# Week 1 Question Set

21 questions covering theory and Python/NumPy implementation for Scientific Python & Tensor Foundations.

## Theory

### 1. Scalars, vectors, matrices, tensors

Explain the difference between a scalar, vector, matrix, and higher-order tensor. Give one NLP/ML example of each and state its typical shape.

### 2. Shape and axes

Given a tensor with shape `(32, 128, 768)`, explain what each axis could represent in a language-model workload. Why is the shape alone insufficient to tell you the semantic meaning of an axis?

### 3. Vector as an object

A vector can be viewed as an ordered tuple of numbers, a point/direction, or an element of a vector space. Explain why these descriptions are compatible rather than contradictory.

### 4. Matrix multiplication

For A ∈ ℝ^(m×n) and x ∈ ℝ^n, explain why Ax is defined and has shape m. Interpret Ax as a linear transformation rather than merely a numerical operation.

### 5. Matrix–matrix multiplication

Let A have shape `(m, n)` and B have shape `(n, p)`. Derive the shape of AB and explain what the shared dimension n represents computationally.

### 6. Broadcasting

State NumPy's broadcasting rule in your own words. For each pair below, determine whether addition is valid and give the resulting shape if it is:

- `(3, 4)` + `(4,)`
- `(8, 3, 4)` + `(4,)`
- `(8, 3, 4)` + `(3, 1)`
- `(8, 3, 4)` + `(2, 4)`

### 7. Elementwise multiplication vs matrix multiplication

Explain the difference between elementwise multiplication and matrix multiplication. Give a concrete example where confusing the two would produce a plausible-looking but mathematically incorrect result.

### 8. Reshape, transpose, and semantic axes

Explain the difference between `reshape` and `transpose`. Why can a reshape preserve the number of elements while still destroying the intended semantic interpretation of a tensor?

### 9. Views, copies, and memory layout

What is the difference between a NumPy view and a copy? Why can slicing or transposing produce a non-contiguous array, and why might that matter for performance?

### 10. dtype and numerical precision

Compare `float32` and `float64` for ML workloads. Discuss memory usage, precision, and situations where using a lower-precision dtype can become numerically problematic.

### 11. Numerical stability

Why is the naive softmax implementation

`exp(x) / sum(exp(x))`

numerically unsafe for large positive values? Derive the stable form using `x - max(x)` and explain why subtracting the same constant does not change the final probabilities.

## Python / NumPy

### 12. Shape inspection

Write a NumPy function `describe(x)` that prints:

- shape
- number of dimensions
- number of elements
- dtype
- whether the array is C-contiguous

Do not use any third-party library other than NumPy.

### 13. Tensor shape transformations

Starting with:

```python
x = np.zeros((8, 16, 32))
```

Write code that produces each of the following shapes without changing the number of elements:

- `(8, 512)`
- `(16, 8, 32)`
- `(1, 8, 16, 32)`
- `(8, 16, 32, 1)`

For each operation, state whether you used `reshape`, `transpose`, `expand_dims`, or another operation, and why.

### 14. Broadcasting exercise

Given:

```python
x = np.zeros((32, 128, 768))
b = np.zeros((768,))
```

Write the expression that adds `b` to every token embedding in `x`. Then write a second example that adds one value per token position using a tensor of shape `(128,)`.

### 15. Matrix multiplication

Create:

```python
A = np.arange(12).reshape(3, 4)
x = np.array([1, 2, 3, 4])
```

Compute `Ax` using NumPy. Then verify the result manually with the definition of matrix multiplication using a short Python loop.

### 16. Batch linear transformation

Let:

```python
X = np.random.randn(32, 128)
W = np.random.randn(128, 64)
b = np.random.randn(64)
```

Write a vectorized NumPy expression for the affine transformation `Y = XW + b`. State the shape of `Y` and explain why broadcasting works for `b`.

### 17. Vectorized vs loop implementation

Generate one million random floating-point values and compute their square plus one in two ways:

1. a Python loop
2. a NumPy vectorized expression

Measure the runtime of both approaches. Report the speed difference and explain why NumPy can be substantially faster.

### 18. Stable softmax

Implement a function:

```python
softmax(x: np.ndarray) -> np.ndarray
```

that computes softmax along the last axis and remains numerically stable for inputs such as:

```python
np.array([1000.0, 1001.0, 1002.0])
```

Verify that the output sums to approximately 1.

### 19. Cross-entropy

Implement categorical cross-entropy for a probability distribution `p` and a target class index `y` without calling a machine-learning library.

Your function should:

- accept a 1-D probability vector
- avoid `log(0)`
- return a scalar loss
- raise an appropriate error for invalid target indices

### 20. Numerical linear algebra sanity checks

Write a small test program that verifies:

- `(A @ x).shape` is correct for compatible matrices/vectors
- `A @ (B @ x)` and `(A @ B) @ x` are numerically close
- `x @ y` equals `np.dot(x, y)` for 1-D vectors

Use `np.allclose` rather than exact floating-point equality.

### 21. Tensor-shape debugging problem

The following code fails or produces an unintended result:

```python
X = np.random.randn(32, 128, 768)
W = np.random.randn(768, 256)
b = np.random.randn(128)

Y = X @ W + b
```

Diagnose the problem without executing the code first.

Then:

1. state the shape of `X @ W`
2. explain why adding `b` is invalid or semantically wrong
3. provide a corrected version for a per-feature bias
4. provide a corrected version for a per-position bias

End by writing the shape of every intermediate tensor.

## Completion standard

For every question, the expected standard is:

- explain the concept without notes;
- write or modify the code rather than merely reading it;
- run the code and inspect the result;
- record unexpected behavior or failures;
- commit the completed work to Git.

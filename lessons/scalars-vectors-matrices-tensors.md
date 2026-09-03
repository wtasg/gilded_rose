# Mathematical Reference: Scalars, Vectors, Matrices, and Tensors


| Term | Order (Axes) | Mathematical Notation | Description | Concrete Example |
| :--- | :--- | :--- | :--- | :--- |
| **Scalar** | 0 | $s \in \mathbb{R}$ | A single scalar value with no axes. | A loss value: $0.42$ |
| **Vector** | 1 | $\mathbf{v} \in \mathbb{R}^n$ | A 1D coordinate representation of a vector. | Feature vector: $[1.2,-0.5,3.1]$ |
| **Matrix** | 2 | $M \in \mathbb{R}^{m \times n}$ | A 2D coordinate array arranged in rows and columns. | Weight matrix: $\begin{bmatrix}1&2\\3&4\end{bmatrix}$ |
| **Tensor** | $N$ | $\mathcal{X} \in \mathbb{R}^{d_1 \times \cdots \times d_N}$ | An $N$-way coordinate array representing a tensor in a chosen basis. | Image batch: $(32,3,224,224)$ |

## 1. Scalars (Order-0 Tensors)

A scalar $s \in F$ is an element of a scalar field $F$ (typically the real field $\mathbb{R}$ or complex field $\mathbb{C}$).

* **Definition:** Elements of $F$ satisfying the standard field axioms (associativity, commutativity, distributivity, identities $0$ and $1$, additive and multiplicative inverses).
* **Interpretation:** Context-dependent; commonly represents magnitude, complex amplitude, or temperature (e.g., phase angle is a specific interpretation in suitable applications).
* **Algebraic Role:** Serves as the scaling domain for vector spaces:

$$s \cdot \vec{v} \in V \quad \text{for } s \in F, \; \vec{v} \in V$$



---

## 2. Vectors (Order-1 Tensors)

An abstract vector $\vec{x}$ is an element of a vector space $V$. Once a basis is chosen, it is represented as an ordered $n$-tuple of scalars from field $F$.

Coordinate representation: $\vec{x} \in F^n$, conventionally written as a column vector $\vec{x} \cong [x_1, x_2, \dots, x_n]^T \in F^{n \times 1}$.

### a. Vector Space Axioms $(V, +, \cdot)$ over Field $F$

* **Vector Addition Closure ($+$):** $\vec{u}, \vec{v} \in V \implies \vec{u} + \vec{v} \in V$
* Commutativity: $\vec{u} + \vec{v} = \vec{v} + \vec{u}$
* Associativity: $\vec{u} + (\vec{v} + \vec{w}) = (\vec{u} + \vec{v}) + \vec{w}$
* Additive Identity: $\vec{v} + \vec{0} = \vec{v}$
* Additive Inverse: $\vec{v} + (-\vec{v}) = \vec{0}$


* **Scalar Multiplication Closure ($\cdot$):** $c \in F, \vec{v} \in V \implies c\vec{v} \in V$
* Distributivity over vector addition: $c(\vec{u} + \vec{v}) = c\vec{u} + c\vec{v}$
* Distributivity over scalar addition: $(c + d)\vec{v} = c\vec{v} + d\vec{v}$
* Compatibility: $c(d\vec{v}) = (cd)\vec{v}$
* Multiplicative Identity: $1\vec{v} = \vec{v}$ (for $1 \in F$)



### b. Products and Operations on Vectors

* **Standard Inner Product:**
* Real ($\mathbb{R}^n$): $\langle \vec{u}, \vec{v} \rangle = \vec{u}^T \vec{v} = \sum_{i=1}^n u_i v_i \in \mathbb{R}$ *(Often called the dot product in this real case)*.
* Complex ($\mathbb{C}^n$): $\langle \vec{u}, \vec{v} \rangle = \vec{u}^* \vec{v} = \sum_{i=1}^n \overline{u_i} v_i \in \mathbb{C}$


* **Outer Product:** Maps two vectors to a rank-1 matrix (rank is 0 if either vector is $\vec{0}$):

$$\vec{u} \in F^m, \vec{v} \in F^n \implies \vec{u}\vec{v}^T \in F^{m \times n}, \quad (\vec{u}\vec{v}^T)_{ij} = u_i v_j$$


* **Hadamard Product ($\odot$):** Element-wise product yielding a vector:

$$\vec{u}, \vec{v} \in F^n \implies \vec{u} \odot \vec{v} \in F^n, \quad (\vec{u} \odot \vec{v})_i = u_i v_i$$


* **Cross Product ($\times$):** A binary operation strictly dependent on the Euclidean metric and orientation, mapping $\mathbb{R}^3 \times \mathbb{R}^3 \to \mathbb{R}^3$:

$$\vec{u} \times \vec{v} = -(\vec{v} \times \vec{u}), \quad \langle \vec{u} \times \vec{v}, \vec{u} \rangle = 0, \quad \langle \vec{u} \times \vec{v}, \vec{v} \rangle = 0$$



### c. Norms & Induced Metrics (on $V = \mathbb{R}^n$ or $\mathbb{C}^n$)

A valid norm $\Vert{}\cdot\Vert{}: V \to [0, \infty)$ induces a metric $d(u,v) = \Vert{}u - v\Vert{}$ and satisfies:

1. **Definiteness:** $\Vert{}\vec{v}\Vert{} \ge 0$, and $\Vert{}\vec{v}\Vert{} = 0 \iff \vec{v} = \vec{0}$
2. **Absolute Homogeneity:** $\Vert{}c\vec{v}\Vert{} = \vert{}c\vert{}\Vert{}\vec{v}\Vert{}$ for $c \in F$
3. **Triangle Inequality:** $\Vert{}\vec{u} + \vec{v}\Vert{} \le \Vert{}\vec{u}\Vert{} + \Vert{}\vec{v}\Vert{}$

* **$L_1$ Norm (Manhattan):** $\Vert{}\vec{x}\Vert{}_1 = \sum_{i=1}^n \vert{}x_i\vert{}$ *(In optimization and regularization contexts, $L_1$ often promotes sparsity).*
* **$L_2$ Norm (Euclidean):** $\Vert{}\vec{x}\Vert{}_2 = \sqrt{\langle \vec{x}, \vec{x} \rangle} = \sqrt{\sum_{i=1}^n \vert{}x_i\vert{}^2}$
* **$L_\infty$ Norm (Chebyshev / Max):** $\Vert{}\vec{x}\Vert{}_\infty = \max_{i} \vert{}x_i\vert{}$

---

## 3. Matrices (Order-2 Tensors)

A matrix $A \in F^{m \times n}$ is a 2D rectangular array of scalars. Once bases are chosen for vector spaces $V$ and $W$, the matrix represents a linear transformation $T: F^n \to F^m$ defined by $\vec{x} \mapsto A\vec{x}$.

### a. Matrix-Vector Operations

* **Matrix-Vector Product:** Linear combination of matrix columns $\vec{a}_j$:

$$A\vec{x} = \sum_{j=1}^n x_j \vec{a}_j = \vec{b} \in F^m$$


* **Row-Vector Product:** Given a $1 \times m$ row vector $\vec{y}^T$, the product is a linear combination of matrix rows $\vec{a}_{i, :}^T$:

$$\vec{y}^T A = \sum_{i=1}^m y_i \vec{a}_{i, :}^T \in F^{1 \times n}$$


* **Eigenvalues & Eigenvectors:** For square $A \in F^{n \times n}$, a non-zero $\vec{v} \neq \vec{0}$ and scalar $\lambda \in F$ (if the eigenvalue exists in field $F$) satisfying $A\vec{v} = \lambda\vec{v}$.

### b. Matrix Multiplication

Defined when inner dimensions match: $A_{m \times k} B_{k \times n} = C_{m \times n}$.

* **Associative:** $A(BC) = (AB)C$
* **Distributive:** $A(B + C) = AB + AC$
* **Multiplicative Identity:** For $A \in F^{m \times n}$, $I_m A = A I_n = A$
* **Non-commutative:** $AB \neq BA$ in general

### c. Transpose, Adjoint, and Inverses

* **Transpose:** $(A^T)_{ij} = a_{ji}$ (reflection across main diagonal; maps $F^{m \times n} \to F^{n \times m}$)
* **Conjugate Transpose (Hermitian Adjoint):** $A^* = \overline{A}^T$
* **Matrix Inverse:** Defined exclusively for square matrices ($A \in F^{n \times n}$) with rank $n$:

$$A A^{-1} = A^{-1} A = I_n$$


* Product Inverse: $(AB)^{-1} = B^{-1} A^{-1}$



### d. Structural Matrix Classifications

* **Symmetric:** $A = A^T$ (Hermitian over $\mathbb{C}$: $A = A^*$)
* **Orthogonal:** Defined by $A^T A = I$, which implies $A A^T = I$ for square matrices over $\mathbb{R}$.
* **Unitary:** $A^* A = I \implies A A^* = I$ (over $\mathbb{C}$).

---

## 4. Tensors

An abstract tensor is a multilinear map $\mathcal{T}: V_1^* \times \dots \times V_p^* \times W_1 \times \dots \times W_q \to F$.

Upon choosing bases for these vector spaces, the tensor is represented as an $N$-way coordinate array $\mathcal{X} \in F^{d_1 \times d_2 \times \dots \times d_N}$.

**Crucial Distinction: Order vs. Rank**

* **Order (or Mode/Way):** The number of index axes $N$ in the array representation. (e.g., a matrix is an order-2 tensor; a 3-way array is an order-3 tensor).
* **Tensor Rank:** The minimal number of rank-1 tensors needed to express the tensor as a sum.

### a. Fundamental Tensor Array Operations

* **Tensor Outer Product ($\otimes$):**
Given $\mathcal{A} \in F^{I_1 \times \dots \times I_M}$ and $\mathcal{B} \in F^{J_1 \times \dots \times J_N}$, the product has entries:

$$(\mathcal{A} \otimes \mathcal{B})_{i_1 \dots i_M j_1 \dots j_N} = a_{i_1 \dots i_M} b_{j_1 \dots j_N}$$


* **Tensor Contraction:**
Summing over specific shared indices across modes. In Einstein notation, valid repeated indices conventionally indicate this contraction (e.g., $C_{i k} = A_{i j} B_{j k}$).
* **Mode-$n$ Product ($\times_n$):**
Multiplication of tensor $\mathcal{X} \in F^{I_1 \times \dots \times I_N}$ by a compatible matrix $U$ along mode $n$:
* Composition on the same mode is defined by matrix multiplication, subject to standard dimensional compatibility:

$$\mathcal{X} \times_n A \times_n B = \mathcal{X} \times_n (BA)$$

### b. Canonical Tensor Decompositions

* **CP Decomposition (CANDECOMP / PARAFAC):**
Factorizes tensor $\mathcal{X}$ into a sum of $R$ rank-1 components. If $R$ is the minimal integer for which exact equality holds, $R$ is the **tensor rank**:

$$\mathcal{X} = \sum_{r=1}^R \lambda_r \left( \vec{a}_r^{(1)} \otimes \vec{a}_r^{(2)} \otimes \dots \otimes \vec{a}_r^{(N)} \right)$$


* **Tucker Decomposition:**
Expresses tensor $\mathcal{X}$ via a dense core tensor $\mathcal{G}$ multiplied by factor matrices along each mode (e.g., HOSVD commonly uses orthonormal factors, though general Tucker factors need not be orthogonal):

$$\mathcal{X} = \mathcal{G} \times_1 U^{(1)} \times_2 U^{(2)} \dots \times_N U^{(N)}$$


* **Tensor Train (TT) / Matrix Product State (MPS):**
Decomposes an order-$N$ tensor into a contracted linear chain of order-3 core tensors. TT can represent a tensor exactly, and can mitigate exponential storage growth when TT-ranks remain small:

$$\mathcal{X}_{i_1 i_2 \dots i_N} = G_1[i_1] \, G_2[i_2] \dots G_N[i_N]$$

---

## Code

```python
import numpy as np

# 
# 1. SCALAR
# 

# A scalar is a single value.
s = 3.14

print(s)
print(type(s))

# NumPy scalar
s = np.float32(3.14)

print(s)
print(type(s))


# 
# 2. VECTOR
# 

# A vector is a 1-dimensional array of scalars.
x = np.array([1.0, 2.0, 3.0])

print(x)
print(x.shape)       # (3,)
print(x.ndim)        # 1
print(x.dtype)       # float64

# Elements
print(x[0])          # 1.0
print(x[1])          # 2.0

# Vector operations
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)         # [5 7 9]
print(a - b)         # [-3 -3 -3]
print(2 * a)         # [2 4 6]

# Element-wise multiplication
print(a * b)         # [4 10 18]

# Dot product
print(np.dot(a, b))  # 32

# Preferred modern syntax
print(a @ b)         # 32


# 
# 3. VECTOR NORMS
# 

x = np.array([3.0, 4.0])

# Euclidean / L2 norm
print(np.linalg.norm(x))  # 5.0

# Squared L2 norm
print(x @ x)              # 25.0

# Unit vector
unit_x = x / np.linalg.norm(x)

print(unit_x)
print(np.linalg.norm(unit_x))  # 1.0


# 
# 4. COLUMN VECTOR
# 

# Important distinction:
#
# np.array([1, 2, 3]) has shape (3,)
# np.array([[1], [2], [3]]) has shape (3, 1)

x = np.array([1, 2, 3])

x_column = x.reshape(3, 1)

print(x.shape)          # (3,)
print(x_column.shape)   # (3, 1)

print(x_column)


# 
# 5. ROW VECTOR
# 

x_row = x.reshape(1, 3)

print(x_row.shape)      # (1, 3)

print(x_row)


# 
# 6. MATRIX
# 

# A matrix is a 2-dimensional array.
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(A)
print(A.shape)      # (2, 3)
print(A.ndim)       # 2

# Element access: A[row, column]
print(A[0, 0])      # 1
print(A[1, 2])      # 6


# 
# 7. MATRIX OPERATIONS
# 

A = np.array([
    [1, 2],
    [3, 4]
])

B = np.array([
    [5, 6],
    [7, 8]
])

# Matrix addition
print(A + B)

# Element-wise multiplication
print(A * B)

# Matrix multiplication
print(A @ B)

# Transpose
print(A.T)


# 
# 8. MATRIX × VECTOR
# 

A = np.array([
    [1, 2],
    [3, 4]
])

x = np.array([10, 20])

y = A @ x

print(y)
print(y.shape)      # (2,)

# Mathematically:
#
# [1 2] [10]   [50]
# [3 4] [20] = [110]


# 
# 9. DOT PRODUCTS AS ROW-WISE OPERATIONS
# 

A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

x = np.array([10, 20, 30])

y = A @ x

print(y)

# Each output is a dot product:
#
# y[0] = [1, 2, 3] · [10, 20, 30]
# y[1] = [4, 5, 6] · [10, 20, 30]


# 
# 10. TENSOR
# 

# In NumPy, an ndarray can represent tensors of arbitrary rank.

# Rank 0 — scalar
scalar = np.array(5)

print(scalar.shape)    # ()
print(scalar.ndim)     # 0


# Rank 1 — vector
vector = np.array([1, 2, 3])

print(vector.shape)    # (3,)
print(vector.ndim)     # 1


# Rank 2 — matrix
matrix = np.array([
    [1, 2],
    [3, 4]
])

print(matrix.shape)    # (2, 2)
print(matrix.ndim)     # 2


# Rank 3 — tensor
tensor3 = np.array([
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
])

print(tensor3.shape)   # (2, 2, 2)
print(tensor3.ndim)    # 3


# Rank 4 — common in deep learning
# Example: batch × channels × height × width

images = np.zeros((32, 3, 224, 224))

print(images.shape)    # (32, 3, 224, 224)
print(images.ndim)     # 4


# 
# 11. CREATING TENSORS
# 

zeros = np.zeros((2, 3))
ones = np.ones((2, 3))
random = np.random.randn(2, 3)

print(zeros)
print(ones)
print(random)


# 
# 12. SHAPE / RESHAPE
# 

x = np.arange(12)

print(x)
print(x.shape)          # (12,)

X = x.reshape(3, 4)

print(X)
print(X.shape)          # (3, 4)


# 
# 13. BROADCASTING
# 

X = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

b = np.array([10, 20, 30])

# b is broadcast across every row
Y = X + b

print(Y)

# Result:
#
# [[11, 22, 33],
#  [14, 25, 36]]


# 
# 14. LINEAR LAYER
# 

# y = Wx + b

W = np.array([
    [1.0, 2.0],
    [3.0, 4.0]
])

x = np.array([5.0, 6.0])

b = np.array([0.5, 1.0])

y = W @ x + b

print(y)

# W @ x performs two dot products:
#
# y[0] = [1, 2] · [5, 6]
# y[1] = [3, 4] · [5, 6]
#
# then b is added.


# 
# 15. BATCH OF VECTORS
# 

# 4 examples, each containing 3 features

X = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
])

print(X.shape)       # (4, 3)

# Weight matrix:
# 3 input features → 2 output features

W = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])

print(W.shape)       # (3, 2)

Y = X @ W

print(Y)
print(Y.shape)       # (4, 2)


# 
# 16. USEFUL SHAPE ASSERTIONS
# 

x = np.array([1, 2, 3])
W = np.zeros((2, 3))

assert x.ndim == 1
assert W.ndim == 2
assert W.shape[1] == x.shape[0]

y = W @ x

assert y.shape == (2,)


# 
# 17. QUICK REFERENCE
# 

scalar = np.array(5)                    # shape ()
vector = np.array([1, 2, 3])            # shape (3,)
matrix = np.array([[1, 2], [3, 4]])     # shape (2, 2)
tensor = np.zeros((2, 3, 4))            # shape (2, 3, 4)

print(scalar.ndim)     # 0
print(vector.ndim)     # 1
print(matrix.ndim)     # 2
print(tensor.ndim)     # 3

# Core operations
a + b                  # addition
a - b                  # subtraction
a * b                  # element-wise multiplication
a @ b                  # matrix multiplication / dot product
A.T                    # transpose
np.linalg.norm(x)      # vector norm
x.reshape(...)          # change shape
```


---

#ai/chatgpt
#ai/gemini

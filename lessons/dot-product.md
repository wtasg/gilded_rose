# Dot Product

The **dot product** is an operation that takes two vectors of the same dimension and produces a **scalar**.

## Definition

For two vectors

$$
\mathbf{a} =
\begin{bmatrix}
a_1\\
a_2\\
\vdots\\
a_n
\end{bmatrix},
\qquad
\mathbf{b} =
\begin{bmatrix}
b_1\\
b_2\\
\vdots\\
b_n
\end{bmatrix}
$$

their dot product is

$$
\mathbf{a}\cdot\mathbf{b}
=
\sum_{i=1}^{n}a_i b_i
$$

or explicitly,

$$
\mathbf{a}\cdot\mathbf{b}
=
a_1b_1+a_2b_2+\cdots+a_nb_n
$$

The result is a **scalar**, not a vector.

## Example

Given

$$
\mathbf{a}=
\begin{bmatrix}
2\\3\\4
\end{bmatrix},
\qquad
\mathbf{b}=
\begin{bmatrix}
5\\1\\2
\end{bmatrix}
$$

we have

$$
\mathbf{a}\cdot\mathbf{b}
=
2(5)+3(1)+4(2)
=
21
$$

Therefore,

$$
\boxed{\mathbf{a}\cdot\mathbf{b}=21}
$$

## Geometric Interpretation

The dot product can also be written as

$$
\mathbf{a}\cdot\mathbf{b}
=
\|\mathbf{a}\|\,\|\mathbf{b}\|\cos\theta
$$

where:

* $|\mathbf{a}|$ is the length of $\mathbf{a}$
* $|\mathbf{b}|$ is the length of $\mathbf{b}$
* $\theta$ is the angle between the vectors

Therefore, the dot product measures the **alignment between two vectors**, scaled by their lengths.

### Direction

* $\mathbf{a}\cdot\mathbf{b}>0$: vectors point generally in the same direction.
* $\mathbf{a}\cdot\mathbf{b}=0$: vectors are perpendicular.
* $\mathbf{a}\cdot\mathbf{b}<0$: vectors point generally in opposite directions.


For unit vectors,

$$
\|\mathbf{a}\|=\|\mathbf{b}\|=1
$$

so

$$
\mathbf{a}\cdot\mathbf{b}=\cos\theta
$$

Thus the dot product of unit vectors directly measures their angular similarity.

## Projection

The dot product is also related to **projection**.

The scalar projection of \(\mathbf a\) onto \(\mathbf b\) is

$$
\operatorname{comp}_{\mathbf b}(\mathbf a)
=
\frac{\mathbf a\cdot\mathbf b}{\|\mathbf b\|}
$$

The vector projection is

$$
\operatorname{proj}_{\mathbf b}(\mathbf a)
=
\frac{\mathbf a\cdot\mathbf b}{\mathbf b\cdot\mathbf b}\mathbf b
$$

So the dot product tells us how strongly one vector contributes in the direction of another.

## Dot Product and Matrix Multiplication

A row vector multiplied by a column vector is a dot product:

$$
\mathbf a^T\mathbf b
=
\begin{bmatrix}
a_1&a_2&\cdots&a_n
\end{bmatrix}
\begin{bmatrix}
b_1\\b_2\\\vdots\\b_n
\end{bmatrix}
=
\sum_{i=1}^{n}a_i b_i
$$

Therefore,

$$
\boxed{\mathbf a\cdot\mathbf b=\mathbf a^T\mathbf b}
$$

when vectors are represented as columns.

## Dot Products in a Linear Layer

Consider a linear layer

$$
\mathbf y=W\mathbf x+\mathbf b
$$

Each element of \(\mathbf y\) is a dot product between a row of \(W\) and \(\mathbf x\).

For

$$
W=
\begin{bmatrix}
w_{11}&w_{12}\\
w_{21}&w_{22}
\end{bmatrix},
\qquad
\mathbf x=
\begin{bmatrix}
x_1\\x_2
\end{bmatrix}
$$

we get

$$
W\mathbf x
=
\begin{bmatrix}
w_{11}x_1+w_{12}x_2\\
w_{21}x_1+w_{22}x_2
\end{bmatrix}
$$

Each output is therefore a dot product:

$$
y_1=\mathbf w_1\cdot\mathbf x
$$

$$
y_2=\mathbf w_2\cdot\mathbf x
$$

A matrix-vector multiplication is consequently a **collection of dot products**.

## Dot Products in Machine Learning

Dot products are fundamental because they provide a simple way to measure interactions between vectors.

### Linear models

$$
y=\mathbf w^T\mathbf x+b
$$

The weights determine how strongly each input feature contributes to the output.

### Embeddings

The dot product between two embedding vectors can measure their similarity, particularly when the embeddings are normalized.

### Attention

Transformers use dot products to measure compatibility between queries and keys:

$$
\operatorname{score}(q,k)=q^Tk
$$

Scaled dot-product attention then uses

$$
\operatorname{Attention}(Q,K,V)
=
\operatorname{softmax}
\left(
\frac{QK^T}{\sqrt{d_k}}
\right)V
$$

The matrix \(QK^T\) is essentially a large collection of pairwise dot products.

## Key Mental Model

> **A dot product takes two vectors and produces a scalar representing their weighted alignment.**

Algebraically:

$$
\boxed{\mathbf a\cdot\mathbf b=\sum_i a_i b_i}
$$

Geometrically:

$$
\boxed{\mathbf a\cdot\mathbf b=\|\mathbf a\|\|\mathbf b\|\cos\theta}
$$

In matrix computation:

$$
\boxed{\mathbf a\cdot\mathbf b=\mathbf a^T\mathbf b}
$$

In neural networks:

$$
\boxed{\text{linear transformation}=\text{many dot products}}
$$

---

#ai/chatgpt
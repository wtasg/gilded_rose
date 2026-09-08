# Vectors

|          |                                                                                              |     |
| -------- | -------------------------------------------------------------------------------------------- | --- |
| ML       | a vector is an element of a vector space whose coordinates encode some quantity or features. |     |
| Maths    | element of a vector space                                                                    |     |
| Geometry | an arrow from origin to a point                                                              |     |
|          |                                                                                              |     |

---

Vector Space, V

+ Addition Closure : u + v $\in$ V where u, v $\in$ V
	+ u + (v + w) = (u + v) + w i.e. associative
	+ u + 0 = u = 0 + u i.e. zero vector
	+ u + v = v + u i.e. commutative
	+ u + (-u) = 0 i.e. additive inverse
+ Scaling closure: c $\cdot$ $(\vec v)$ = c$\vec v$ where $\vec v \in V$ and c $\in F$
	+ c($\vec u$ + $\vec v$) = c$\vec u$ + c$\vec v$
	+ (c + d)$\vec v$ = c$\vec v$ + d$\vec v$
	+ c(d$\vec v$) = cd($\vec v$)
	+ 1($\vec v$) = $\vec v$ i.e. multiplicative identity

Anything that supports these 10 properies (2 closures and 8 axioms) will be a vector space.

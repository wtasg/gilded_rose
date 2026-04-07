# Union-Find (Disjoint Set Union)

---

## 1. Why Union-Find Exists

Suppose you have a social network with a million users and a stream of "friend" events. Every time someone asks "are these two users in the same friend circle?", the naive approach — a fresh BFS or DFS from scratch — costs O(n + e) per query. With thousands of queries per second, that's untenable.

Union-Find solves this by maintaining a **compressed summary** of connectivity. You pay a small upfront cost to process each edge, and then answer "are A and B connected?" in near-constant time — regardless of graph size.

> **Core insight:** instead of traversing paths, we track which **representative** (root) each node belongs to. Same root = same component.

---

## 2. The Data Structure

Two arrays, both indexed by node:

```text
parent[i] = i       // each node starts as its own root
rank[i]   = 0       // used to keep trees shallow
```

### find — with path compression

Walks up to the root, then flattens the path on the way back. After the first call, every node in the chain points directly to the root.

```text
function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])   // ← path compression
    return parent[x]
```

### union — by rank

Merges two components by attaching the shallower tree under the deeper one.

```text
function union(x, y):
    rootX = find(x)
    rootY = find(y)

    if rootX == rootY: return false    // already same component

    if rank[rootX] < rank[rootY]:
        parent[rootX] = rootY
    elif rank[rootX] > rank[rootY]:
        parent[rootY] = rootX
    else:
        parent[rootY] = rootX
        rank[rootX] += 1               // only increments on tie

    return true
```

> **Why both matter:** path compression and union by rank work *together* to produce O(α(n)). Either alone gives O(log n). Both together give O(α(n)) — the inverse Ackermann function, which is ≤ 4 for any input you'll encounter in practice.

---

## 3. How find Works — Path Compression

Before path compression, repeated `find` calls walk a long chain. After, every node points directly to the root.

````plantuml
@startuml
skinparam defaultFontName Monospaced
skinparam defaultFontSize 13
skinparam ArrowColor #555555
skinparam NodeBorderColor #888888
skinparam NodeBackgroundColor #F5F5F5
skinparam TitleFontSize 14
skinparam Padding 6

title Before path compression

node "4\n(root)" as r4
node "3" as n3
node "2" as n2
node "1" as n1

n1 --> n2 : parent
n2 --> n3 : parent
n3 --> r4 : parent

note bottom of n1
  find(1) must walk:
  1 → 2 → 3 → 4
end note
@enduml
````

````plantuml
@startuml
skinparam defaultFontName Monospaced
skinparam defaultFontSize 13
skinparam ArrowColor #1a73e8
skinparam NodeBorderColor #1a73e8
skinparam NodeBackgroundColor #e8f0fe
skinparam TitleFontSize 14
skinparam Padding 6

title After path compression

node "4\n(root)" as r4
node "3" as n3
node "2" as n2
node "1" as n1

n1 --> r4 : parent
n2 --> r4 : parent
n3 --> r4 : parent

note bottom of n1
  find(1) now:
  1 → 4 (direct)
end note
@enduml
````

---

## 4. Dry Run

Input: `n=5, edges=[[0,1],[1,2],[3,4]]`

### Step 1 — Initial state

```text
parent = [0, 1, 2, 3, 4]
rank   = [0, 0, 0, 0, 0]
```

Each node is its own root.

### Step 2 — union(0, 1)

`find(0)=0`, `find(1)=1`. Ranks equal → attach 1 under 0, increment `rank[0]`.

```text
parent = [0, 0, 2, 3, 4]
rank   = [1, 0, 0, 0, 0]
```

### Step 3 — union(1, 2)

`find(1)` follows `parent[1]=0`, so `rootX=0`. `find(2)=2`. `rank[0]=1 > rank[2]=0` → attach 2 under 0.

```text
parent = [0, 0, 0, 3, 4]
rank   = [1, 0, 0, 0, 0]
```

### Step 4 — union(3, 4)

`find(3)=3`, `find(4)=4`. Ranks equal → attach 4 under 3, increment `rank[3]`.

```text
parent = [0, 0, 0, 3, 3]
rank   = [1, 0, 0, 1, 0]
```

### Final forest

````plantuml
@startuml
skinparam defaultFontName Monospaced
skinparam defaultFontSize 13
skinparam ArrowColor #555555
skinparam NodeBorderColor #888888
skinparam NodeBackgroundColor #F5F5F5
skinparam Padding 6

title Final parent forest

node "0 (root)\nrank=1" as r0 #ddeeff
node "1" as n1
node "2" as n2
node "3 (root)\nrank=1" as r3 #ddeeff
node "4" as n4

n1 --> r0 : parent
n2 --> r0 : parent
n4 --> r3 : parent

note right of r0
  Component {0, 1, 2}
end note

note right of r3
  Component {3, 4}
end note
@enduml
````

---

## 5. Complexity

| Operation | Time | Note |
|-----------|------|------|
| `find` | O(α(n)) | Path compression keeps paths flat |
| `union` | O(α(n)) | Two finds + one pointer update |
| Init | O(n) | Fill parent and rank arrays |

α(n) is the inverse Ackermann function. For all practical inputs, α(n) ≤ 4.

---

## 6. Pattern Recognition

### Use Union-Find when you see:

| Problem phrasing | DSU usage |
|-----------------|-----------|
| "Are these two nodes connected?" | Direct — `find(a) == find(b)` |
| "How many connected components?" | Count distinct roots after all unions |
| "Merge groups / accounts / islands" | One union per shared attribute |
| "Detect cycle in undirected graph" | Union edge (u,v); cycle if already same root |
| "Minimum spanning tree" | Kruskal — sort edges, union if different components |
| Grid connectivity ("number of islands II") | Map 2D cell `(r,c)` → 1D index `r*cols+c`, then use DSU on the 1D indices |
| Equation relations (a/b = k) | Weighted DSU — track ratio alongside parent |

### Avoid Union-Find when you need:

| Need | Better tool |
|------|-------------|
| Shortest path | Dijkstra / BFS |
| Directed reachability | DFS / topological sort |
| Reconstruct the actual path | DFS / BFS with parent tracking |

---

## 7. Decision Flowchart

````mermaid
flowchart TD
    A([Graph connectivity problem]) --> B{Directed graph?}
    B -- Yes --> C[DFS / topological sort]
    B -- No --> D{Need shortest path?}
    D -- Yes --> E[BFS / Dijkstra]
    D -- No --> F{Need actual path?}
    F -- Yes --> G[BFS / DFS with parent tracking]
    F -- No --> H{Many queries\nor dynamic edges?}
    H -- No --> I[BFS or DFS\nper query]
    H -- Yes --> J([Use Union-Find])

    style A fill:#e8f0fe,stroke:#1a73e8
    style J fill:#e6f4ea,stroke:#34a853
    style C fill:#fce8e6,stroke:#ea4335
    style E fill:#fce8e6,stroke:#ea4335
    style G fill:#fce8e6,stroke:#ea4335
    style I fill:#fff3e0,stroke:#fa7b17
````

---

## 8. Replacing BFS with DSU

When you have many connectivity queries over a static graph, BFS per query is wasteful. Precompute once:

```text
// Preprocess — O((n+e) · α(n))
for (u, v) in edges:
    union(u, v)

// Query — O(α(n))
connected(a, b) → find(a) == find(b)
```

---

## 9. Cycle Detection

```text
for (u, v) in edges:
    if find(u) == find(v):
        return "cycle detected"   // u and v already share a root
    union(u, v)
```

> **Warning:** This only works for **undirected** graphs. For directed graphs, use DFS with a "currently in stack" flag instead.

---

## 10. DSU vs Other Graph Techniques

````mermaid
quadrantChart
    title Graph technique selection
    x-axis Static --> Dynamic
    y-axis Single query --> Many queries
    quadrant-1 Union-Find
    quadrant-2 DFS / BFS precompute
    quadrant-3 Single BFS/DFS
    quadrant-4 Incremental BFS
    Union-Find: [0.85, 0.85]
    Kruskal MST: [0.7, 0.5]
    BFS per query: [0.2, 0.3]
    DFS traversal: [0.15, 0.2]
    Dijkstra: [0.3, 0.6]
````

| Technique | Best for | Weakness |
|-----------|----------|----------|
| DSU | Offline connectivity, MST | No path info; undirected only |
| BFS | Shortest path (unweighted) | Recompute per query |
| DFS | Traversal, directed reachability | Stack depth on large graphs |
| Dijkstra | Shortest path (weighted) | Slower than DSU for pure connectivity |

---

## 11. Advanced Variants

### Union by size (alternative to rank)

Track component size instead of rank. Attach smaller tree under larger. Often more intuitive, and doubles as a free `size(x)` query.

```text
size[i] = 1    // init

union(x, y):
    if size[rootX] < size[rootY]: swap(rootX, rootY)
    parent[rootY] = rootX
    size[rootX] += size[rootY]
```

### Component metadata

Attach extra data to each root — min value, max value, sum, count. Update when merging two roots: the surviving root inherits the combined metadata.

### Weighted DSU

Used in problems like "Evaluate Division" (LC 399). Each `parent` pointer carries a *weight* representing the ratio between a node and its parent. `find` compresses paths while accumulating the product of weights along the chain.

---

## 12. TypeScript Implementation

```typescript
class DSU {
    parent: number[]
    rank: number[]

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i)
        this.rank = new Array(n).fill(0)
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x])  // path compression
        }
        return this.parent[x]
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x)
        const rootY = this.find(y)
        if (rootX === rootY) return false

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX
        } else {
            this.parent[rootY] = rootX
            this.rank[rootX]++
        }
        return true
    }
}
```

---

## 13. Go Implementation

```go
type DSU struct {
    parent []int
    rank   []int
}

func NewDSU(n int) *DSU {
    d := &DSU{parent: make([]int, n), rank: make([]int, n)}
    for i := range d.parent { d.parent[i] = i }
    return d
}

func (d *DSU) Find(x int) int {
    if d.parent[x] != x {
        d.parent[x] = d.Find(d.parent[x])  // path compression
    }
    return d.parent[x]
}

func (d *DSU) Union(x, y int) bool {
    rx, ry := d.Find(x), d.Find(y)
    if rx == ry { return false }

    switch {
    case d.rank[rx] < d.rank[ry]: d.parent[rx] = ry
    case d.rank[rx] > d.rank[ry]: d.parent[ry] = rx
    default:
        d.parent[ry] = rx
        d.rank[rx]++
    }
    return true
}
```

---

## 14. Practice Problems

| Problem | Difficulty | Key idea |
|---------|------------|----------|
| [Find if Path Exists in Graph](https://leetcode.com/problems/find-if-path-exists-in-graph/) | Easy | Direct connectivity query |
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) | Medium | Count distinct roots |
| [Redundant Connection](https://leetcode.com/problems/redundant-connection/) | Medium | Cycle detection |
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) | Medium | Group by shared attribute |
| [Satisfiability of Equality Equations](https://leetcode.com/problems/satisfiability-of-equality-equations/) | Medium | Two-pass: union on `==`, check on `!=` |
| [Evaluate Division](https://leetcode.com/problems/evaluate-division/) | Medium | Weighted DSU with ratio |
| [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Medium | Kruskal on complete graph |
| [Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/) | Hard | Online queries + 2D→1D mapping |

---

## 15. Mental Model

```text
Union-Find = lazy graph compression + instant connectivity queries

Instead of:  traverse the graph each time
Do:          compress it once, query the summary
```

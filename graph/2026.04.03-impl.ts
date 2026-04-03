/* Graph
 * Assumptions:
 * 1. Nodes names are string
 * 2. Weighted
 * 3. Directed
 * */
type Edge = {
    u: string;
    v: string;
    w: number;
}
class DWGraph {
    private V: Set<string>;
    private E: Map<string, Edge[]>;

    constructor() {
        this.V = new Set<string>();
        this.E = new Map<string, Edge[]>();
    }

    addNode(u: string): boolean {
        if (this.V.has(u)) {
            return false;
        }
        this.V.add(u);
        return true;
    }
    removeNode(u: string): boolean {
        if (!this.V.has(u)) {
            return false;
        }
        if (this.E.has(u)) {
            this.E.delete(u);
        }
        this.V.delete(u);
        return true;
    }
    addEdge(e: Edge): boolean {
        if (!this.E.has(e.u)) {
            this.E.set(e.u, [] as Edge[]);
        }
        if (this.E.get(e.u)?.some(x => x.v === e.v && x.w === e.w)) {
            return false;
        }
        this.E.get(e.u)!.push(e);
        this.V.add(e.u);
        this.V.add(e.v);
        return true;
    }
    removeEdge(e: Edge): boolean {
        if (!this.E.has(e.u)) {
            return false;
        }

        const edges: Edge[] = this.E.get(e.u) ?? [];
        const index = edges.findIndex(x => x.v === e.v && x.w === e.w);
        if (index === -1) {
            return false;
        }
        edges.splice(index, 1);
        if (edges.length === 0) {
            this.E.delete(e.u);
            // check if e.u has incoming edges and if not delete from V
            if (![...this.E.values()]
                .some(edges => edges.some(edge => edge.v === e.u))) {
                this.V.delete(e.u);
            }

            // check if e.v has outgoing edges AND incoming edges and if not delete from V
            if (!this.E.has(e.v) && ![...this.E.values()].some(edges => edges.some(edge => edge.v === e.v))) {
                this.V.delete(e.v);
            }

        } else {
            this.E.set(e.u, edges);
        }
        return true;
    }


    printBFS(start: string) {
        if (!this.V.has(start)) {
            return;
        }
        const visited = new Set<string>();
        const queue: string[] = [];
        queue.push(start);
        while (queue.length > 0) {
            const node = queue.shift()!;
            if (!visited.has(node)) {
                visited.add(node);
                console.log(node);
                const edges = this.E.get(node) ?? [];
                edges.forEach(e => {
                    if (!visited.has(e.v)) {
                        queue.push(e.v);
                    }
                });
            }
        }

    }

    printDFS(start: string) {
        if (!this.V.has(start)) {
            return;
        }
        const visited = new Set<string>();
        const stack: string[] = [];
        stack.push(start);
        while (stack.length > 0) {
            const node = stack.pop()!;
            if (!visited.has(node)) {
                visited.add(node);
                console.log(node);
                const edges = this.E.get(node) ?? [];
                edges.forEach(e => {
                    if (!visited.has(e.v)) {
                        stack.push(e.v);
                    }
                });
            }
        }
    }

    print() {
        console.log("Nodes:", [...this.V]);
        console.log("Edges:", [...this.E.entries()]);
    }

}

function graphTest1() {
    const g = new DWGraph();
    g.addEdge({ u: "A", v: "B", w: 1 });
    g.addEdge({ u: "A", v: "C", w: 2 });
    g.addEdge({ u: "B", v: "C", w: 3 });
    g.addEdge({ u: "C", v: "A", w: 4 });
    g.addEdge({ u: "D", v: "E", w: 5 });
    g.addEdge({ u: "D", v: "E", w: 6 });
    g.printDFS("A");
    g.printBFS("A");
    g.print();
    g.removeEdge({ u: "D", v: "E", w: 6 });
    g.print();
    g.removeEdge({ u: "D", v: "E", w: 5 });
    g.print();
}

graphTest1();

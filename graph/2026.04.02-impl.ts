class Graph {
    private nodes: Set<string>;
    private edges: Map<string, Set<string>>;

    constructor() {
        this.nodes = new Set<string>();
        this.edges = new Map<string, Set<string>>();
    }

    addNode(n: string) {
        this.nodes.add(n);
    }
    addNodes(...nodes: string[]) {
        nodes.forEach(node => this.addNode(node));
    }
    addEdge(edge: [string, string]) {
        const [a, b] = edge;
        if (!this.edges.has(a)) {
            this.edges.set(a, new Set<string>());
        }
        if (!this.edges.has(b)) {
            this.edges.set(b, new Set<string>());
        }
        this.edges.get(a)!.add(b);
        this.edges.get(b)!.add(a);

        this.addNodes(...edge);
    }
    addEdges(...edges: [string, string][]) {
        edges.forEach(edge => this.addEdge(edge));
    }
    print() {
        console.log("Nodes:", Array.from(this.nodes));
        console.log("Edges:");
        this.edges.forEach((neighbors, node) => {
            console.log(`  ${node} -- ${Array.from(neighbors).join(", ")}`);
        });
    }
}

function testGraph1() {
    const g = new Graph();
    g.addEdge(["A", "B"]);
    g.addEdges(["B", "C"], ["C", "D"], ["D", "E"], ["E", "F"]);
    g.print();
}

testGraph1();

class Stack<T> {
    private store: Array<T>;

    constructor() {
        this.store = [];
    }

    push(item: T) {
        this.store.push(item);
    }
    pop(): T | Error {
        if (this.store.length === 0) {
            return new Error("Stack is empty");
        }
        return this.store.pop()!;
    }
    peek(): T | Error {
        if (this.store.length === 0) {
            return new Error("Stack is empty");
        }
        return this.store[this.store.length - 1];
    }
    isEmpty(): boolean {
        return this.store.length === 0;
    }

}

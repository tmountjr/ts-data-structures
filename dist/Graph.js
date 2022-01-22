"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const Stack_1 = require("./Stack");
const LinkedList_1 = require("./LinkedList");
class GraphNode {
    constructor(id) {
        this.id = id;
        this.adjacent = new LinkedList_1.LinkedList();
    }
}
class Graph {
    constructor() {
        this.nodeLookup = new Map();
    }
    getNode(id) {
        const toReturn = this.nodeLookup.get(id);
        if (toReturn)
            return toReturn;
        throw new Error('No matching node with given ID found.');
    }
    addNode(id) {
        const newNode = new GraphNode(id);
        this.nodeLookup.set(id, newNode);
    }
    addEdge(source, destination, bidirectional = true) {
        const s = this.getNode(source);
        const d = this.getNode(destination);
        s.adjacent.add(d);
        if (bidirectional)
            d.adjacent.add(s);
    }
    hasPathDFSRecursion(source, destination) {
        const s = this.getNode(source);
        const d = this.getNode(destination);
        const visited = new Set();
        const recurse = (source, destination, visited) => {
            if (visited.has(source.id))
                return false;
            visited.add(source.id);
            if (source === destination)
                return true;
            for (let { data: child } of source.adjacent) {
                if (recurse(child, destination, visited))
                    return true;
            }
            return false;
        };
        return recurse(s, d, visited);
    }
    hasPathDFSIteration(source, destination) {
        const s = this.getNode(source);
        const d = this.getNode(destination);
        const visited = new Set();
        const stack = new Stack_1.Stack();
        stack.push(s);
        visited.add(s.id);
        while (stack.size > 0) {
            const popped = stack.pop();
            if (!popped)
                throw new Error('Bad stack.');
            let t = popped.data;
            if (t === d)
                return true;
            for (let { data: child } of t.adjacent) {
                if (!visited.has(child.id)) {
                    visited.add(child.id);
                    stack.push(child);
                }
            }
        }
        return false;
    }
    hasPathBFSIteration(source, destination) {
        const s = this.getNode(source);
        const d = this.getNode(destination);
        const nextToVisit = new LinkedList_1.LinkedList();
        const visited = new Set();
        nextToVisit.add(s);
        while (nextToVisit.size > 0) {
            const { data: node } = nextToVisit.shift();
            if (node === d)
                return true;
            if (visited.has(node.id))
                continue;
            visited.add(node.id);
            for (let { data: neighbor } of node.adjacent) {
                nextToVisit.add(neighbor);
            }
        }
        return false;
    }
    bfsDistance(source, destination, weight = 1) {
        const s = this.getNode(source);
        const d = this.getNode(destination);
        const nextToVisit = new LinkedList_1.LinkedList();
        const visited = new Set();
        const edges = new Map();
        nextToVisit.add(s);
        visited.add(s);
        edges.set(source, 0);
        while (nextToVisit.size > 0) {
            const { data: current } = nextToVisit.shift();
            if (current === d) {
                const edgeDestination = edges.get(destination);
                if (!edgeDestination) {
                    throw new Error('Edge count for destination does not exist.');
                }
                return weight * edgeDestination;
            }
            for (let { data: neighbor } of current.adjacent) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextToVisit.add(neighbor);
                    const edge = edges.get(current.id);
                    if (typeof edge === 'undefined')
                        throw new Error('Edge count for current node does not exist.');
                    edges.set(neighbor.id, edge + 1);
                }
            }
        }
        return -1;
    }
}
exports.Graph = Graph;
//# sourceMappingURL=Graph.js.map
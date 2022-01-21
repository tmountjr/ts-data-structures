import { Stack } from "./Stack";
import { LinkedList } from "./LinkedList";

class GraphNode<T> {
  adjacent: LinkedList<GraphNode<T>> = new LinkedList<GraphNode<T>>();
  constructor(public id: T) {  }
}

export class Graph<T> {
  nodeLookup: Map<T, GraphNode<T>> = new Map<T, GraphNode<T>>();

  getNode(id: T): GraphNode<T> {
    const toReturn: GraphNode<T>|undefined = this.nodeLookup.get(id);
    if (toReturn) return toReturn;
    throw new Error('No matching node with given ID found.');
  }

  addNode(id: T): void {
    const newNode = new GraphNode<T>(id);
    this.nodeLookup.set(id, newNode);
  }

  addEdge(source: T, destination: T, bidirectional = true) {
    const s = this.getNode(source);
    const d = this.getNode(destination);
    s.adjacent.add(d);
    if (bidirectional) d.adjacent.add(s);
  }

  hasPathDFSRecursion(source: T, destination: T): boolean {
    const s = this.getNode(source);
    const d = this.getNode(destination);
    const visited = new Set<T>();

    const recurse = (
      source: GraphNode<T>,
      destination: GraphNode<T>,
      visited: Set<T>
    ): boolean => {
      if (visited.has(source.id)) return false;
      visited.add(source.id);
      if (source === destination) return true;
      for (let { data: child } of source.adjacent) {
        if (recurse(child, destination, visited)) return true;
      }
      return false;
    }

    return recurse(s, d, visited);
  }

  hasPathDFSIteration(source: T, destination: T): boolean {
    const s = this.getNode(source);
    const d = this.getNode(destination);
    const visited = new Set<T>();
    const stack = new Stack<GraphNode<T>>();
    stack.push(s);
    visited.add(s.id);
    while (stack.size > 0) {
      const popped = stack.pop();
      if (!popped) throw new Error('Bad stack.');
      let t = popped.data;
      if (t === d) return true;
      for (let { data: child } of t.adjacent) {
        if (!visited.has(child.id)) {
          visited.add(child.id);
          stack.push(child);
        }
      }
    }
    return false;
  }

  hasPathBFSIteration(source: T, destination: T): boolean {
    const s = this.getNode(source);
    const d = this.getNode(destination);
    const nextToVisit = new LinkedList<GraphNode<T>>();
    const visited = new Set<T>();
    nextToVisit.add(s);
    while (nextToVisit.size > 0) {
      const { data: node } = nextToVisit.shift();
      if (node === d) return true;
      if (visited.has(node.id)) continue;
      visited.add(node.id);
      for (let { data: neighbor } of node.adjacent) {
        nextToVisit.add(neighbor);
      }
    }
    return false;
  }

  bfsDistance(source: T, destination: T, weight = 1): number {
    const s = this.getNode(source);
    const d = this.getNode(destination);
    const nextToVisit = new LinkedList<GraphNode<T>>();
    const visited = new Set<GraphNode<T>>();
    const edges = new Map<T, number>();

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
          if (typeof edge === 'undefined') throw new Error('Edge count for current node does not exist.');
          edges.set(neighbor.id, edge + 1);
        }
      }
    }
    return -1;
  }
}
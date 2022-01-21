import { LinkedList } from "./LinkedList";
declare class GraphNode<T> {
    id: T;
    adjacent: LinkedList<GraphNode<T>>;
    constructor(id: T);
}
export declare class Graph<T> {
    nodeLookup: Map<T, GraphNode<T>>;
    getNode(id: T): GraphNode<T>;
    addNode(id: T): void;
    addEdge(source: T, destination: T, bidirectional?: boolean): void;
    hasPathDFSRecursion(source: T, destination: T): boolean;
    hasPathDFSIteration(source: T, destination: T): boolean;
    hasPathBFSIteration(source: T, destination: T): boolean;
    bfsDistance(source: T, destination: T, weight?: number): number;
}
export {};
//# sourceMappingURL=Graph.d.ts.map
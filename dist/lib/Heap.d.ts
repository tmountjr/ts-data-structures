import { TreeAsArray } from './TreeAsArray';
export interface IHeap {
    peek(): void;
    poll(): number;
    add(item: number): void;
}
interface IHeapConstructor<T1 = number, T2 = number, T3 = boolean> {
    (left: T1, right: T2): T3;
}
declare class Heap extends TreeAsArray<number> implements IHeap {
    protected comparitor: IHeapConstructor;
    constructor(initialItems: number[], comparitor: IHeapConstructor);
    /**
     * Check the top value in the heap.
     * @returns The value at the top of the heap.
     */
    peek(): number;
    /**
     * Return the top value from the heap and re-order the heap.
     * @returns The value at the top of the heap.
     */
    poll(): number;
    /**
     * Add an item to the heap and re-order the heap.
     * @param item The number to add to the heap.
     */
    add(item: number): void;
    /**
     * Push the top item on the heap into its correct position.
     */
    protected heapifyDown(): void;
    /**
     * Move the last item in the heap into its correct position.
     */
    protected heapifyUp(): void;
}
/**
 * An implementation of the Heap structure where the parent element is smaller than its children.
 */
export declare class MinHeap extends Heap {
    protected comparitor: IHeapConstructor;
    constructor(initialItems: number[], comparitor?: IHeapConstructor);
}
/**
 * An implementation of the Heap structure where the parent element is larger than its children.
 */
export declare class MaxHeap extends Heap {
    protected comparitor: IHeapConstructor;
    constructor(initialItems: number[], comparitor?: IHeapConstructor);
}
export {};
//# sourceMappingURL=Heap.d.ts.map
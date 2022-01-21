export declare class TreeAsArray<T> {
    size: number;
    protected items: Array<T>;
    protected getLeftChildIndex(parentIndex: number): number;
    protected getRightChildIndex(parentIndex: number): number;
    protected getParentIndex(childIndex: number): number;
    protected hasLeftChild(index: number): boolean;
    protected hasRightChild(index: number): boolean;
    protected hasParent(index: number): boolean;
    protected leftChild(index: number): T;
    protected rightChild(index: number): T;
    protected parent(index: number): T;
    protected swap(i: number, j: number): void;
    add(item: T): void;
    peek(): T;
    poll(): T;
}
//# sourceMappingURL=TreeAsArray.d.ts.map
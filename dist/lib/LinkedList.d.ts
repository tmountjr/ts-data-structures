/**
 * A node for data found in a LinkedList.
 */
export declare class ListNode<T> {
    data: T;
    next: ListNode<T> | null;
    /**
     * Create a new node.
     * @param data The data to use when creating the node.
     */
    constructor(data: T);
}
/**
 * A linked list object.
 */
export declare class LinkedList<T> implements IterableIterator<ListNode<T>> {
    /**
     * The head node of the list.
     */
    head: ListNode<T> | null;
    /**
     * The tail node of the list.
     */
    tail: ListNode<T> | null;
    /**
     * The number of objects in the list.
     */
    size: number;
    /**
     * A list of data values found in the list for quick lookups.
     */
    private manifest;
    /**
     * Used in iterations.
     */
    private iteratorPointer;
    constructor(data?: T[]);
    /**
     * Add data to the end of the list.
     * @param data The data to add to the list.
     */
    add(data: T): void;
    /**
     * Remove the head node from the list and return it.
     * @returns The head node
     */
    shift(): ListNode<T>;
    /**
     * Check if the list contains specific data.
     * @param data The data to search for.
     * @returns TRUE if the list has data; FALSE if it does not.
     */
    has(data: T): boolean;
    /**
     * Iterate through the list.
     * @returns The next iteration value of the linked list.
     */
    next(): IteratorResult<ListNode<T>>;
    /**
     * Iterate over the list nodes in order.
     */
    [Symbol.iterator](): IterableIterator<ListNode<T>>;
}
//# sourceMappingURL=LinkedList.d.ts.map
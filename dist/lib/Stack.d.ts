/**
 * Node used in stacks.
 */
declare class StackNode<T> {
    data: T;
    /** Pointer to the previous node in the stack. */
    previous: StackNode<T> | null;
    /**
     * Create a new node.
     * @param data The data for the new node.
     */
    constructor(data: T);
}
/**
 * The stack implementation.
 */
export declare class Stack<T> {
    /** The top of the stack. */
    top: StackNode<T> | null;
    /** The number of items in the stack. */
    size: number;
    /**
     * Add a new item to the stack.
     * @param data The data to add.
     * @returns A pointer to the top of the stack.
     */
    push(data: T): StackNode<T>;
    /**
     * Remove and return the top item of the stack.
     * @returns The item from the top of the stack.
     */
    pop(): StackNode<T> | null;
}
export {};
//# sourceMappingURL=Stack.d.ts.map
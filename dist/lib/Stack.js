"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * Node used in stacks.
 */
class StackNode {
    /**
     * Create a new node.
     * @param data The data for the new node.
     */
    constructor(data) {
        this.data = data;
        /** Pointer to the previous node in the stack. */
        this.previous = null;
    }
}
/**
 * The stack implementation.
 */
class Stack {
    constructor() {
        /** The top of the stack. */
        this.top = null;
        /** The number of items in the stack. */
        this.size = 0;
    }
    /**
     * Add a new item to the stack.
     * @param data The data to add.
     * @returns A pointer to the top of the stack.
     */
    push(data) {
        const node = new StackNode(data);
        node.previous = this.top;
        this.top = node;
        this.size++;
        return this.top;
    }
    /**
     * Remove and return the top item of the stack.
     * @returns The item from the top of the stack.
     */
    pop() {
        if (this.size === 0 || !this.top)
            return null;
        const temp = this.top;
        this.top = this.top.previous;
        this.size--;
        return temp;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map
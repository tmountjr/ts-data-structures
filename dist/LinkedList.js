"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = exports.ListNode = void 0;
/**
 * A node for data found in a LinkedList.
 */
class ListNode {
    /**
     * Create a new node.
     * @param data The data to use when creating the node.
     */
    constructor(data) {
        this.next = null;
        this.data = data;
    }
}
exports.ListNode = ListNode;
/**
 * A linked list object.
 */
class LinkedList {
    constructor(data = []) {
        /**
         * The head node of the list.
         */
        this.head = null;
        /**
         * The tail node of the list.
         */
        this.tail = null;
        /**
         * The number of objects in the list.
         */
        this.size = 0;
        /**
         * A list of data values found in the list for quick lookups.
         */
        this.manifest = new Set;
        /**
         * Used in iterations.
         */
        this.iteratorPointer = null;
        if (data.length) {
            for (let i = 0; i < data.length; i++) {
                this.add(data[i]);
            }
        }
    }
    /**
     * Add data to the end of the list.
     * @param data The data to add to the list.
     */
    add(data) {
        const toAppend = new ListNode(data);
        if (!this.head) {
            this.head = toAppend;
            this.iteratorPointer = toAppend;
        }
        else {
            if (this.tail)
                this.tail.next = toAppend;
        }
        this.tail = toAppend;
        this.size++;
        this.manifest.add(data);
    }
    /**
     * Remove the head node from the list and return it.
     * @returns The head node
     */
    shift() {
        if (!this.head)
            throw new Error('Unable to dequeue an empty queue.');
        const toReturn = this.head;
        this.head = null;
        this.iteratorPointer = null;
        this.size--;
        if (toReturn.next) {
            this.head = toReturn.next;
            this.iteratorPointer = this.head;
        }
        else {
            this.tail = null;
        }
        this.manifest.delete(toReturn.data);
        return toReturn;
    }
    /**
     * Check if the list contains specific data.
     * @param data The data to search for.
     * @returns TRUE if the list has data; FALSE if it does not.
     */
    has(data) {
        return this.manifest.has(data);
    }
    /**
     * Iterate through the list.
     * @returns The next iteration value of the linked list.
     */
    next() {
        if (this.iteratorPointer) {
            const toReturn = { done: false, value: this.iteratorPointer };
            this.iteratorPointer = this.iteratorPointer.next;
            return toReturn;
        }
        else {
            // reset the iterator if we've hit the end.
            if (this.head)
                this.iteratorPointer = this.head;
            return { done: true, value: null };
        }
    }
    /**
     * Iterate over the list nodes in order.
     */
    [Symbol.iterator]() {
        return this;
    }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=LinkedList.js.map
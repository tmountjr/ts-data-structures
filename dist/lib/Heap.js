"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxHeap = exports.MinHeap = void 0;
const TreeAsArray_1 = require("./TreeAsArray");
class Heap extends TreeAsArray_1.TreeAsArray {
    constructor(initialItems, comparitor) {
        super();
        this.comparitor = comparitor;
        if (typeof comparitor === 'undefined') {
            this.comparitor = (left, right) => left > right;
        }
        initialItems.forEach(item => this.add(item));
    }
    /**
     * Check the top value in the heap.
     * @returns The value at the top of the heap.
     */
    peek() {
        if (this.size === 0)
            throw new Error('Heap is empty.');
        return this.items[0];
    }
    /**
     * Return the top value from the heap and re-order the heap.
     * @returns The value at the top of the heap.
     */
    poll() {
        if (this.size === 0)
            throw new Error('Heap is empty.');
        const item = this.items[0];
        const popped = this.items.pop();
        if (!popped)
            throw new Error('Popped undefined value.');
        this.items[0] = popped;
        this.size--;
        this.heapifyDown();
        return item;
    }
    /**
     * Add an item to the heap and re-order the heap.
     * @param item The number to add to the heap.
     */
    add(item) {
        this.items.push(item);
        this.size++;
        this.heapifyUp();
    }
    /**
     * Push the top item on the heap into its correct position.
     */
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let targetChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.comparitor(this.leftChild(index), this.rightChild(index))) {
                targetChildIndex = this.getRightChildIndex(index);
            }
            if (this.comparitor(this.items[targetChildIndex], this.items[index])) {
                break;
            }
            else {
                this.swap(index, targetChildIndex);
            }
            index = targetChildIndex;
        }
    }
    /**
     * Move the last item in the heap into its correct position.
     */
    heapifyUp() {
        let index = this.size - 1;
        while (this.hasParent(index) && this.comparitor(this.parent(index), this.items[index])) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }
}
/**
 * An implementation of the Heap structure where the parent element is smaller than its children.
 */
class MinHeap extends Heap {
    constructor(initialItems, comparitor = (left, right) => left > right) {
        super(initialItems, comparitor);
        this.comparitor = comparitor;
    }
}
exports.MinHeap = MinHeap;
/**
 * An implementation of the Heap structure where the parent element is larger than its children.
 */
class MaxHeap extends Heap {
    constructor(initialItems, comparitor = (left, right) => left < right) {
        super(initialItems, comparitor);
        this.comparitor = comparitor;
    }
}
exports.MaxHeap = MaxHeap;
//# sourceMappingURL=Heap.js.map
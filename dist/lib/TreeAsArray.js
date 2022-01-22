"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeAsArray = void 0;
class TreeAsArray {
    constructor() {
        this.size = 0;
        this.items = [];
    }
    getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
    getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
    getParentIndex(childIndex) { return (Math.floor((childIndex - 1) / 2)); }
    hasLeftChild(index) { return this.getLeftChildIndex(index) < this.size; }
    hasRightChild(index) { return this.getRightChildIndex(index) < this.size; }
    hasParent(index) { return this.getParentIndex(index) >= 0; }
    leftChild(index) { return this.items[this.getLeftChildIndex(index)]; }
    rightChild(index) { return this.items[this.getRightChildIndex(index)]; }
    parent(index) { return this.items[this.getParentIndex(index)]; }
    swap(i, j) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
    add(item) {
        this.items.push(item);
        this.size++;
    }
    peek() {
        if (this.size === 0)
            throw new Error('Tree is empty.');
        return this.items[0];
    }
    poll() {
        if (this.size === 0)
            throw new Error('Tree is empty.');
        const item = this.items.shift();
        if (!item)
            throw new Error('Tree contains undefined element.');
        this.size--;
        return item;
    }
}
exports.TreeAsArray = TreeAsArray;
//# sourceMappingURL=TreeAsArray.js.map
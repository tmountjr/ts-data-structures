"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxHeap = exports.MinHeap = void 0;
var TreeAsArray_1 = require("./TreeAsArray");
var Heap = /** @class */ (function (_super) {
    __extends(Heap, _super);
    function Heap(initialItems, comparitor) {
        var _this = _super.call(this) || this;
        _this.comparitor = comparitor;
        if (typeof comparitor === 'undefined') {
            _this.comparitor = function (left, right) { return left > right; };
        }
        initialItems.forEach(function (item) { return _this.add(item); });
        return _this;
    }
    /**
     * Check the top value in the heap.
     * @returns The value at the top of the heap.
     */
    Heap.prototype.peek = function () {
        if (this.size === 0)
            throw new Error('Heap is empty.');
        return this.items[0];
    };
    /**
     * Return the top value from the heap and re-order the heap.
     * @returns The value at the top of the heap.
     */
    Heap.prototype.poll = function () {
        if (this.size === 0)
            throw new Error('Heap is empty.');
        var item = this.items[0];
        var popped = this.items.pop();
        if (!popped)
            throw new Error('Popped undefined value.');
        this.items[0] = popped;
        this.size--;
        this.heapifyDown();
        return item;
    };
    /**
     * Add an item to the heap and re-order the heap.
     * @param item The number to add to the heap.
     */
    Heap.prototype.add = function (item) {
        this.items.push(item);
        this.size++;
        this.heapifyUp();
    };
    /**
     * Push the top item on the heap into its correct position.
     */
    Heap.prototype.heapifyDown = function () {
        var index = 0;
        while (this.hasLeftChild(index)) {
            var targetChildIndex = this.getLeftChildIndex(index);
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
    };
    /**
     * Move the last item in the heap into its correct position.
     */
    Heap.prototype.heapifyUp = function () {
        var index = this.size - 1;
        while (this.hasParent(index) && this.comparitor(this.parent(index), this.items[index])) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    };
    return Heap;
}(TreeAsArray_1.TreeAsArray));
/**
 * An implementation of the Heap structure where the parent element is smaller than its children.
 */
var MinHeap = /** @class */ (function (_super) {
    __extends(MinHeap, _super);
    function MinHeap(initialItems, comparitor) {
        if (comparitor === void 0) { comparitor = function (left, right) { return left > right; }; }
        var _this = _super.call(this, initialItems, comparitor) || this;
        _this.comparitor = comparitor;
        return _this;
    }
    return MinHeap;
}(Heap));
exports.MinHeap = MinHeap;
/**
 * An implementation of the Heap structure where the parent element is larger than its children.
 */
var MaxHeap = /** @class */ (function (_super) {
    __extends(MaxHeap, _super);
    function MaxHeap(initialItems, comparitor) {
        if (comparitor === void 0) { comparitor = function (left, right) { return left < right; }; }
        var _this = _super.call(this, initialItems, comparitor) || this;
        _this.comparitor = comparitor;
        return _this;
    }
    return MaxHeap;
}(Heap));
exports.MaxHeap = MaxHeap;
//# sourceMappingURL=Heap.js.map
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeAsArray = void 0;
var TreeAsArray = /** @class */ (function () {
    function TreeAsArray() {
        this.size = 0;
        this.items = [];
    }
    TreeAsArray.prototype.getLeftChildIndex = function (parentIndex) { return 2 * parentIndex + 1; };
    TreeAsArray.prototype.getRightChildIndex = function (parentIndex) { return 2 * parentIndex + 2; };
    TreeAsArray.prototype.getParentIndex = function (childIndex) { return (Math.floor((childIndex - 1) / 2)); };
    TreeAsArray.prototype.hasLeftChild = function (index) { return this.getLeftChildIndex(index) < this.size; };
    TreeAsArray.prototype.hasRightChild = function (index) { return this.getRightChildIndex(index) < this.size; };
    TreeAsArray.prototype.hasParent = function (index) { return this.getParentIndex(index) >= 0; };
    TreeAsArray.prototype.leftChild = function (index) { return this.items[this.getLeftChildIndex(index)]; };
    TreeAsArray.prototype.rightChild = function (index) { return this.items[this.getRightChildIndex(index)]; };
    TreeAsArray.prototype.parent = function (index) { return this.items[this.getParentIndex(index)]; };
    TreeAsArray.prototype.swap = function (i, j) {
        var _a;
        _a = __read([this.items[j], this.items[i]], 2), this.items[i] = _a[0], this.items[j] = _a[1];
    };
    TreeAsArray.prototype.add = function (item) {
        this.items.push(item);
        this.size++;
    };
    TreeAsArray.prototype.peek = function () {
        if (this.size === 0)
            throw new Error('Tree is empty.');
        return this.items[0];
    };
    TreeAsArray.prototype.poll = function () {
        if (this.size === 0)
            throw new Error('Tree is empty.');
        var item = this.items.shift();
        if (!item)
            throw new Error('Tree contains undefined element.');
        this.size--;
        return item;
    };
    return TreeAsArray;
}());
exports.TreeAsArray = TreeAsArray;
//# sourceMappingURL=TreeAsArray.js.map
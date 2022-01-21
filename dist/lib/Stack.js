"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * Node used in stacks.
 */
var StackNode = /** @class */ (function () {
    /**
     * Create a new node.
     * @param data The data for the new node.
     */
    function StackNode(data) {
        this.data = data;
        /** Pointer to the previous node in the stack. */
        this.previous = null;
    }
    return StackNode;
}());
/**
 * The stack implementation.
 */
var Stack = /** @class */ (function () {
    function Stack() {
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
    Stack.prototype.push = function (data) {
        var node = new StackNode(data);
        node.previous = this.top;
        this.top = node;
        this.size++;
        return this.top;
    };
    /**
     * Remove and return the top item of the stack.
     * @returns The item from the top of the stack.
     */
    Stack.prototype.pop = function () {
        var _a;
        if (this.size === 0)
            return null;
        var temp = this.top;
        var prev = (_a = this.top) === null || _a === void 0 ? void 0 : _a.previous;
        if (!prev)
            throw new Error('No child detected.');
        this.top = prev;
        this.size--;
        return temp;
    };
    return Stack;
}());
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map
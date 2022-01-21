"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = void 0;
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    /**
     * Traverse through the tree, starting with the current node, using inorder traversal.
     * @returns The next node in the given order.
     */
    TreeNode.prototype.inOrder = function () {
        var _a;
        var _this = this;
        /** The stack to use for this iterator. */
        var stack = [];
        /**
         * Set up a function to rebuild the stack as necessary.
         */
        var buildStack = function () {
            var current = _this;
            var temp = [];
            while (temp.length || current) {
                if (current) {
                    temp.push(current);
                    current = current.left;
                }
                else {
                    current = temp.pop();
                    if (current) {
                        stack.push(current);
                        current = current.right;
                    }
                }
            }
        };
        // build the initial stack.
        buildStack();
        return _a = {},
            _a[Symbol.iterator] = function () {
                return {
                    next: function () {
                        if (stack.length)
                            return { done: false, value: stack.shift() };
                        // Rebuild the stack for the next iteration.
                        buildStack();
                        return { done: true, value: null };
                    }
                };
            },
            _a;
    };
    /**
     * Traverse through the tree, starting with the current node, using preorder traversal.
     * @returns The next node in the given order.
     */
    TreeNode.prototype.preOrder = function () {
        var _a;
        var _this = this;
        /** The stack to use for this iterator. */
        var stack = [];
        /**
         * Set up a function to rebuild the stack as necessary.
         */
        var buildStack = function () {
            var current = _this;
            var temp = [];
            temp.push(current);
            while (temp.length) {
                current = temp.pop();
                if (current) {
                    stack.push(current);
                    if (current.right)
                        temp.push(current.right);
                    if (current.left)
                        temp.push(current.left);
                }
            }
        };
        // build the initial stack.
        buildStack();
        return _a = {},
            _a[Symbol.iterator] = function () {
                return {
                    next: function () {
                        if (stack.length)
                            return { done: false, value: stack.shift() };
                        // Rebuild the stack for the next iteration.
                        buildStack();
                        return { done: true, value: null };
                    }
                };
            },
            _a;
    };
    /**
     * Traverse through the tree, starting with the current node, using postorder traversal.
     * @returns The next node in the given order.
     */
    TreeNode.prototype.postOrder = function () {
        var _a;
        var _this = this;
        /** The stack to use for this iterator. */
        var stack = [];
        /**
         * Set up a function to rebuild the stack as necessary.
         */
        var buildStack = function () {
            var current = _this;
            var temp = [];
            temp.push(current);
            while (temp.length) {
                current = temp.pop();
                if (current) {
                    stack.push(current);
                    if (current.left)
                        temp.push(current.left);
                    if (current.right)
                        temp.push(current.right);
                }
            }
        };
        buildStack();
        return _a = {},
            _a[Symbol.iterator] = function () {
                return {
                    next: function () {
                        if (stack.length)
                            return { done: false, value: stack.pop() };
                        // Rebuild the stack for the next iteration.
                        buildStack();
                        return { done: true, value: null };
                    }
                };
            },
            _a;
    };
    return TreeNode;
}());
var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.root = null;
    }
    /**
     * Insert a value into the binary tree.
     * @param value The value to insert.
     * @returns {void}
     */
    BinaryTree.prototype.insert = function (value) {
        var toInsert = new TreeNode(value);
        if (this.root === null) {
            this.root = toInsert;
            return toInsert;
        }
        var current = this.root;
        while (current) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = toInsert;
                    return toInsert;
                }
                current = current.left;
            }
            else {
                if (current.right === null) {
                    current.right = toInsert;
                    return toInsert;
                }
                current = current.right;
            }
        }
    };
    /**
     * See if the tree contains a specific value.
     * @param value The value to search for.
     * @returns The node at which the value was found, or FALSE if not found.
     */
    BinaryTree.prototype.contains = function (value) {
        if (!this.root)
            return false;
        var current = this.root;
        var found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            }
            else if (value > current.value) {
                current = current.right;
            }
            else {
                found = current;
            }
        }
        return found;
    };
    /**
     * Delete a value from a root.
     * @param root The root of the deletion process.
     * @param value The value to delete
     * @returns The new root following the deletion.
     */
    BinaryTree.prototype.delete = function (root, value) {
        // find the value and keep track of its parent
        var parentNode = null;
        var current = root;
        while (current && current.value !== value) {
            parentNode = current;
            if (value < current.value) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        if (!current) {
            return;
        }
        if (!current.left && !current.right) {
            if (current !== root && parentNode) {
                if (parentNode.left === current) {
                    parentNode.left = null;
                }
                else {
                    parentNode.right = null;
                }
            }
            else {
                root = null;
            }
        }
        else if (current.left && current.right) {
            var successor = current.right;
            while (successor.left) {
                successor = successor.left;
            }
            var successorValue = successor.value;
            this.delete(root, successorValue);
            current.value = successorValue;
        }
        else {
            var child = current.left
                ? current.left
                : current.right;
            if (current !== root && parentNode) {
                if (current === parentNode.left) {
                    parentNode.left = child;
                }
                else {
                    parentNode.right = child;
                }
            }
            else {
                root = child;
            }
        }
        return root;
    };
    /**
     * Iterator options
     */
    /**
     * Iterate through the tree using inorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    BinaryTree.prototype.inOrder = function (rootNode) {
        if (rootNode === void 0) { rootNode = null; }
        var node = rootNode || this.root;
        if (node)
            return node.inOrder();
    };
    /**
     * Iterate through the tree using preorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    BinaryTree.prototype.preOrder = function (rootNode) {
        if (rootNode === void 0) { rootNode = null; }
        var node = rootNode || this.root;
        if (node)
            return node.preOrder();
    };
    /**
     * Iterate through the tree using postorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    BinaryTree.prototype.postOrder = function (rootNode) {
        if (rootNode === void 0) { rootNode = null; }
        var node = rootNode || this.root;
        if (node)
            return node.postOrder();
    };
    return BinaryTree;
}());
exports.BinaryTree = BinaryTree;
//# sourceMappingURL=BinaryTree.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryTree = void 0;
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    /**
     * Traverse through the tree, starting with the current node, using inorder traversal.
     * @returns The next node in the given order.
     */
    inOrder() {
        /** The stack to use for this iterator. */
        let stack = [];
        /**
         * Set up a function to rebuild the stack as necessary.
         */
        const buildStack = () => {
            let current = this;
            const temp = [];
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
        return {
            [Symbol.iterator]: () => {
                return {
                    next: () => {
                        if (stack.length)
                            return { done: false, value: stack.shift() };
                        // Rebuild the stack for the next iteration.
                        buildStack();
                        return { done: true, value: null };
                    }
                };
            }
        };
    }
    /**
     * Traverse through the tree, starting with the current node, using preorder traversal.
     * @returns The next node in the given order.
     */
    preOrder() {
        /** The stack to use for this iterator. */
        let stack = [];
        /**
         * Set up a function to rebuild the stack as necessary.
         */
        const buildStack = () => {
            let current = this;
            const temp = [];
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
        return {
            [Symbol.iterator]: () => {
                return {
                    next: () => {
                        if (stack.length)
                            return { done: false, value: stack.shift() };
                        // Rebuild the stack for the next iteration.
                        buildStack();
                        return { done: true, value: null };
                    }
                };
            }
        };
    }
    /**
     * Traverse through the tree, starting with the current node, using postorder traversal.
     * @returns The next node in the given order.
     */
    postOrder() {
        /** The stack to use for this iterator. */
        let stack = [];
        /**
         * Set up a function to rebuild the stack as necessary.
         */
        const buildStack = () => {
            let current = this;
            const temp = [];
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
        return {
            [Symbol.iterator]: () => {
                return {
                    next: () => {
                        if (stack.length)
                            return { done: false, value: stack.pop() };
                        // Rebuild the stack for the next iteration.
                        buildStack();
                        return { done: true, value: null };
                    }
                };
            }
        };
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
    }
    /**
     * Insert a value into the binary tree.
     * @param value The value to insert.
     * @returns {void}
     */
    insert(value) {
        const toInsert = new TreeNode(value);
        if (this.root === null) {
            this.root = toInsert;
            return toInsert;
        }
        let current = this.root;
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
    }
    /**
     * See if the tree contains a specific value.
     * @param value The value to search for.
     * @returns The node at which the value was found, or FALSE if not found.
     */
    contains(value) {
        if (!this.root)
            return false;
        let current = this.root;
        let found = false;
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
    }
    /**
     * Delete a value from a root.
     * @param root The root of the deletion process.
     * @param value The value to delete
     * @returns The new root following the deletion.
     */
    delete(root, value) {
        // find the value and keep track of its parent
        let parentNode = null;
        let current = root;
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
            let successor = current.right;
            while (successor.left) {
                successor = successor.left;
            }
            let successorValue = successor.value;
            this.delete(root, successorValue);
            current.value = successorValue;
        }
        else {
            let child = current.left
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
    }
    /**
     * Iterator options
     */
    /**
     * Iterate through the tree using inorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    inOrder(rootNode = null) {
        const node = rootNode || this.root;
        if (node)
            return node.inOrder();
    }
    /**
     * Iterate through the tree using preorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    preOrder(rootNode = null) {
        const node = rootNode || this.root;
        if (node)
            return node.preOrder();
    }
    /**
     * Iterate through the tree using postorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    postOrder(rootNode = null) {
        const node = rootNode || this.root;
        if (node)
            return node.postOrder();
    }
}
exports.BinaryTree = BinaryTree;
//# sourceMappingURL=BinaryTree.js.map
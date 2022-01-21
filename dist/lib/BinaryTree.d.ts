declare class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(value: T);
    /**
     * Traverse through the tree, starting with the current node, using inorder traversal.
     * @returns The next node in the given order.
     */
    inOrder(): {
        [Symbol.iterator]: () => {
            next: () => {
                done: boolean;
                value: TreeNode<T> | undefined;
            } | {
                done: boolean;
                value: null;
            };
        };
    };
    /**
     * Traverse through the tree, starting with the current node, using preorder traversal.
     * @returns The next node in the given order.
     */
    preOrder(): {
        [Symbol.iterator]: () => {
            next: () => {
                done: boolean;
                value: TreeNode<T> | undefined;
            } | {
                done: boolean;
                value: null;
            };
        };
    };
    /**
     * Traverse through the tree, starting with the current node, using postorder traversal.
     * @returns The next node in the given order.
     */
    postOrder(): {
        [Symbol.iterator]: () => {
            next: () => {
                done: boolean;
                value: TreeNode<T> | undefined;
            } | {
                done: boolean;
                value: null;
            };
        };
    };
}
export declare class BinaryTree<T> {
    root: TreeNode<T> | null;
    constructor();
    /**
     * Insert a value into the binary tree.
     * @param value The value to insert.
     * @returns {void}
     */
    insert(value: T): TreeNode<T> | void;
    /**
     * See if the tree contains a specific value.
     * @param value The value to search for.
     * @returns The node at which the value was found, or FALSE if not found.
     */
    contains(value: T): boolean | TreeNode<T>;
    /**
     * Delete a value from a root.
     * @param root The root of the deletion process.
     * @param value The value to delete
     * @returns The new root following the deletion.
     */
    delete(root: TreeNode<T> | null, value: T): TreeNode<T> | null | void;
    /**
     * Iterator options
     */
    /**
     * Iterate through the tree using inorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    inOrder(rootNode?: TreeNode<T> | null): {
        [Symbol.iterator]: () => {
            next: () => {
                done: boolean;
                value: TreeNode<T> | undefined;
            } | {
                done: boolean;
                value: null;
            };
        };
    } | undefined;
    /**
     * Iterate through the tree using preorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    preOrder(rootNode?: TreeNode<T> | null): {
        [Symbol.iterator]: () => {
            next: () => {
                done: boolean;
                value: TreeNode<T> | undefined;
            } | {
                done: boolean;
                value: null;
            };
        };
    } | undefined;
    /**
     * Iterate through the tree using postorder traversal starting with rootNode.
     * @param rootNode The node to start; if omitted, starts at the tree root.
     * @returns The next node in the given order.
     */
    postOrder(rootNode?: TreeNode<T> | null): {
        [Symbol.iterator]: () => {
            next: () => {
                done: boolean;
                value: TreeNode<T> | undefined;
            } | {
                done: boolean;
                value: null;
            };
        };
    } | undefined;
}
export {};
//# sourceMappingURL=BinaryTree.d.ts.map
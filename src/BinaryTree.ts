class TreeNode<T> {
  left: TreeNode<T> = null;
  right: TreeNode<T> = null;
  constructor(public value: T) { }

  /**
   * Traverse through the tree, starting with the current node, using inorder traversal.
   * @returns The next node in the given order.
   */
  inOrder() {
    /** The stack to use for this iterator. */
    let stack: TreeNode<T>[] = [];

    /**
     * Set up a function to rebuild the stack as necessary.
     */
    const buildStack = () => {
      let current: TreeNode<T> = this;
      const temp: TreeNode<T>[] = [];

      while (temp.length || current) {
        if (current) {
          temp.push(current);
          current = current.left;
        } else {
          current = temp.pop();
          stack.push(current);
          current = current.right;
        }
      }
    }

    // build the initial stack.
    buildStack();

    return {
      [Symbol.iterator]: () => {
        return {
          next: () => {
            if (stack.length) return { done: false, value: stack.shift() };
            // Rebuild the stack for the next iteration.
            buildStack();
            return { done: true, value: null };
          }
        }
      }
    }
  }

  /**
   * Traverse through the tree, starting with the current node, using preorder traversal.
   * @returns The next node in the given order.
   */
  preOrder() {
    /** The stack to use for this iterator. */
    let stack: TreeNode<T>[] = [];

    /**
     * Set up a function to rebuild the stack as necessary.
     */
    const buildStack = () => {
      let current: TreeNode<T> = this;
      const temp: TreeNode<T>[] = [];

      temp.push(current);

      while (temp.length) {
        current = temp.pop();
        stack.push(current);
        if (current.right) temp.push(current.right);
        if (current.left) temp.push(current.left);
      }
    }

    // build the initial stack.
    buildStack();

    return {
      [Symbol.iterator]: () => {

        return {
          next: () => {
            if (stack.length) return { done: false, value: stack.shift() };
            // Rebuild the stack for the next iteration.
            buildStack();
            return { done: true, value: null };
          }
        }
      }
    }
  }

  /**
   * Traverse through the tree, starting with the current node, using postorder traversal.
   * @returns The next node in the given order.
   */
  postOrder() {
    /** The stack to use for this iterator. */
    let stack: TreeNode<T>[] = [];

    /**
     * Set up a function to rebuild the stack as necessary.
     */
    const buildStack = () => {
      let current: TreeNode<T> = this;
      const temp: TreeNode<T>[] = [];

      temp.push(current);
      while (temp.length) {
        current = temp.pop();
        stack.push(current);
        if (current.left) temp.push(current.left);
        if (current.right) temp.push(current.right);
      }
    }

    buildStack();

    return {
      [Symbol.iterator]: () => {
        return {
          next: () => {
            if (stack.length) return { done: false, value: stack.pop() };
            // Rebuild the stack for the next iteration.
            buildStack();
            return { done: true, value: null };
          }
        }
      }
    }
  }
}

export class BinaryTree<T> {
  root: TreeNode<T> = null;

  constructor() { }

  /**
   * Insert a value into the binary tree.
   * @param value The value to insert.
   * @returns {void}
   */
  insert(value: T): TreeNode<T> {
    const toInsert = new TreeNode<T>(value);
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
      } else {
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
  contains(value: T): boolean|TreeNode<T> {
    if (!this.root) return false;

    let current = this.root;
    let found: boolean|TreeNode<T> = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
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
  delete(root: TreeNode<T>, value: T): TreeNode<T> {
    // find the value and keep track of its parent
    let parentNode: TreeNode<T> = null;
    let current = root;
    while (current && current.value !== value) {
      parentNode = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (!current) {
      return;
    }
    if (!current.left && !current.right) {
      if (current !== root) {
        if (parentNode.left === current) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      } else {
        root = null;
      }
    } else if (current.left && current.right) {
      let successor = current.right;
      while(successor.left) {
        successor = successor.left;
      }
      let successorValue = successor.value;
      this.delete(root, successorValue);
      current.value = successorValue;
    } else {
      let child = current.left
        ? current.left
        : current.right;

      if (current !== root) {
        if (current === parentNode.left) {
          parentNode.left = child;
        } else {
          parentNode.right = child;
        }
      } else {
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
  inOrder(rootNode: TreeNode<T> = null) {
    const node = rootNode || this.root;
    return node.inOrder();
  }

  /**
   * Iterate through the tree using preorder traversal starting with rootNode.
   * @param rootNode The node to start; if omitted, starts at the tree root.
   * @returns The next node in the given order.
   */
  preOrder(rootNode: TreeNode<T> = null) {
    const node = rootNode || this.root;
    return node.preOrder();
  }

  /**
   * Iterate through the tree using postorder traversal starting with rootNode.
   * @param rootNode The node to start; if omitted, starts at the tree root.
   * @returns The next node in the given order.
   */
  postOrder(rootNode: TreeNode<T> = null) {
    const node = rootNode || this.root;
    return node.postOrder();
  }
}
/**
 * Node used in stacks.
 */
class StackNode<T> {
  /** Pointer to the previous node in the stack. */
  previous: StackNode<T>|null = null;

  /**
   * Create a new node.
   * @param data The data for the new node.
   */
  constructor(public data: T) { }
}

/**
 * The stack implementation.
 */
export class Stack<T> {
  /** The top of the stack. */
  top: StackNode<T>|null = null;

  /** The number of items in the stack. */
  size = 0;

  /**
   * Add a new item to the stack.
   * @param data The data to add.
   * @returns A pointer to the top of the stack.
   */
  push(data: T): StackNode<T> {
    const node = new StackNode<T>(data);
    node.previous = this.top;
    this.top = node;
    this.size++;
    return this.top;
  }

  /**
   * Remove and return the top item of the stack.
   * @returns The item from the top of the stack.
   */
  pop(): StackNode<T>|null {
    if (this.size === 0) return null;
    const temp = this.top;
    const prev = this.top?.previous;
    if (!prev) throw new Error('No child detected.');
    this.top = prev;
    this.size--;
    return temp;
  }
}
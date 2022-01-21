/**
 * A node for data found in a LinkedList.
 */
export class ListNode<T> {
  public data: T;
  public next: ListNode<T> | null = null;

  /**
   * Create a new node.
   * @param data The data to use when creating the node.
   */
  constructor(data: T) {
    this.data = data;
  }
}

/**
 * A linked list object.
 */
export class LinkedList<T> implements IterableIterator<ListNode<T>> {
  /**
   * The head node of the list.
   */
  public head: ListNode<T> | null = null;

  /**
   * The tail node of the list.
   */
  public tail: ListNode<T> | null = null;

  /**
   * The number of objects in the list.
   */
  public size: number = 0;

  /**
   * A list of data values found in the list for quick lookups.
   */
  private manifest: Set<T> = new Set;

  /**
   * Used in iterations.
   */
  private iteratorPointer: ListNode<T>|null = null;

  constructor(data: T[] = []) {
    if (data.length) {
      for (let i: number = 0; i < data.length; i++) {
        this.add(data[i]);
      }
    }
  }

  /**
   * Add data to the end of the list.
   * @param data The data to add to the list.
   */
  add(data: T): void {
    const toAppend: ListNode<T> = new ListNode(data);
    if (!this.head) {
      this.head = toAppend;
      this.iteratorPointer = toAppend;
    } else {
      if (this.tail) this.tail.next = toAppend;
    }
    this.tail = toAppend;
    this.size++;
    this.manifest.add(data);
  }

  /**
   * Remove the head node from the list and return it.
   * @returns The head node
   */
  shift(): ListNode<T> {
    if (!this.head) throw new Error('Unable to dequeue an empty queue.');
    const toReturn: ListNode<T> = this.head;
    this.head = null;
    this.iteratorPointer = null;
    this.size--;
    if (toReturn.next) {
      this.head = toReturn.next;
      this.iteratorPointer = this.head;
    } else {
      this.tail = null;
    }
    this.manifest.delete(toReturn.data);
    return toReturn;
  }

  /**
   * Check if the list contains specific data.
   * @param data The data to search for.
   * @returns TRUE if the list has data; FALSE if it does not.
   */
  has(data: T): boolean {
    return this.manifest.has(data);
  }

  /**
   * Iterate through the list.
   * @returns The next iteration value of the linked list.
   */
  next(): IteratorResult<ListNode<T>> {
    if (this.iteratorPointer) {
      const toReturn = { done: false, value: this.iteratorPointer };
      this.iteratorPointer = this.iteratorPointer.next;
      return toReturn;
    } else {
      // reset the iterator if we've hit the end.
      if (this.head) this.iteratorPointer = this.head;
      return { done: true, value: null };
    }
  }

  /**
   * Iterate over the list nodes in order.
   */
  [Symbol.iterator](): IterableIterator<ListNode<T>> {
    return this;
  }
}
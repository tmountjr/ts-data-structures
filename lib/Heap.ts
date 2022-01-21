import { TreeAsArray } from './TreeAsArray';

export interface IHeap {
  peek(): void;
  poll(): number;
  add(item: number): void;
}

interface IHeapConstructor<T1 = number, T2 = number, T3 = boolean> {
  (left: T1, right: T2): T3;
}

class Heap extends TreeAsArray<number> implements IHeap {
  constructor(
    initialItems: number[],
    protected comparitor: IHeapConstructor
  ) {
    super();
    if (typeof comparitor === 'undefined') {
      this.comparitor = (left: number, right: number) => left > right;
    }
    initialItems.forEach(item => this.add(item));
  }

  /**
   * Check the top value in the heap.
   * @returns The value at the top of the heap.
   */
  public peek(): number {
    if (this.size === 0) throw new Error('Heap is empty.');
    return this.items[0];
  }

  /**
   * Return the top value from the heap and re-order the heap.
   * @returns The value at the top of the heap.
   */
  public poll(): number {
    if (this.size === 0) throw new Error('Heap is empty.');
    const item = this.items[0];
    const popped = this.items.pop();
    if (!popped) throw new Error('Popped undefined value.');
    this.items[0] = popped;
    this.size--;
    this.heapifyDown();
    return item;
  }

  /**
   * Add an item to the heap and re-order the heap.
   * @param item The number to add to the heap.
   */
  public add(item: number): void {
    this.items.push(item);
    this.size++;
    this.heapifyUp();
  }

  /**
   * Push the top item on the heap into its correct position.
   */
  protected heapifyDown(): void {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let targetChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.comparitor(this.leftChild(index), this.rightChild(index))) {
        targetChildIndex = this.getRightChildIndex(index);
      }
      if (this.comparitor(this.items[targetChildIndex], this.items[index])) {
        break;
      } else {
        this.swap(index, targetChildIndex);
      }
      index = targetChildIndex;
    }
  }

  /**
   * Move the last item in the heap into its correct position.
   */
  protected heapifyUp(): void {
    let index = this.size - 1;
    while (this.hasParent(index) && this.comparitor(this.parent(index), this.items[index])) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }
}

/**
 * An implementation of the Heap structure where the parent element is smaller than its children.
 */
export class MinHeap extends Heap {
  constructor(
    initialItems: number[],
    protected comparitor: IHeapConstructor = (left: number, right: number): boolean => left > right
  ) {
    super(initialItems, comparitor);
  }
}

/**
 * An implementation of the Heap structure where the parent element is larger than its children.
 */
export class MaxHeap extends Heap {
  constructor(
    initialItems: number[],
    protected comparitor: IHeapConstructor = (left: number, right: number): boolean => left < right
  ) {
    super(initialItems, comparitor);
  }
}


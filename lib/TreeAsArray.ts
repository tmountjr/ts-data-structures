import { timeStamp } from "console";

export class TreeAsArray<T> {
  public size: number = 0;
  protected items: Array<T> = [];

  protected getLeftChildIndex(parentIndex: number) { return 2 * parentIndex + 1; }
  protected getRightChildIndex(parentIndex: number) { return 2 * parentIndex + 2; }
  protected getParentIndex(childIndex: number) { return (Math.floor((childIndex - 1) / 2)); }

  protected hasLeftChild(index: number) { return this.getLeftChildIndex(index) < this.size; }
  protected hasRightChild(index: number) { return this.getRightChildIndex(index) < this.size; }
  protected hasParent(index: number) { return this.getParentIndex(index) >= 0; }

  protected leftChild(index: number) { return this.items[this.getLeftChildIndex(index)]; }
  protected rightChild(index: number) { return this.items[this.getRightChildIndex(index)]; }
  protected parent(index: number) { return this.items[this.getParentIndex(index)]; }

  protected swap(i: number, j: number) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }

  public add(item: T): void {
    this.items.push(item);
    this.size++;
  }

  public peek(): T {
    if (this.size === 0) throw new Error('Tree is empty.');
    return this.items[0];
  }

  public poll(): T {
    if (this.size === 0) throw new Error('Tree is empty.');
    const item = this.items.shift();
    if (!item) throw new Error('Tree contains undefined element.');
    this.size--;
    return item;
  }
}
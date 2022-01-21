import * as expect from 'expect';
import { TreeAsArray } from './TreeAsArray';

let tree: TreeAsArray<number> = null;

describe('Test TreeAsArray functionality', () => {
  // Before each test, set up a new tree.
  beforeEach(() => {
    tree = new TreeAsArray<number>();
    tree.add(1);
    tree.add(2);
    tree.add(3);
  });

  it('items added increase the size of the tree', () => {
    expect(tree.size).toEqual(3);
  });
  it('items polled should decrease the array size', () => {
    tree.poll();
    expect(tree.size).toEqual(2);
  });
  it('items polled should be polled from the front of the array', () => {
    let polled = tree.poll();
    expect(polled).toEqual(1);
    polled = tree.poll();
    expect(polled).toEqual(2);
  })
  it('peeked item should be the first one added', () => {
    const peeked = tree.peek();
    expect(peeked).toEqual(1);
  });
  it('peeking should not remove items from the array', () => {
    tree.peek();
    expect(tree.size).toEqual(3);
  });
});
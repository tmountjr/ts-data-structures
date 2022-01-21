import * as expect from 'expect';
import { BinaryTree } from './BinaryTree';

let tree: BinaryTree<number> = null;

describe('Test Binary Tree functionality', () => {
  beforeEach(() => {
    tree = new BinaryTree<number>();
    tree.insert(4);
    tree.insert(2);
    tree.insert(5);
    tree.insert(3);
    tree.insert(0);
    tree.insert(1);

    /**
     * intended structure:
     *         4      
     *      2     5   
     *   0    3       
     *    1           
     */
  });

  it('insert adds leaf to the appropriate node', () => {
    const inserted = tree.insert(6);
    expect(tree.root.right.right).toStrictEqual(inserted);
  });
  it('contains should return a reference to a found node', () => {
    const found = tree.contains(1);
    expect(tree.root.left.left.right).toStrictEqual(found);
  });
  it('contains should return a boolean if a node is not found', () => {
    const found = tree.contains(7);
    expect(found).toStrictEqual(false);
  });
  describe('Test delete cases', () => {
    it('deleting a leaf should result in no structure changes', () => {
      tree.delete(tree.root, 1);
      const zero = tree.root.left.left;
      expect(zero.left).toBeNull();
      expect(zero.right).toBeNull();
    });
    it('deleting a node with two children should promote the smallest child of the deleted node\'s largest child', () => {
      tree.delete(tree.root, 2);
      const three = tree.root.left;
      expect(three.right).toBeNull();
      expect(three.left.value).toEqual(0)
      expect(three.left.left).toBeNull();
      expect(three.left.right.value).toEqual(1);
    });
    it('deleting a node with only one child should promote that child to its place', () => {
      tree.delete(tree.root, 0);
      const one = tree.root.left.left;
      expect(one.value).toEqual(1);
    });
  });
  describe('Test traversal cases', () => {
    it('preorder traversal (from node)', () => {
      const expected = [ 4, 2, 0, 1, 3, 5];
      const actual = [...tree.root.preOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
    it('preorder traversal (from tree)', () => {
      const expected = [ 4, 2, 0, 1, 3, 5];
      const actual = [...tree.preOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
    it('interior preorder traversal', () => {
      const expected = [ 2, 0, 1, 3 ];
      const actual = [...tree.preOrder(tree.root.left)].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });

    it('inorder traversal (from node)', () => {
      const expected = [ 0, 1, 2, 3, 4, 5 ];
      const actual = [...tree.root.inOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
    it('inorder traversal (from tree)', () => {
      const expected = [ 0, 1, 2, 3, 4, 5 ];
      const actual = [...tree.inOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
    it('interior inorder traversal', () => {
      const expected = [0, 1, 2, 3];
      const actual = [...tree.root.left.inOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });

    it('postorder traversal (from node)', () => {
      const expected = [ 1, 0, 3, 2, 5, 4 ];
      const actual = [...tree.root.postOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
    it('postorder traversal (from tree)', () => {
      const expected = [ 1, 0, 3, 2, 5, 4 ];
      const actual = [...tree.postOrder()].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
    it('interior postorder traversal', () => {
      const expected = [ 1, 0, 3, 2 ];
      const actual = [...tree.postOrder(tree.root.left)].map(n => n.value);
      expect(expected).toStrictEqual(actual);
    });
  });
});
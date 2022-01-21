import * as expect from 'expect';
import { isSpreadAssignment } from 'typescript';
import { ListNode, LinkedList } from './LinkedList';

describe('Test Linked List functionality', () => {
  describe('Test List Node functionality', () => {
    it('initializing with a value saves the value properly', () => {
      const node = new ListNode<string>('a');
      expect(node.data).toEqual('a');
    });
  });

  describe('Test Linked List functionality', () => {
    describe('"add" method functionality', () => {
      it('creating with a list of data points populates the list correctly', () => {
        const list = new LinkedList<string>(['a', 'b', 'c']);
        expect(list.size).toEqual(3);
        expect(list.head.data).toEqual('a');
        expect(list.tail.data).toEqual('c');
        expect(list.head.next.data).toEqual('b');
        expect(list.head.next.next.data).toEqual('c');
      });
      it('adding data manually maintains the correct "size" value', () => {
        const list = new LinkedList<string>(['a']);
        list.add('b');
        expect(list.size).toEqual(2);
      });
      it('adding data manually sets the correct "next" pointer', () => {
        const list = new LinkedList<string>(['a']);
        list.add('b');
        expect(list.head.next.data).toEqual('b');
      });
      it('adding data manually sets the correct "tail" pointer', () => {
        const list = new LinkedList<string>(['a']);
        list.add('b');
        expect(list.tail.data).toEqual('b');
      });
    });
    describe('"shift" method functionality', () => {
      it('shifting the first value returns the correct value', () => {
        const list = new LinkedList<string>(['a']);
        list.add('b');
        const shifted = list.shift();
        expect(shifted.data).toEqual('a');
      });
      it('shifting the first value sets the list\'s "head" property properly', () => {
        const list = new LinkedList<string>(['a']);
        list.add('b');
        list.shift();
        expect(list.head.data).toEqual('b');
      });
      it('shifting a single-element list nulls both "head" and "tail" properties', () => {
        const list = new LinkedList<string>(['a']);
        list.shift();
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
      });
    });
    describe('"has" method functionality', () => {
      it('returns boolean TRUE when the item is found', () => {
        const list = new LinkedList<string>(['a']);
        const actual = list.has('a');
        expect(actual).toStrictEqual(true);
      });
      it('returns boolean FALSE when the item is not found', () => {
        const list = new LinkedList<string>(['a']);
        const actual = list.has('b');
        expect(actual).toStrictEqual(false);
      });
    });
    describe('iterator functionality', () => {
      it('iterates properly the first time', () => {
        const input = ['a', 'b', 'c'];
        const list = new LinkedList<string>(input);
        const spread = [...list].map(x => x.data);
        expect(spread).toStrictEqual(input);
      });
      it('iterates properly multiple times', () => {
        const input = ['a', 'b', 'c'];
        const list = new LinkedList<string>(input);
        const spread = [...list];
        const spread2 = [...list].map(x => x.data);
        expect(spread2).toStrictEqual(input);
      });
    });
  });
});
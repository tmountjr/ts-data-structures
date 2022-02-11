import * as expect from 'expect';
import { MinHeap, MaxHeap } from './Heap';

// methods: peek(), poll(), add()

const input = [7, 8, -2, 3];
let cloned: number[] = null;

describe('Test Heaps', () => {
  describe('Test MinHeap', () => {

    before(() => {
      cloned = [...input];
      cloned.sort((a, b) => a - b);
    });

    it('adds values in min order properly', () => {
      const minHeap = new MinHeap([]);
      input.forEach(x => minHeap.add(x));
      for (let i = 0; i < input.length; i++) {
        expect(minHeap.poll()).toEqual(cloned[i]);
      }
    });
    it('creates the heap properly with an array in the constructor', () => {
      const minHeap = new MinHeap(input);
      for (let i = 0; i < input.length; i++) {
        expect(minHeap.poll()).toEqual(cloned[i]);
      }
    });
    it('peeking shows correct min value', () => {
      const minHeap = new MinHeap(input);
      expect(minHeap.peek()).toEqual(cloned[0]);
    });
    it('polling a single-element heap collapses the entire heap', () => {
      const minHeap = new MinHeap([1]);
      const polled = minHeap.poll();
      expect(polled).toEqual(1);
      expect(minHeap.size).toEqual(0);

      // Adding a larger element than the one added before should peek the larger element;
      minHeap.add(2);
      expect(minHeap.peek()).toEqual(2);
    });
  });

  describe('Test MaxHeap', () => {

    before(() => {
      cloned = [...input];
      cloned.sort((a, b) => b - a);
    });

    it('adds values in max order properly', () => {
      const maxHeap = new MaxHeap([]);
      input.forEach(x => maxHeap.add(x));
      for (let i = 0; i < input.length; i++) {
        expect(maxHeap.poll()).toEqual(cloned[i]);
      }
    });
    it('creates the heap properly with an array in the constructor', () => {
      const maxHeap = new MaxHeap(input);
      for (let i = 0; i < input.length; i++) {
        expect(maxHeap.poll()).toEqual(cloned[i]);
      }
    });
    it('peeking shows correct max value', () => {
      const maxHeap = new MaxHeap(input);
      expect(maxHeap.peek()).toEqual(cloned[0]);
    });
    it('polling a single-element heap collapses the entire heap', () => {
      const maxHeap = new MaxHeap([2]);
      const polled = maxHeap.poll();
      expect(polled).toEqual(2);
      expect(maxHeap.size).toEqual(0);
      
      // Adding a smaller element than the one added before should peek the smaller element
      maxHeap.add(1);
      expect(maxHeap.peek()).toEqual(1);
    });
  })
});
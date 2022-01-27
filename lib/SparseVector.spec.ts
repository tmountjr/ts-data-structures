import * as expect from 'expect';
import { SparseVector } from './SparseVector';

describe('Test Sparse Vector functionality', () => {
  let A: SparseVector, B: SparseVector;

  beforeEach(() => {
    A = new SparseVector([0, 0, 1, 2, 3, 4]);
    B = new SparseVector([1, 2, 3, 4, 0, 0]);
  });

  it('registers the length properly', () => {
    expect(A.length).toEqual(4);
  });
  it('maps the values properly', () => {
    expect(A.mapping[2]).toEqual(1);
    expect(A.mapping[3]).toEqual(2);
    expect(A.mapping[4]).toEqual(3);
    expect(A.mapping[5]).toEqual(4);
  });
  it('calculates the dot product correctly', () => {
    const actual = A.dotProduct(B);
    expect(actual).toEqual(11);
  });
});
import * as expect from 'expect';
import * as functions from './Sorter';

const input = [3, 11, 7, 31, 19, 1, 2, 18, 8, 34, 29, 49, 39, 20, 6];
const expected = [1, 2, 3, 6, 7, 8, 11, 18, 19, 20, 29, 31, 34, 39, 49];

const runner = (type: string) => {
  describe(`Test ${type} output`, () => {
    it('sorts properly', () => {
      const cloned = [...input];
      functions[type](cloned);
      expect(cloned).toStrictEqual(expected);
    });
  });
};

describe('Test sorter methods', () => {
  Object.keys(functions).forEach(name => runner(name));
});
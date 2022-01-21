import * as expect from 'expect';
import { Stack } from './Stack';

describe('Test Stack functionality', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
  });

  it('pushing data increments the size', () => {
    expect(stack.size).toEqual(3);
  });
  it('data is pushed at the top of the stack', () => {
    expect(stack.top.data).toEqual(3);
  });
  it('data is popped in the correct order', () => {
    expect(stack.pop().data).toEqual(3);
    expect(stack.pop().data).toEqual(2);
    expect(stack.pop().data).toEqual(1);
  });
  it('popping data decrements the size', () => {
    stack.pop();
    expect(stack.size).toEqual(2);
  });
});
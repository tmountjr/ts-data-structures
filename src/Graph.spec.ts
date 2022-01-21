import * as expect from 'expect';
import { Graph } from './Graph';

describe('Test Graph functionality', () => {
  let graph: Graph<string> = null;
  beforeEach(() => {
    graph = new Graph<string>();
    graph.addNode('a');
    graph.addNode('b');
    graph.addNode('c');

    graph.addEdge('a', 'b', false); // A -> B
    graph.addEdge('a', 'c', true);  // A <-> C
    graph.addEdge('c', 'b', false); // B <- C

    //      A -> B
    //      ^    ^
    //      v    |
    //      C --->

    // A can go to B directly or via C
    // B cannot go anywhere
    // C can go to B directly or via A
  });

  describe('Test via depth-first search', () => {
    it('directed edges work properly (iteration)', () => {
      // validate direct connection (a -> b)
      expect(graph.hasPathDFSIteration('a', 'b')).toStrictEqual(true);

      // validate one-hop connection (c -> a -> b)
      expect(graph.hasPathDFSIteration('c', 'b')).toStrictEqual(true);

      // validate lack of connection (b -> anywhere)
      expect(graph.hasPathDFSIteration('b', 'a')).toStrictEqual(false);
    });
    it('directed edges work properly (recursion)', () => {
      // validate direct connection (a -> b)
      expect(graph.hasPathDFSIteration('a', 'b')).toStrictEqual(true);

      // validate one-hop connection (c -> a -> b)
      expect(graph.hasPathDFSIteration('c', 'b')).toStrictEqual(true);

      // validate lack of connection (b -> anywhere)
      expect(graph.hasPathDFSIteration('b', 'a')).toStrictEqual(false);
    });
  });

  describe('Test via breadth-first search', () => {
    it('directed edges work properly (iteration)', () => {
      // validate direct connection (a -> b)
      expect(graph.hasPathBFSIteration('a', 'b')).toStrictEqual(true);

      // validate one-hop connection (c -> a -> b)
      expect(graph.hasPathBFSIteration('c', 'b')).toStrictEqual(true);

      // validate lack of connection (b -> anywhere)
      expect(graph.hasPathBFSIteration('b', 'a')).toStrictEqual(false);
    });
    it('finds the shortest path', () => {
      // there's two ways to get from a -> b, either direct (1) or via c (2).
      // the correct result should be 1.
      const distanceAB = graph.bfsDistance('a', 'b');
      expect(distanceAB).toEqual(1);
    });
    it('unreachable nodes return -1', () => {
      const distanceBA = graph.bfsDistance('b', 'a');
      expect(distanceBA).toEqual(-1);
    });
  });
});
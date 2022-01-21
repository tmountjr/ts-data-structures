import * as expect from 'expect';
import { Trie } from './Trie';

describe('Test Trie functionality', () => {
  it('items inserted can be retrived', () => {
    const trie = new Trie();
    trie.insert('peter');
    expect(trie.contains('peter')).toStrictEqual(true);
  });
  it('items inserted do not return partial matches', () => {
    const trie = new Trie();
    trie.insert('peter');
    expect(trie.contains('pete')).toStrictEqual(false);
  });
  it('items branch properly based on prefix', () => {
    const trie = new Trie();
    trie.insert("peter");
    trie.insert("piper");
    trie.insert("picked");
    trie.insert("pickled");
    trie.insert("pepper");
    const prefixed = trie.find('pi');
    expect(prefixed).toEqual(['pickled', 'picked', 'piper']);
  });
  it('inserting an item with the same prefix correctly sets end node', () => {
    const trie = new Trie();
    trie.insert('peter');
    trie.insert('pet');
    expect(trie.contains('pet')).toStrictEqual(true);
    expect(trie.contains('pete')).toStrictEqual(false);
    expect(trie.contains('peter')).toStrictEqual(true);
  });
  it('deleting a word with children leaves the children', () => {
    const trie = new Trie();
    trie.insert('pet');
    trie.insert('peter');
    trie.remove('pet');
    expect(trie.contains('pet')).toStrictEqual(false);
    expect(trie.contains('peter')).toStrictEqual(true);
  });
  it('deleting a word without children removes the word entirely', () => {
    const trie = new Trie();
    trie.insert('peter');
    trie.insert('piper');
    trie.remove('peter');
    expect(trie.find('p')).toEqual(['piper']);
    expect(trie.find('pe')).toEqual([]);
  });
});
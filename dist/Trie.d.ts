/**
 * Node representing a single letter in the trie.
 */
declare class TrieNode {
    key: string;
    parent: TrieNode | null;
    children: {
        [key: string]: TrieNode;
    };
    end: boolean;
    constructor(key: string);
    /**
     * Get the word ending with this node.
     * @returns The word formed by the path from this node to the root of the trie.
     */
    getWord(): string;
}
/**
 * Trie data structure.
 */
export declare class Trie {
    protected root: TrieNode | null;
    /**
     * Insert a word into the trie.
     * @param word The word to insert.
     */
    insert(word: string): void;
    /**
     * Check if the trie contains the complete word.
     * @param word The word to look for.
     * @returns TRUE if the complete word is found, FALSE if not.
     */
    contains(word: string): boolean;
    /**
     * Find all words starting with a given prefix.
     * @param prefix The prefix to search for.
     * @returns A list of all words prefixed by {prefix}.
     */
    find(prefix: string): string[];
    /**
     * Find all words within a node.
     * @param node The node to search.
     * @param arr Pointer to an array in which to store results.
     */
    protected findAllWords(node: TrieNode, arr: string[]): void;
    /**
     * Remove a word from the trie.
     * @param word The word to remove.
     */
    remove(word: string): void;
}
export {};
//# sourceMappingURL=Trie.d.ts.map
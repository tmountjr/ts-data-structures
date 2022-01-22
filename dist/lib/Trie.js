"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
/**
 * Node representing a single letter in the trie.
 */
class TrieNode {
    constructor(key) {
        this.key = key;
        this.parent = null;
        this.children = {};
        this.end = false;
    }
    /**
     * Get the word ending with this node.
     * @returns The word formed by the path from this node to the root of the trie.
     */
    getWord() {
        let output = [];
        let node = this;
        while (node !== null) {
            output.unshift(node.key);
            node = node.parent;
        }
        return output.join('');
    }
}
/**
 * Trie data structure.
 */
class Trie {
    constructor() {
        this.root = new TrieNode('');
    }
    /**
     * Insert a word into the trie.
     * @param word The word to insert.
     */
    insert(word) {
        let node = this.root;
        if (!node)
            throw new Error('Trie has not been initialized.');
        for (let i = 0; i < word.length; i++) {
            if (node && !node.children[word[i]]) {
                node.children[word[i]] = new TrieNode(word[i]);
                node.children[word[i]].parent = node;
            }
            node = node.children[word[i]];
            if (node && i === word.length - 1) {
                node.end = true;
            }
        }
    }
    /**
     * Check if the trie contains the complete word.
     * @param word The word to look for.
     * @returns TRUE if the complete word is found, FALSE if not.
     */
    contains(word) {
        let node = this.root;
        if (!node)
            throw new Error('Trie has not been initialized.');
        for (let i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
                node = node.children[word[i]];
            }
            else {
                return false;
            }
        }
        return node.end;
    }
    /**
     * Find all words starting with a given prefix.
     * @param prefix The prefix to search for.
     * @returns A list of all words prefixed by {prefix}.
     */
    find(prefix) {
        let node = this.root;
        if (!node)
            throw new Error('Trie has not been initialized.');
        let output = [];
        for (let i = 0; i < prefix.length; i++) {
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            }
            else {
                return output;
            }
        }
        this.findAllWords(node, output);
        return output;
    }
    /**
     * Find all words within a node.
     * @param node The node to search.
     * @param arr Pointer to an array in which to store results.
     */
    findAllWords(node, arr) {
        if (node.end) {
            arr.unshift(node.getWord());
        }
        for (let child in node.children) {
            this.findAllWords(node.children[child], arr);
        }
    }
    /**
     * Remove a word from the trie.
     * @param word The word to remove.
     */
    remove(word) {
        let root = this.root;
        if (!word)
            return;
        if (!root)
            throw new Error('Trie has not been initialized.');
        /** recursive helper method */
        const removeWord = (node, word) => {
            if (node.end && node.getWord() === word) {
                let hasChildren = Object.keys(node.children).length > 0;
                if (hasChildren) {
                    node.end = false;
                }
                else {
                    if (node.parent)
                        node.parent.children = {};
                }
                return true;
            }
            for (let key in node.children) {
                removeWord(node.children[key], word);
            }
            return false;
        };
        removeWord(root, word);
    }
}
exports.Trie = Trie;
//# sourceMappingURL=Trie.js.map
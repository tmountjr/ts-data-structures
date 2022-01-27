"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseVector = void 0;
/**
 * A data structure that efficiently stores large arrays where values are mostly 0.
 */
class SparseVector {
    /**
     * Create a new Sparse Vector.
     * @param arr The actual set of numbers.
     */
    constructor(arr) {
        /** The mapping of non-zero indexed values. */
        this.mapping = {};
        /** The length of the resulting map. */
        this.length = 0;
        const s = arr.length;
        for (let i = 0; i < s; i++) {
            if (arr[i] !== 0) {
                this.mapping[i] = arr[i];
                this.length++;
            }
        }
    }
    /**
     * Calculate the dot product of two Sparse Vectors.
     * @param B The second SparseVector to use in the calculation.
     * @returns The sum of the product of all non-zero values in both vectors.
     */
    dotProduct(B) {
        // There are faster ways of computing intersections, but not significantly.
        const keyIntersection = Object.keys(this.mapping)
            .filter(k => Object.keys(B.mapping).includes(k))
            .map(k => Number(k));
        let result = 0;
        for (const key of keyIntersection) {
            result += this.mapping[key] * B.mapping[key];
        }
        return result;
    }
}
exports.SparseVector = SparseVector;
//# sourceMappingURL=SparseVector.js.map
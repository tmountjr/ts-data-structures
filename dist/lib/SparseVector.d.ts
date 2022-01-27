/**
 * A data structure that efficiently stores large arrays where values are mostly 0.
 */
export declare class SparseVector {
    /** The mapping of non-zero indexed values. */
    readonly mapping: {
        [key: number]: number;
    };
    /** The length of the resulting map. */
    readonly length: number;
    /**
     * Create a new Sparse Vector.
     * @param arr The actual set of numbers.
     */
    constructor(arr: number[]);
    /**
     * Calculate the dot product of two Sparse Vectors.
     * @param B The second SparseVector to use in the calculation.
     * @returns The sum of the product of all non-zero values in both vectors.
     */
    dotProduct(B: SparseVector): number;
}
//# sourceMappingURL=SparseVector.d.ts.map
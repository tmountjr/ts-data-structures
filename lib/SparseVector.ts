/**
 * A data structure that efficiently stores large arrays where values are mostly 0.
 */
export class SparseVector {
  /** The mapping of non-zero indexed values. */
  public readonly mapping: {[key: number]: number} = {}

  /** The length of the resulting map. */
  public readonly length: number = 0;

  /**
   * Create a new Sparse Vector.
   * @param arr The actual set of numbers.
   */
  constructor(arr: number[]) {
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
  dotProduct(B: SparseVector): number {
    // There are faster ways of computing intersections, but not significantly.
    const keyIntersection: number[] = Object.keys(this.mapping)
      .filter(k => Object.keys(B.mapping).includes(k))
      .map(k => Number(k));
    let result: number = 0;
    for (const key of keyIntersection) {
      result += this.mapping[key] * B.mapping[key];
    }
    return result;
  }
}
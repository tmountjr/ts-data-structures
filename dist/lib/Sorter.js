"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergesort = exports.quicksort = exports.heapsort = exports.bubblesort = void 0;
const Heap_1 = require("./Heap");
/**
 * Sort an array using bubble sort.
 * @param arr The array to sort.
 */
function bubblesort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let isSwapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                isSwapped = true;
            }
        }
        if (!isSwapped)
            break;
    }
}
exports.bubblesort = bubblesort;
/**
 * Sort an array using heap sort.
 * @param arr The array to sort.
 */
function heapsort(arr) {
    // build a max heap from the array
    const maxHeap = new Heap_1.MaxHeap(arr);
    for (let i = arr.length - 1; i >= 0; i--) {
        arr[i] = maxHeap.poll();
    }
}
exports.heapsort = heapsort;
/**
 * Sort an array using quicksort.
 * @param arr The array to sort.
 */
function quicksort(arr) {
    /**
     * Sort an array (recursive helper). Broken out to allow passing a single array to the main function.
     * @param arr The array to sort.
     * @param left The leftmost index.
     * @param right The rightmost index.
     * @returns
     */
    const sort = (arr, left, right) => {
        if (left >= right)
            return;
        const pivot = arr[Math.floor((left + right) / 2)];
        const index = partition(arr, left, right, pivot);
        sort(arr, left, index - 1);
        sort(arr, index, right);
    };
    /**
     * Partition an array.
     * @param arr The array to partition.
     * @param left The leftmost index.
     * @param right The rightmost index.
     * @param pivot The pivot value.
     * @returns The midpoint of the array at which all values left are less and all values right are greater.
     */
    const partition = (arr, left, right, pivot) => {
        while (left <= right) {
            while (arr[left] < pivot) {
                left++;
            }
            while (arr[right] > pivot) {
                right--;
            }
            if (left <= right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left++;
                right--;
            }
        }
        return left;
    };
    sort(arr, 0, arr.length - 1);
}
exports.quicksort = quicksort;
/**
 * Sort an array using mergesort.
 * @param arr The array to sort.
 */
function mergesort(arr) {
    /**
     * Recursive helper.
     * @param arr The array to sort.
     * @param left The leftmost index.
     * @param right The rightmost index.
     * @returns
     */
    const mergeRecursive = (arr, left, right) => {
        if (left >= right)
            return;
        let middle = left + Math.floor((right - left) / 2);
        mergeRecursive(arr, left, middle);
        mergeRecursive(arr, middle + 1, right);
        merge(arr, middle, left, right);
    };
    /**
     * Merge to halves of an array in-place.
     * @param arr The array on which to perform the merge operation.
     * @param middle The middle value.
     * @param left The leftmost index.
     * @param right The rightmost index.
     */
    const merge = (arr, middle, left, right) => {
        const leftLength = middle - left + 1;
        const rightLength = right - middle;
        const tempL = Array(leftLength);
        const tempR = Array(rightLength);
        for (let i = 0; i < leftLength; i++) {
            tempL[i] = arr[left + i];
        }
        for (let j = 0; j < rightLength; j++) {
            tempR[j] = arr[middle + 1 + j];
        }
        let i = 0, j = 0;
        let k = left;
        while (i < leftLength && j < rightLength) {
            if (tempL[i] <= tempR[j]) {
                arr[k] = tempL[i];
                i++;
            }
            else {
                arr[k] = tempR[j];
                j++;
            }
            k++;
        }
        while (i < leftLength) {
            arr[k] = tempL[i];
            i++;
            k++;
        }
        while (j < rightLength) {
            arr[k] = tempR[j];
            j++;
            k++;
        }
    };
    mergeRecursive(arr, 0, arr.length - 1);
}
exports.mergesort = mergesort;
//# sourceMappingURL=Sorter.js.map
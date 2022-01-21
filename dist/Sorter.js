"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergesort = exports.quicksort = exports.heapsort = exports.bubblesort = void 0;
var Heap_1 = require("./Heap");
/**
 * Sort an array using bubble sort.
 * @param arr The array to sort.
 */
function bubblesort(arr) {
    var _a;
    for (var i = 0; i < arr.length; i++) {
        var isSwapped = false;
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                _a = __read([arr[j + 1], arr[j]], 2), arr[j] = _a[0], arr[j + 1] = _a[1];
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
    var maxHeap = new Heap_1.MaxHeap(arr);
    for (var i = arr.length - 1; i >= 0; i--) {
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
    var sort = function (arr, left, right) {
        if (left >= right)
            return;
        var pivot = arr[Math.floor((left + right) / 2)];
        var index = partition(arr, left, right, pivot);
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
    var partition = function (arr, left, right, pivot) {
        var _a;
        while (left <= right) {
            while (arr[left] < pivot) {
                left++;
            }
            while (arr[right] > pivot) {
                right--;
            }
            if (left <= right) {
                _a = __read([arr[right], arr[left]], 2), arr[left] = _a[0], arr[right] = _a[1];
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
    var mergeRecursive = function (arr, left, right) {
        if (left >= right)
            return;
        var middle = left + Math.floor((right - left) / 2);
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
    var merge = function (arr, middle, left, right) {
        var leftLength = middle - left + 1;
        var rightLength = right - middle;
        var tempL = Array(leftLength);
        var tempR = Array(rightLength);
        for (var i_1 = 0; i_1 < leftLength; i_1++) {
            tempL[i_1] = arr[left + i_1];
        }
        for (var j_1 = 0; j_1 < rightLength; j_1++) {
            tempR[j_1] = arr[middle + 1 + j_1];
        }
        var i = 0, j = 0;
        var k = left;
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
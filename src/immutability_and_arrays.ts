// @ts-nocheck
import { reduce, add, pipe, nth, map } from 'ramda';

import { groupOfTests, test } from '@/internal/testing';
import { expect } from '@/internal/assertion';

groupOfTests('Immutability and arrays');

/*
  The array equivalent of prop is nth; the equivalent of pick is slice,
  and the equivalent of has is contains. Let’s look at those.

  const numbers = [10, 20, 30, 40, 50, 60]
 
  nth(3, numbers) // => 40  (0-based indexing)
  nth(-2, numbers) // => 50 (negative numbers start from the right)
  slice(2, 5, numbers) // => [30, 40, 50] (see below)
  contains(20, numbers) // => true

  Slice takes two indexes and returns the sub array starting at the first index (0-based)
  and including all of the elements up to, but not including the second index.

  Accessing the first (nth(0)) and last (nth(-1)) elements is quite common, so Ramda provides
  shortcuts for those special cases, head and last. It also provides functions for accessing
  all-but-the-first element (tail), all-but-the-last element (init), the first N
  elements (take(N)), and the last N elements (takeLast(N)). Let’s see these in action.

  const numbers = [10, 20, 30, 40, 50, 60]
 
  head(numbers) // => 10
  tail(numbers) // => [20, 30, 40, 50, 60]
 
  last(numbers) // => 60
  init(numbers) // => [10, 20, 30, 40, 50]
 
  take(3, numbers) // => [10, 20, 30]
  takeLast(3, numbers) // => [40, 50, 60]

  TODO: Get sum of 3rd (index 2) elements of arrays
 */
const getSumOfThirdElements = pipe(map(nth(2)), reduce(add, 0));
test('array manipulation: sum of third elements', () => {
  expect(
    getSumOfThirdElements([
      [1, 2, 3],
      [1, 2, 0],
      [3, 5, 100],
    ]),
  ).toBe(103);
});

/*
  Adding, Updating, and Removing Array Elements
  For objects, we learned about assoc, dissoc, and omit for adding, updating,
  and removing properties.

  Because arrays are an ordered data structure, there are several methods
  that do the same job as assoc. The most general are insert and update,
  but Ramda also provides append and prepend for the common case of adding elements
  at the beginning or end of the array. insert, append, and prepend add new elements
  to the array; update “replaces” an element with a new value.

  As you might expect from a functional library, all of these functions return a new
  array with the desired changes; the original array is never changed.
 */

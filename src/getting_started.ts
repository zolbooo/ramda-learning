/*
  Where to Start?
  The easiest way to start thinking functionally is to start replacing loops
  with collection-iteration functions.
*/
import { map, filter, reject, find, reduce } from 'ramda';

import { test, groupOfTests } from '@/internal/testing';
import { expect } from '@/internal/assertion';

groupOfTests('Getting started');

/*
  map applies a function to each element of an array.
  map collects the results of applying the function into a new array and returns it.
  TODO: double array by using map function
 */
const doubleArray = null;

test('map: double array', () => {
  expect(doubleArray([2, 3, 5])).toBe([4, 6, 10]);
});

/*
  filter selects elements from an array based on some function.
  filter applies its function (isEven in this case) to each element of the array.
  Whenever the function returns a “truthy” value, the corresponding element is
  included in the result. Whenever the function returns a “falsy” value,
  the corresponding element is excluded (filtered out) from the array.
  TODO: filter odd elements of array
 */
const filterOdd = null;
test('filter: odd numbers', () => {
  expect(filterOdd([2, 3, 5])).toBe([2]);
});

/*
  reject does exactly the same thing as filter, but in reverse.
  It keeps the elements for which the function returns a falsy
  value and excludes the values for which it returns a truthy value.
  TODO: reject all even numbers
 */
const rejectEven = null;
test('reject: event numbers', () => {
  expect(rejectEven([2, 3, 5])).toBe([3, 5]);
});

/*
  find applies a function to each element of an array and returns the first
  element for which the function returns a truthy value.
  TODO: find first number divisible by 3
 */
const findFirstDivisibleBy3 = null;
test('find: first divisible by 3', () => {
  expect(findFirstDivisibleBy3([2, 12, 5])).toBe(12);
});

/*
 reduce is a little bit more complicated than the other functions we’ve seen so far.
 It is worth knowing, but if you have trouble understanding it at first, don’t let
 that stop you. You can get a long way without understanding it.
 reduce takes a two-argument function, and initial value, and the array to operate on.
 The first argument to the function we pass in is called the “accumulator” and the
 second argument is the value from the array. The function needs to return a new accumulator value.
 TODO: find sum of all elements in array
 */
const findSum = null;
test('reduce: sum of array', () => {
  expect(findSum([2, 12, -5])).toBe(9);
});

import { complement, either, both, pipe, compose } from 'ramda';

import { test, groupOfTests } from '@/internal/testing';
import { expect } from '@/internal/assertion';

groupOfTests('Combining functions');

/*
 Ramda provides a higher-order function, complement, that takes
 another function and returns a new function that returns true when
 the original function returns a falsy value, and false when the original
 function returns a truthy value.
 TODO: Implement isOdd function using complement HOF
 */
const isEven = x => x % 2 === 0;
const isOdd = null;
test('complement: is odd', () => {
  expect(isOdd(3)).toBe(true);
  expect(isOdd(1)).toBe(true);
});

/*
  both takes two other functions and returns a new function
  that returns true if both functions return a truthy value
  when applied to the arguments and false otherwise.
  either takes two other functions and returns a new function
  that returns true if either function returns a truthy value when
  applied to the arguments and false otherwise.
  TODO: Implement isLeapYear function using both and either HOFs
  Leap year is divisible by 4, must not be divisible
  by 100 or be divisible by 400, check test below
 */
const isLeapYear = null;
test('either, both: is leap year', () => {
  expect(isLeapYear(2004)).toBe(true);
  expect(isLeapYear(2000)).toBe(true);
  expect(isLeapYear(1900)).toBe(false);
});

/*
  Ramda provides the pipe function, which takes a list of one
  or more functions and returns a new function.
  The new function takes the same number of arguments as the first
  function it is given. It then “pipes” those arguments through each
  function in the list. It applies the first function to the arguments,
  passes its result to the second function and so on. The result of the
  last function is the result of the pipe call.
  Note that all of the functions after the first must only take a single argument.
  TODO: Implement math function: y=3x^2+5, where ^ is power
 */
const mathFn = null;
test('pipe: math function', () => {
  expect(mathFn(-2)).toBe(17);
  expect(mathFn(25)).toBe(1880);
});

/*
  compose works exactly the same way as pipe, except that it applies
  the functions in right-to-left order instead of left-to-right.
  TODO: Implement math function above using compose HOF
 */
const mathFnCompose = null;
test('compose: math function', () => {
  expect(mathFnCompose(-2)).toBe(17);
  expect(mathFnCompose(25)).toBe(1880);
});

/*
  compose or pipe?
  I think that pipe is probably the easiest to understand when coming from
  a more imperative background since you read the functions left-to-right.
  But compose is a bit easier to translate to nested-function form as I showed above.
  I haven’t yet developed a good rule for when I prefer compose and when I prefer pipe.
  Since they are essentially equivalent in Ramda, it probably doesn’t matter which one
  you choose. Just go with whichever one reads the best in your situation.
*/

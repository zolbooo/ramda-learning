// @ts-nocheck
import {
  __,
  curry,
  filter,
  flip,
  gte,
  map,
  multiply,
  partial,
  partialRight,
  pipe,
  reduce,
} from 'ramda';

import { groupOfTests, test } from '@/internal/testing';
import { expect } from '@/internal/assertion';

groupOfTests('Partial application');

/*
 Ramda provides two functions to help us out: partial, and partialRight.
 These two functions let us call any function with fewer arguments than
 it needs. They both return a new function that takes the missing arguments
 and then calls the original function once all of the arguments have been supplied.
 TODO: Implement addHundred5Times and addHundred10Times functions using partialRight fn
 */
const addHundredNTimes = (num, n) => num + 100 * n;
const addHundred5Times = null;
const addHundred10Times = null;
test('partialRight: add 100 n times', () => {
  expect(map(addHundred5Times, [3, 5, 7])).toBe([503, 505, 507]);
  expect(map(addHundred10Times, [3, 5, 7])).toBe([1003, 1005, 1007]);
});

/*
  Ramda provides us with a solution: curry.
  Currying is another core concept in functional programming.
  Technically, a curried function is always a series of single-argument
  functions, which is what I was just complaining about. In pure functional
  languages, the syntax generally makes that look no different than calling
  a function with multiple arguments.
  TODO: curry multiplyNumbersWithFilter function
 */
const multiplyNumbersWithFilter = (
  filterFn: (number) => boolean,
  list: number[],
) => pipe(filter(filterFn), reduce(multiply, 1))(list);
const carriedMultiplyNumbersWithFilter = null;

test('curry: multiply numbers with filter', () => {
  const multiplyOddNumbers = carriedMultiplyNumbersWithFilter(
    (n: number) => n % 2 === 1,
  );
  expect(multiplyOddNumbers([3, 5, 7])).toBe(105);
  expect(multiplyOddNumbers([2, 3, 5])).toBe(15);
});

/*
 Sometimes we have to we had to reverse the argument order. This is extremely
 common with functional programming, so almost every Ramda function is written
 so that the data to be operated on comes last.

 flip takes a function of 2 or more arguments and returns a new function that takes
 the same arguments, but switches the order of the first two arguments. It is mostly
 used with two argument functions, but is more general than that.
 TODO: flip order of arguments in generateIOI function
 */
const checkScore = (marks: number[], minimalScore: number) =>
  filter(gte(__, minimalScore), marks);
const flippedCheckScore = null;
test('flip: check score', () => {
  const getAMarks = partial(flippedCheckScore, [90]);
  expect(getAMarks([55, 87, 13, 98, 100])).toBe([98, 100]);
  const getGoodMarks = partial(flippedCheckScore, [80]);
  expect(getGoodMarks([55, 87, 13, 98, 100])).toBe([87, 98, 100]);
});

/*
  The missing piece of information is this: almost every Ramda
  function is curried by default. This includes filter and map.
  So filter(publishedInYear(year)) is perfectly legal and returns
  a new function that’s just waiting for us to pass the books along later,
  as is map(book => book.title).
  TODO: Implement titlesForYear function using compose or pipe
*/
type Book = { title: string; year: number };
const publishedInYear = (year: number) => (book: Book) => book.year === year;

// TitlesForYearFn returns list of book titles published in specific year
const titlesForYear = null;
test('fn composition: titles for year', () => {
  const titlesFor1990 = titlesForYear(1990);
  expect(
    titlesFor1990([
      { title: 'test1', year: 1990 },
      { title: 'test2', year: 1991 },
    ]),
  ).toBe(['test1']);
});

/*
  Conclusion
  This part is probably the deepest one of this series. Partial application
  and currying can take some time and effort to wrap your head around. But
  once you “get” them, they introduce you to a very powerful way of transforming
  your data in a functional way.

  They lead you to start building transformations by creating pipelines of small,
  simple building blocks.
 */

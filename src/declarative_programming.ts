// @ts-nocheck
import {
  gte,
  lte,
  inc,
  cond,
  pipe,
  when,
  always,
  divide,
  ifElse,
  equals,
  modulo,
  identity,
  multiply,
  subtract,
  defaultTo,
  T,
  __,
} from 'ramda';

import { test, groupOfTests } from '@/internal/testing';
import { expect } from '@/internal/assertion';

groupOfTests('Declarative programming');

/*
  Imperative vs Declarative
  There are many different ways to divide up the programming language/style
  landscape. There’s static typing vs dynamic typing, interpreted languages
  vs compiled languages, low-level vs high-level, etc.

  Another such division is imperative programming vs declarative programming.

  Without going too deep into this, imperative programming is a style of programming
  where the programmers tell the computer what to do by telling it how to do it.
  Imperative programming gives rise to a lot of the constructs we use every day:
  control flow (if-then-else statements and loops), arithmetic operators (+, -, *, /),
  comparison operators (===, >, <, etc.), and logical operators (&&, ||, !).

  Declarative programming is a style of programming where the programmers tell the computer
  what to do by telling it what they want. The computer then has to figure out how to produce
  the result.

  One of the classic declarative languages is Prolog. In Prolog, a program consists of a set
  of facts and a set of inference rules. You kick off the program by asking a question, and
  Prolog’s inference engine uses the facts and rules to answer your question.

  Functional programming is considered a subset of declarative programming. In a functional
  program, we define functions and then tell the computer what to do by combining these functions.

  Even in declarative programs, it is necessary to do similar tasks to those we do in imperative
  programs. Control flow, arithmetic, comparison, and logic are still the basic building blocks
  we have to work with. But we need to find a way to express these constructs in a declarative way.

  Declarative Replacements
  Since we’re programming in JavaScript, an imperative language, it’s fine to use the standard
  imperative constructs when writing “normal” JavaScript code.

  But when we’re writing functional transformations using pipelines and similar constructs,
  the imperative constructs don’t play well.

  Let’s look at some of these basic building blocks that Ramda provides to help us out of this jam.
 */

/*
  Ramda provides add, subtract, multiply, and divide functions to use in place of the
  standard arithmetic operators.
  TODO: Implement y=(3x-5)^2 math function
*/
const mathFn = null;
test('multiply, subtract: y=(3x-5)^2', () => {
  expect(mathFn(3)).toBe(16);
  expect(mathFn(-10)).toBe(1225);
});

/*
  Ramda also provides gt for >, lt for <, and lte for <=.
  Note that these functions take their arguments in what seems like normal
  order (is the first argument greater than the second?) That makes sense when
  used in isolation, but can be confusing when combining functions. These
  functions seem to violate Ramda’s “data-last” principle, so we’ll have to be
  careful when we use them in pipelines and similar situations. That’s when flip
  and the placeholder (__) will come in handy.

  In addition to equals, there is identical for determining if two values reference the same memory.

  There are a couple of common uses of ===: checking if a string or array is empty
  (str === '' or arr.length === 0), and checking if a variable is null or undefined.
  Ramda provides handy functions for both cases: isEmpty and isNil.

  TODO: Implement functions below using Ramda comparison operators
 */
const isOver18 = person => null;
const wasBornInMongolia = person => null;

test('comparison operators', () => {
  const mike = { age: 15, birthCountry: 'United Kingdom' };
  expect(isOver18(mike)).toBe(false);
  const jack = { age: 21, birthCountry: 'Mongolia' };
  expect(isOver18(jack)).toBe(true);

  expect(wasBornInMongolia(mike)).toBe(false);
  expect(wasBornInMongolia(jack)).toBe(true);
});

/*
  Logic
  In Part 2 (and just above), we used the both and either functions in place
  of && and || operations. We also talked about complement in place of !.

  These combined functions work great when the functions we are combining both
  operate on the same value. Above, wasBornInCountry, and isOver18 all apply to a person.

  But sometimes we need to apply &&, ||, and ! to disparate values. For
  those cases, Ramda gives us and, or, and not functions. I think of it
  this way: and, or, and not work with values, while both, either, and
  complement work with functions.

  A common use of || is for providing default values. For example, we might write
  something like this:
  const lineWidth = settings.lineWidth || 80;
  This is a common idiom, and mostly works, but relies on JavaScript’s definition of “falsy”.
  What if 0 is a valid setting? Since 0 is falsy, we’ll end up with a line width of 80.

  We could use the isNil function we just learned about above, but again Ramda has a nicer
  option for us: defaultTo.

  TODO: Implement getLineWidth function using defaultTo HOF
 */
const getLineWidth = null;
test('defaultTo: getLineWidth', () => {
  expect(getLineWidth(16)).toBe(16);
  expect(getLineWidth(null)).toBe(80);
});

/*
  Conditionals
  Control flow is less necessary in functional programs, but still
  occasionally useful. The collection iteration functions we talked about in
  "Getting started" section take care of most looping situations, but conditionals
  are still quite important.
  TODO: Let’s write a function, forever21, that takes an age and returns the
  next age. But, as the name implies, once the age is 21, it stays that way.
 */
const forever21 = null;
test('ifElse: forever 21', () => {
  expect(forever21(15)).toBe(16);
  expect(forever21(21)).toBe(21);
  expect(forever21(60)).toBe(21);
});

/*
  Constants
  Constant functions are quite useful in situations like this. As you might
  imagine, Ramda provides us a shortcut. In this case, the shortcut is named always.
  TODO: Implement function that always returns string 'IOI'
 */
const alwaysIOI = null;
test('always: IOI', () => {
  expect(alwaysIOI()).toBe('IOI');
  expect(alwaysIOI()).toBe('IOI');
  expect(alwaysIOI()).toBe('IOI');
});

// Ramda also provides T and F as further shortcuts for always(true) and always(false).

/*
  (a => a) is another common pattern in functional programming. It is known
  as the identity function. That is, a function that returns whatever argument it is given.
  As you might suspect, Ramda provides an identity function for us.
  TODO: Try out identity function
 */
const returnIdentity = null;
test('identity', () => {
  expect(returnIdentity(null)).toBe(null);
  expect(returnIdentity(12)).toBe(12);
  expect(returnIdentity('IOI')).toBe('IOI');
});

/*
  when and unless
  Having an ifElse statement where one of the conditional branches is identity is also quite
  common, so Ramda provides more shortcuts for us.
  If, as in our case, the second branch is identity, we can use when instead of
  ifElse when or unless functions.
  TODO: Divide number by 2 if numbers is even, return itself otherwise.
 */
const transformNumber = null;
test('when: transform number', () => {
  expect(transformNumber(2)).toBe(1);
  expect(transformNumber(3)).toBe(3);
});

/*
  cond
  Ramda also provides the cond function which can replace a switch statement
  or a chain of if...then...else statements.
  TODO: Return corresponding mark
  'A' for mark >= 90
  'B' for mark >= 80
  'C' for mark >= 70
  'D' for mark >= 60
  'F' for mark < 60
  */
const getCorrespondingMark = null;
test('cond: get corresponding mark', () => {
  expect(getCorrespondingMark(100)).toBe('A');
  expect(getCorrespondingMark(80.5)).toBe('B');
  expect(getCorrespondingMark(77)).toBe('C');
  expect(getCorrespondingMark(68)).toBe('D');
  expect(getCorrespondingMark(23)).toBe('F');
});

// @ts-nocheck
import {
  inc,
  has,
  path,
  prop,
  pick,
  keys,
  omit,
  pipe,
  evolve,
  propOr,
  compose,
  assocPath,
} from 'ramda';

import { groupOfTests, test } from '@/internal/testing';
import { expect } from '@/internal/assertion';

groupOfTests('Immutability and Objects');

/*
  provides the prop function for accessing properties of an object.
  Using prop, we can turn person.birthCountry into prop('birthCountry', person).
  Let’s start with that.

  TODO: Get year property of object
*/
const getYear = null;
test('prop: Get year', () => {
  expect(getYear({ year: 1000 })).toBe(1000);
  expect(getYear({ year: 1222 })).toBe(1222);
});

/*
  pick
  Where prop reads a single property from an object and returns the value,
  pick reads multiple properties from an object and returns a new object
  with just those properties.
  For example, if wanted just the names and ages of a person,
  we could use pick(['name', 'age'], person).

  TODO: Pick name and year of book
 */
const getNameAndAge = null;
test('pick: Name and age of book', () => {
  expect(getNameAndAge({ name: 'Crush', year: 1000 })).toBe({
    name: 'Crush',
    year: 1000,
  });
  expect(getNameAndAge({ name: 'Allow', year: 1222 })).toBe({
    name: 'Allow',
    year: 1222,
  });
});

/*
  has
  If we just want to know if an object has a property without reading the value,
  we can use has for checking own properties, and hasIn for checking up the
  prototype chain: has('name', person).

  TODO: Check if book has title property
 */
const hasTitle = null;
test('has: Title of book', () => {
  expect(hasTitle({ title: 'Crush', year: 1000 })).toBe(true);
  expect(hasTitle({ year: 1222 })).toBe(false);
});

/*
  path
  Where prop reads a property from an object, path dives into nested objects.
  For example, we could access the zip code from a deeper structure
  as path(['address', 'zipCode'], person).

  Note that path is more forgiving than prop. path will return undefined
  if anything along the path (including the original argument) is null
  or undefined whereas prop will raise an error.

  TODO: Get book author's name
 */
const getNameOfAuthor = null;
test('path: Name of book author', () => {
  expect(
    getNameOfAuthor({ title: 'Crush', year: 1000, author: { name: 'John' } }),
  ).toBe('John');
  expect(getNameOfAuthor({ year: 1222, author: { name: 'Josh' } })).toBe(
    'Josh',
  );
});

/*
  propOr / pathOr
  propOr and pathOr are similar to prop and path combined with defaultTo.
  They let you provide a default value to use if the property or path cannot be found in the target object.
  For example, we can provide a placeholder when we don’t know a person’s
  name: propOr('<Unnamed>', 'name', person). Note that unlike prop, propOr will not
  raise an error if person is null or undefined; it will instead return the default value.

  TODO: get name of document, return 'Untitled' of it has no name
 */
const getNameOfDoc = null;
test('propOr/pathOr: Name of document', () => {
  expect(getNameOfDoc({ name: 'Document 1' })).toBe('Document 1');
  expect(getNameOfDoc({})).toBe('Untitled');
});

/*
  keys / values
  keys returns an array containing the names of all of the own properties in an object.
  values returns the values of those properties. These functions can be useful when
  combined with the collection iteration functions we learned about in "Getting started" section.

  TODO: Get all keys in book.author object
 */
const getKeys = null;
test('keys/values: Keys in book.author object', () => {
  expect(getKeys({ author: { name: 'Marcus', age: 2 } })).toBe(['name', 'age']);
});

/*
  Adding, Updating, and Removing Properties
  We now have lots of tools for reading from objects declaratively, but
  what about when we want to make changes?

  Since immutability is important, we don’t want to change objects directly.
  Instead, we want to return new objects that have been changed in the way we want.

  Once again, Ramda provides a lot of help for us.

  assoc / assocPath
  When programming imperatively, we could set or change the name of a person
  with the assignment operator: person.name = 'New name'.

  In our functional, immutable world we use assoc instead:
  const updatedPerson = assoc('name', 'New name', person).

  assoc returns a new object with the added or updated property value,
  leaving the original object unchanged.

  There is also assocPath for updating a nested property:
  const updatedPerson = assocPath(['address', 'zipcode'], '97504', person).

  TODO: Set zipcode of document's author's address to '13000'
 */
const setZipcode = null;
test('assoc/assocPath: set zipcode', () => {
  const getSetZipcode = pipe(
    setZipcode,
    path(['author', 'address', 'zipcode']),
  );
  expect(getSetZipcode({})).toBe('13000');
});

/*
  dissoc / dissocPath / omit
  What about deleting properties? Imperatively, we might want to say delete person.age.
  In Ramda, we’d use dissoc: const updatedPerson = dissoc('age', person).

  dissocPath is similar, but works deeper into the object structure:
  dissocPath(['address', 'zipCode'], person).

  There is also omit, which can remove several properties at once.
  const updatedPerson = omit(['age', 'birthCountry'], person).

  Note that pick and omit are quite similar and complement each other nicely.
  They’re very handy for white-listing (keep only this set of properties using pick)
  or black-listing (get rid of this set of properties using omit).

  TODO: Blacklist '$regex', '$gt' properties from object
 */
const filterInjections = null;
test('omit/dissoc/dissocPath: filter out injections', () => {
  const request1 = { $regex: '/password123$' };
  expect(filterInjections(request1)).toBe({});

  const request2 = { $gt: 0, price: 1000 };
  expect(filterInjections(request2)).toBe({ price: 1000 });
});

/*
  evolve takes an object that specifies a transformation function for each property
  to be transformed.

  TODO: celebrateBirthday should increase age of person
 */
const celebrateBirthday = null;
test('evolve: celebrate birthday', () => {
  const applyTest = pipe(celebrateBirthday, prop('age'));

  const person1 = { name: 'Oleg', age: 16 };
  expect(applyTest(person1)).toBe(17);

  const person2 = { name: 'Alice', age: 0 };
  expect(applyTest(person2)).toBe(1);
});

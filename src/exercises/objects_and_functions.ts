// @ts-nocheck
import { prop, pipe, nthArg, applySpec } from 'ramda';

import { test, groupOfTests } from '@/internal/testing';
import { expect } from '@/internal/assertion';
import { mock } from '@/internal/mock';

groupOfTests('Exercises: object and functions');

/*
  Real life example:
  There is event handler which recieves two arguments: event and state.
  TODO: Call setState mock function with State argument as defined below
*/
type EventState = { dx: number; dy: number };
type EventHandler = (_: any, state: EventState) => void;

type State = { x: number; y: number };
const setState: (State) => void = mock();

const handleEvent: EventHandler = null;

test('Exercise: event handler', () => {
  handleEvent({}, { dx: 1, dy: 2 });
  expect(setState.calls.length).toBe(1);
  expect(setState.calls[0]).toBe([{ x: 1, y: 2 }]);
});

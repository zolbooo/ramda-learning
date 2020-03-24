import { equals, unless } from 'ramda';

export interface Assertion {
  toBe: (actualValue: any) => void;
}

export function expect(value: any) {
  return {
    toBe: unless(equals(value), expected => {
      throw Error(`Assertion failed: got ${value}, expected ${expected}`);
    }),
  };
}

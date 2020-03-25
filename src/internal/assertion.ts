import { equals, unless } from 'ramda';

export interface Assertion {
  toBe: (actualValue: any) => void;
}

export function expect(value: any) {
  return {
    toBe: unless(equals(value), expected => {
      throw Error(
        `Assertion failed: got ${JSON.stringify(
          value,
        )}, expected ${JSON.stringify(expected)}`,
      );
    }),
  };
}

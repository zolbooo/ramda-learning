export type MockFn = Function & { calls: any[][] };

export function mock(): MockFn {
  const calls = [];

  const fn = (...args) => calls.push(args);
  fn.calls = calls;

  return fn;
}

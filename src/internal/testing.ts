import { last, forEach, compose, split, prop, __ } from 'ramda';

type TestSuite = { name: string; test: () => void };

const testGroups: string[] = [];
const tests: { [key: string]: TestSuite[] } = {};

// groupOfTests marks start of group of tests
export function groupOfTests(name: string) {
  testGroups.push(name);
  tests[name] = [];
}

// test adds new test suite to current group of tests
export function test(name: string, testFn: () => void) {
  tests[last(testGroups)].push({ name, test: testFn });
}

export function invokeTests() {
  const invokeTest = (suite: TestSuite) => {
    try {
      suite.test();
    } catch (err) {
      console.error(`⛔️ Test "${suite.name}" was not passed`);
      console.error(split('\n', (err as Error).stack)[1]);
      process.exit(1);
    }
    console.log(`✅ Test "${suite.name}"`);
  };
  forEach(compose(forEach(invokeTest), prop(__, tests)), testGroups);
}

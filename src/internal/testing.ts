import { last, split, take } from 'ramda';

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
      console.error(take(2, split('\n', (err as Error).stack)).join('\n'));
      process.exit(1);
    }
    console.log(`✅ Test "${suite.name}"`);
  };

  testGroups.forEach((testGroup, i, arr) => {
    console.log(`-- ${testGroup} --\n`);
    tests[testGroup].forEach(invokeTest);
    if (i === arr.length - 1) {
      console.log("\n\n🎉 That's all, congratulations!");
    } else {
      console.log(`\n\nNice! Next section: ${arr[i + 1]}`);
    }
  });
}

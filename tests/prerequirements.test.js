let consoleBuffer;

beforeEach(() => {
  consoleBuffer = [];

  console.log = (message) => {
    consoleBuffer.push(message);
  };
});

test('git available', () => {
  require('../src/prerequirements');

  expect(consoleBuffer.length).toBe(0);
});

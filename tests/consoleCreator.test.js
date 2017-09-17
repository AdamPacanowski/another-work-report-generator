const chalk = require('chalk');
const consoleCreator = require('../src/consoleCreator');

let consoleBuffer;

beforeEach(() => {
  consoleBuffer = [];

  console.log = (message) => {
    consoleBuffer.push(message);
  };
});

test('simple displaying', () => {
  const calculatedCommits = [
    {
      'fullhash':'fb1eb3ead0e20fed1029bea0edd7626964df326b',
      'hash':'fb1eb3e',
      'date':'2017-01-01T11:00:00.000Z',
      'shortDate':'2017-01-01',
      'text':'test-commit-0',
      'project':'repo1',
      'lines':10,
      'time':0.5
    },
    {
      'fullhash':'3d14b278e7e68d4d775cf363021e02f7eb88551f',
      'hash':'3d14b27',
      'date':'2017-01-01T13:00:00.000Z',
      'shortDate':'2017-01-01',
      'text':'test-commit-1',
      'project':'repo1',
      'lines':90,
      'time':6.25
    },
    {
      'fullhash':'7066af8f9125b85f41b014453802b2f1c488f7d2',
      'hash':'7066af8',
      'date':'2017-01-02T11:00:00.000Z',
      'shortDate':'2017-01-02',
      'text':'test-commit-2',
      'project':'repo1',
      'lines':50,
      'time':7
    },
    {
      'fullhash':'443e2a18619c1135f24d9b5e1f7b205c3e67d93e',
      'hash':'443e2a1',
      'date':'2017-01-03T11:00:00.000Z',
      'shortDate':'2017-01-03',
      'text':'test-commit-3',
      'project':'repo1',
      'lines':50,
      'time':7
    }
  ];

  consoleCreator(calculatedCommits, {
    locale: 'pl'
  });


  expect(consoleBuffer.length).toBe(4);
  expect(consoleBuffer[0])
    .toBe(
      chalk.grey('01.01.2017 12:00') + ' ' 
      + chalk.cyan('repo1') + ' ' 
      + chalk.white('test-commit-0')
    );
});

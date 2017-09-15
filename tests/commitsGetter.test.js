const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
const _ = require('lodash');
const commitsGetter = require('../src/commitsGetter');
const stubRepoCreator = require('./utils/stubRepoCreator');

function countInString(str, schar) {
  return (str.match(new RegExp(schar, 'g')) || []).length;
}

test('two repositories test', () => {
  stubRepoCreator([{
    date: new Date('2017-01-01 12:00:00'),
    linesChanged: 10
  }, {
    date: new Date('2017-01-01 14:00:00'),
    linesChanged: 100
  }, {
    date: new Date('2017-01-02 12:00:00'),
    linesChanged: 50
  }, {
    date: new Date('2017-01-03 12:00:00'),
    linesChanged: 100
  }], {
    repoFolderName: 'repo1',
  });

  stubRepoCreator([{
    date: new Date('2017-01-01 12:00:00'),
    linesChanged: 10
  }, {
    date: new Date('2017-01-01 14:00:00'),
    linesChanged: 100
  }, {
    date: new Date('2017-01-02 12:00:00'),
    linesChanged: 50
  }, {
    date: new Date('2017-01-03 12:00:00'),
    linesChanged: 100
  }], {
    repoFolderName: 'repo2',
    doNotRemoveTestFolder: true
  });

  const tempDir = os.tmpDir();

  const commits = commitsGetter({
    startTime: new Date('2017-01-01 00:00:00'),
    endTime: new Date('2017-02-01 00:00:00'),
    author: execSync('git config user.name').toString().trim(),
    path: `${ tempDir }/testStubGitRepo`
  });

  expect(commits.length).toBe(2);

  const repo1 = _.find(commits, {
    gitFolder: path.join(tempDir, 'testStubGitRepo', 'repo1', '.git') 
  });

  expect(repo1.commits.length).toBe(4);
  expect(repo1.commits[3].indexOf('10 insertions')).not.toEqual(-1);
  expect(countInString(repo1.commits[0], ';')).toEqual(3);

  expect(commits[1].commits[0].indexOf('test-commit')).not.toEqual(-1);
});
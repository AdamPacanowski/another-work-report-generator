const os = require('os');
const path = require('path');
const { execSync } = require('child_process');
const commitsGetter = require('../src/commitsGetter');
const stubRepoCreator = require('./utils/stubRepoCreator');

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
    expect(commits[0].gitFolder).toBe(path.join(tempDir, 'testStubGitRepo', 'repo1', '.git'));
});
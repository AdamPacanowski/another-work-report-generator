const _ = require('lodash');
const commitsParser = require('../src/commitsParser');

beforeEach(() => {
    console.log = () => {};
});

test('simple parsing', () => {
    const rawCommits = [
        {
            "gitFolder":"C:\\Users\\XXX\\AppData\\Local\\Temp\\testStubGitRepo\\repo1\\.git",
            "commits":[
                "443e2a18619c1135f24d9b5e1f7b205c3e67d93e;443e2a1;1483441200;test-commit-3\n 1 file changed, 50 insertions(+)",
                "7066af8f9125b85f41b014453802b2f1c488f7d2;7066af8;1483354800;test-commit-2\n 1 file changed, 50 deletions(-)",
                "3d14b278e7e68d4d775cf363021e02f7eb88551f;3d14b27;1483275600;test-commit-1\n 1 file changed, 90 insertions(+)",
                "fb1eb3ead0e20fed1029bea0edd7626964df326b;fb1eb3e;1483268400;test-commit-0\n 1 file changed, 10 insertions(+)"
            ]
        }
    ];

    const settings = {
        startTime: new Date('2017-01-01 00:00:00'),
        endTime: new Date('2017-02-01 00:00:00'),
        maxHoursPerDay: 7,
        graduation: 0.25,
        minCommitTime: 0.25
    };

    const calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);
    
    expect(
        _.find(calculatedCommits.commits, {hash: "fb1eb3e"}).project
    ).toBe('repo1');
    expect(
        _.find(calculatedCommits.commits, {hash: "fb1eb3e"}).lines
    ).toBe(10);
    expect(
        _.find(calculatedCommits.commits, {hash: "fb1eb3e"}).time
    ).toBe(0.5);

    expect(
        _.find(calculatedCommits.commits, {hash: "3d14b27"}).project
    ).toBe('repo1');
    expect(
        _.find(calculatedCommits.commits, {hash: "3d14b27"}).lines
    ).toBe(90);
    expect(
        _.find(calculatedCommits.commits, {hash: "3d14b27"}).time
    ).toBe(6.25);

    expect(
        _.find(calculatedCommits.commits, {hash: "7066af8"}).shortDate
    ).toBe('2017-01-02');
    expect(
        _.find(calculatedCommits.commits, {hash: "7066af8"}).time
    ).toBe(7);
    expect(
        _.find(calculatedCommits.commits, {hash: "7066af8"}).text
    ).toBe('test-commit-2');

    expect(calculatedCommits.commitsLengthMap['2017-01-01']).toBe(2);
    expect(calculatedCommits.commitsLengthMap['2017-01-02']).toBe(1);
    expect(calculatedCommits.commitsLengthMap['2017-01-03']).toBe(1);
});

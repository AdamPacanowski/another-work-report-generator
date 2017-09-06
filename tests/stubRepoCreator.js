const fs = require('fs');
const os = require('os');
const moment = require('moment');
const rimraf = require('rimraf');
const execSync = require('child_process').execSync;

const TEST_FOLDER_NAME = 'testStubGitRepo';
const TEST_FILE_NAME = 'code.txt';
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";

function makeCommit(commitDefinition, i) {
    const commitDate = moment(commitDefinition).lang('en').format(DATE_RFC2822);
    console.log(commitDate);

    execSync(`cd ${os.tmpdir()}/${ TEST_FOLDER_NAME }`);
    execSync(`git add -A`);
    execSync(`git commit -m "test-commit-${ i }"`);
    execSync(`git commit --amend `)
}

function createXLinesString(x) {
    const lineText = 'xxx';
    let str = '';

    for (let i = 0; i < x; i++) {
        str += `${ lineText }\n`;
    }

    return str;
}

/**
 * Method used to create stub repo (test purposes)
 */
module.exports = function(commitDefinitions) {   
    console.log(os.tmpdir());

    rimraf.sync(`${os.tmpdir()}/${ TEST_FOLDER_NAME }`);

    fs.mkdirSync(`${os.tmpdir()}/${ TEST_FOLDER_NAME }`);

    execSync(`git init ${os.tmpdir()}/${ TEST_FOLDER_NAME }`);

    fs.writeFileSync(
        `${os.tmpdir()}/${ TEST_FOLDER_NAME }/${ TEST_FILE_NAME }`,
        createXLinesString(10)
    );

    commitDefinitions.forEach(makeCommit);
};
const fs = require('fs');
const os = require('os');
const moment = require('moment');
const rimraf = require('rimraf');
const execSync = require('child_process').execSync;

const TEST_FOLDER_NAME = 'testStubGitRepo';
const TEST_FILE_NAME = 'code.txt';
const DATE_RFC2822 = "ddd, DD MMM YYYY HH:mm:ss ZZ";

// https://alexpeattie.com/blog/working-with-dates-in-git

function makeCommit(repoFolderName, commitDefinition, i) {
    const commitDate = moment(commitDefinition.date).format(DATE_RFC2822);

    fs.writeFileSync(
        `${os.tmpdir()}/${ TEST_FOLDER_NAME }/${ repoFolderName }/${ TEST_FILE_NAME }`,
        createXLinesString(commitDefinition.linesChanged)
    );

    execSync(`cd ${os.tmpdir()}/${ TEST_FOLDER_NAME }/${ repoFolderName } && git add -A && SET GIT_AUTHOR_DATE="${ commitDate }" && SET GIT_COMMITTER_DATE="${ commitDate }" && git commit -m "test-commit-${ i }"`);
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
module.exports = function(commitDefinitions, settings) {   
    console.log(os.tmpdir());

    if (!settings.doNotRemoveTestFolder) {
        rimraf.sync(`${os.tmpdir()}/${ TEST_FOLDER_NAME }/${ settings.repoFolderName }`);

        fs.mkdirSync(`${os.tmpdir()}/${ TEST_FOLDER_NAME }`);
    }
    fs.mkdirSync(`${os.tmpdir()}/${ TEST_FOLDER_NAME }/${ settings.repoFolderName }`);

    execSync(`git init ${os.tmpdir()}/${ TEST_FOLDER_NAME }/${ settings.repoFolderName }`);

    commitDefinitions.forEach(makeCommit.bind(null, settings.repoFolderName));
};
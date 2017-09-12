const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * @typedef {Object} RepositoriesCommits
 * @property {String} gitFolder Absolute path to git repository
 * @property {String[]} commmits Array of commits. 
 * Informations in commit are separated by semicolon.
 * e.g. "fb1eb3ead0e20fed1029bea0edd7626964df326b;fb1eb3e;1483268400;test-commit-0\n 1 file changed, 10 insertions(+)"
 */

/**
 * Get folders with git repositories.
 * @param {Object} settings 
 * @param {String} settings.path
 * @returns {String[]} Absolute path to git repositories
 */
function findRepositories(settings) {
  return fs
    .readdirSync(settings.path)
    .filter((folderName) => fs.lstatSync(path.join(settings.path, folderName)).isDirectory())
    .map((folderName) => path.join(settings.path, folderName, '.git'))
    .filter((gitFolderName) => {
      try {
        fs.accessSync(gitFolderName, fs.F_OK);
      } catch (err) {
        return false;
      }

      return true;
    });
}

/**
 * Get commits from indicated repositories
 * @param {Object} settings 
 * @param {Date} settings.startTime
 * @param {Date} settings.endTime
 * @param {String} settings.author
 * @param {String[]} gitFolders Absolute path to git repositories
 * @returns {RepositoriesCommits[]}
 */
function getRepositoriesCommits(settings, gitFolders) {
  return gitFolders.map((gitFolder) => ({
    gitFolder,
    commits: execSync(
      `git --git-dir "${ gitFolder }" log ` +
      `--after="${ settings.startTime.toISOString() }" --before="${ settings.endTime.toISOString() }" --author="${ settings.author }" ` +
      '--branches --no-merges  --pretty=format:"%H;%h;%at;%s" --shortstat'
    ).toString().split('\n\n')
    .filter((commit) => !!commit.length)
    .map(commitData => commitData.trim())
  }));
}

/**
 * @param {Object} settings - whole settings object
 * @param {Date} settings.startTime
 * @param {Date} settings.endTime
 * @param {String} settings.author
 * @param {String} settings.path
 */
module.exports = function(settings) {
  const gitFolders = findRepositories(settings);
  const commits = getRepositoriesCommits(settings, gitFolders);

  return commits;
};
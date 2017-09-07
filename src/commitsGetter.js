const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function getRepositoriesCommits(settings, gitFolders) {
  gitFolders.forEach(gitFolder => {
  console.log( `git --git-dir "${ gitFolder }" log ` +
      `--after="${ settings.startTime.toISOString() }" --before="${ settings.endTime.toISOString() }" --author="${ settings.author }" ` +
      '--branches --no-merges  --pretty=format:"%H;%h;%at;%s" --shortstat')
  })


  return gitFolders.map((gitFolder) => ({
    gitFolder,
    commits: execSync(
      `git --git-dir "${ gitFolder }" log ` +
      `--after="${ settings.startTime.toISOString() }" --before="${ settings.endTime.toISOString() }" --author="${ settings.author }" ` +
      '--branches --no-merges  --pretty=format:"%H;%h;%at;%s" --shortstat'
    ).toString().split('\n\n').filter((commit) => !!commit.length)
  }));
}

module.exports = function(settings) {
  const gitFolders = findRepositories(settings);
  const commits = getRepositoriesCommits(settings, gitFolders);

  return commits;
};
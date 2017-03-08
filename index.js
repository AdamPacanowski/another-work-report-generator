require('./prerequirements');
const settings = require('./settings');

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

//console.log(settings)
const reposWithCommits = fs
  .readdirSync(settings.path)
  /*.filter((folderName) => fs.lstatSync(path.join(settings.path, folderName)).isDirectory())
  .map((folderName) => path.join(settings.path, folderName, '.git'))
  .filter((gitFolderName) => {
    try {
      fs.accessSync(gitFolderName, fs.F_OK);
    } catch (err) {
      return false
    }

    return true;
  })
  .map((gitFolder) => ({
    gitFolder,
    commits: execSync(
      `git --git-dir ${ gitFolder } log ` +
      `--after="${ settings.startTime.toISOString() }" --before="${ settings.endTime.toISOString() }" --author="${ settings.author }" ` +
      '--branches --no-merges  --pretty=format:"%H;%h;%at;%s" --shortstat'
    ).toString().split('\n\n').filter((commit) => !!commit.length)
  }))*/

//console.log(reposWithCommits);
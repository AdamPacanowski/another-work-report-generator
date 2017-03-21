const path = require('path');
const chalk = require('chalk');

const commitsParser = {
  _parse: (rawCommits, settings) => {
    const commits = rawCommits
      .reduce((commitArray, gitReport) => commitArray.concat(
        gitReport.commits.map((commit) => {
          const [description, modifications] = commit.split('\n');
          const [fullhash, hash, datetime, text] = description.split(';');
          const [, deletions = 0] = (/([0-9]+) deletions/.exec(modifications) || []);
          const [, insertions = 0] = (/([0-9]+) insertions/.exec(modifications) || []);
          const date = new Date(datetime * 1000);

          return {
            fullhash,
            hash,
            date,
            shortDate: date.toISOString().split('T')[0],
            text,
            project: gitReport.gitFolder.split(path.sep).reverse()[1],
            lines: parseInt(insertions, 10) + parseInt(deletions, 10)
          };
        })), [])
      .filter(({ date }) => settings.startTime.getTime() < date.getTime() && date.getTime() < settings.endTime.getTime())
      .sort((commitA, commitB) => commitA.date - commitB.date);

    return commits;
  },

  standardCalculation: (rawCommits, settings) => {
    const commits = commitsParser._parse(rawCommits, settings);

    commits.forEach((filteredCommit) => {
      const dayCommits = commits.filter((commit) => commit.shortDate === filteredCommit.shortDate);
      const linesInDay = dayCommits.reduce((prev, act) => prev + act.lines, 0);
      const ratio = filteredCommit.lines / linesInDay;

      filteredCommit.time = parseInt((ratio * settings.maxHoursPerDay) / settings.graduation, 10) * settings.graduation || settings.minCommitTime;
    });

    if (commits.length) {
      console.log(chalk.green(`Found ${ commits.length } commit(s).`));
    } else {
      console.log(chalk.red('No commits found.'));
      process.exit(0);
    }
    return commits;
  }
};

module.exports = commitsParser;
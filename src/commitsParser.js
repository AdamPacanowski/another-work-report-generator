const path = require('path');
const chalk = require('chalk');

/**
 * @typedef {Object} ParsedCommit
 * @property {Date} date Commit date
 * @property {String} fullhash Commit fullhash e.g. "fb1eb3ead0e20fed1029bea0edd7626964df326b"
 * @property {String} hash Commit shorthash e.g. "fb1eb3e"
 * @property {number} lines Lines changed in commit
 * @property {String} project Git repository folder name
 * @property {String} shortDate Date in format YYYY-MM-DD
 * @property {String} text Commit message
 */

/**
 * @typedef {Object} CalculatedCommit
 * @property {ParsedCommit[]} commits Parsed commit with time property
 * @property {number} ParsedCommit.time Estimated work on commit
 * @property {Object} commitsLengthMap key: YYYY-MM-DD value: number
 */

const commitsParser = {
  /**
   * Parse raw commmits (data in string) to array of objects.
   * @param {RepositoriesCommits[]} rawCommits commits to parse
   * @param {Object} settings
   * @param {Date} settings.startTime
   * @param {Date} settings.endTime
   * @returns {ParsedCommit[]}
   */
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

  /**
   * Standard method to calculate commits times.
   * @param {RepositoriesCommits[]} rawCommits commits to parse
   * @param {Object} settings
   * @param {Date} settings.startTime
   * @param {Date} settings.endTime
   * @param {number} settings.maxHoursPerDay
   * @param {number} settings.graduation
   * @param {number} settings.minCommitTime
   * @returns {CalculatedCommit}
   */
  standardCalculation: (rawCommits, settings) => {
    const commits = commitsParser._parse(rawCommits, settings);
    const commitsLengthMap = {};

    commits.forEach((filteredCommit) => {
      const dayCommits = commits.filter((commit) => commit.shortDate === filteredCommit.shortDate);
      const linesInDay = dayCommits.reduce((prev, act) => prev + act.lines, 0);
      const ratio = filteredCommit.lines / linesInDay;

      filteredCommit.time = parseInt((ratio * settings.maxHoursPerDay) / settings.graduation, 10) * settings.graduation || settings.minCommitTime;

      if (!commitsLengthMap[filteredCommit.shortDate]) {
        commitsLengthMap[filteredCommit.shortDate] = dayCommits.length; 
      }
    });

    console.log('');
    if (commits.length) {
      console.log(chalk.green(`Found ${ commits.length } commit(s).`));
      console.log('');
    } else {
      console.log(chalk.red('No commits found.'));
      process.exit(0);
    }
    return  {
      commits,
      commitsLengthMap,
    };
  }
};

module.exports = commitsParser;
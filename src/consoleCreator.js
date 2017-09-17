const chalk = require('chalk');
const moment = require('moment');

/**
 * Displaying commits data in console.
 * @param {ParsedCommit[]} calculatedCommits Parsed commit with time property
 * @param settings
 * @param {String} settings.locale Locales available in momentjs
 */

module.exports = function(calculatedCommits, settings) {
  moment.locale(settings.locale);

  calculatedCommits.forEach((commit) => {
    let line = '';

    const readableDate = moment(commit.date).format('L LT');

    line += chalk.grey(readableDate) + ' ';
    line += chalk.cyan(commit.project) + ' ';
    line += chalk.white(commit.text);

    console.log(line);
  });
};
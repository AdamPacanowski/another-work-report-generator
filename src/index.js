const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

require('date-utils');
require('./prerequirements');
const settings = require('./settings');
const calendar = require('./calendar');
const commitsGetter = require('./commitsGetter');
const commitsParser = require('./commitsParser');
const excelCreator = require('./excelCreator');

const rawCommits = commitsGetter(settings);
const calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);
calendar(settings.startTime, settings.endTime, calculatedCommits.commitsLengthMap);

rl.question('Are you sure to generate report file ? (Y/N)', (answer) => {
  if (answer.toLowerCase() === 'y') {
    excelCreator(calculatedCommits.commits, settings);
  }

  rl.close();
});

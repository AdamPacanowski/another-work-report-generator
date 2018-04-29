const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

require('./prerequirements');
const settings = require('./settings');
const calendar = require('./calendar');
const commitsGetter = require('./commitsGetter');
const commitsParser = require('./commitsParser');
const excelCreator = require('./excelCreator');
const consoleCreator = require('./consoleCreator');

const rawCommits = commitsGetter(settings);

let calculatedCommits;

if (settings.calculationMethod === 'standard') {
  calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);
}
if (settings.calculationMethod === 'equal') {
  calculatedCommits = commitsParser.equalCalculation(rawCommits, settings);
}

if (!settings.disableCalendar) {
  calendar(settings.startTime, settings.endTime, calculatedCommits.commitsLengthMap);
}

let creator;
let questionText;

if (settings.output === 'excel') {
  creator = excelCreator;
  questionText = 'Are you sure to generate report file ? (Y/N) ';
}
if (settings.output === 'console') {
  creator = consoleCreator;
  questionText = 'Are you sure to see list of commits ? (Y/N) ';
}

if (!settings.disableInteractive) {
  rl.question(questionText, (answer) => {
    if (answer.toLowerCase() === 'y') {
      creator(calculatedCommits.commits, settings);
    }

    rl.close();
  });
} else {
  creator(calculatedCommits.commits, settings);
  rl.close();
}

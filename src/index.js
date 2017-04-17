require('./prerequirements');
const settings = require('./settings');

if (settings.showOnlySchedule) {
  require('./windows/timelogger.js');

  //process.exit(0);
  console.log('Press any key to exit');

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
} else {
  const commitsGetter = require('./commitsGetter');
  const commitsParser = require('./commitsParser');
  const excelCreator = require('./excelCreator');

  const rawCommits = commitsGetter(settings);
  const calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);
  excelCreator(calculatedCommits, settings);
}
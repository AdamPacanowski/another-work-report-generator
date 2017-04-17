require('./prerequirements');
const settings = require('./settings');

if (settings.showOnlySchedule) {
  require('./windows/timelogger.js');

  //process.exit(0);
  const spawn = require('cross-spawn');
  const ls = spawn('node_modules/.bin/electron', ['src/electron_app']);

  ls.stdout.on( 'data', data => {
    console.log( `stdout: ${data}` );
  });

  ls.stderr.on( 'data', data => {
    console.log( `stderr: ${data}` );
  });

  ls.on( 'close', code => {
    console.log( `child process exited with code ${code}` );
  });

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
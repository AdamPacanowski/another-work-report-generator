const { execSync } = require('child_process');
const chalk = require('chalk');

if (execSync('git --version').toString().indexOf('git version') === -1) {
  console.log(chalk.red('There is no git installed.'));
  process.exit(1);
}
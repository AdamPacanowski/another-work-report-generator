const { execSync } = require('child_process');

if (execSync('git --version').toString().indexOf('git version') === -1) {
  console.log('There is no git installed.');
  process.exit(1);
}
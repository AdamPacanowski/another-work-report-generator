const { execSync } = require('child_process');

const now = new Date();
const fullYear = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();

function isPreviousMonthReport() {
  return date < 5;
}

module.exports = {
  path: process.cwd(),
  outputPath: process.cwd(),
  month: (() => {
    if (isPreviousMonthReport()) {
      return month === 0 ? 12 : month;
    }

    return month + 1;
  })(),
  year: (() => {
    if (isPreviousMonthReport() && month === 0) {
      return fullYear - 1;
    }

    return fullYear;
  })(),
  author: (() => {
    try {
      return execSync('git config user.name').toString().trim();
    } catch (e) {
      try {
        return execSync('git config user.email').toString().trim().split('@')[0];
      }
      catch (e) {
        return undefined;
      }
    }
  })(),
  maxHoursPerDay: 7,
  minCommitTime: 0.25,
  graduation: 0.25,
  silent: false,
  disableAutoOpenFile: false
};

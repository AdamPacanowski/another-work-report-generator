const { execSync } = require('child_process');

var now = new Date();

function isPreviousMonthReport() {
  return now.getDate() < 5;
}

const defaults = {
  path: process.cwd(),
  month: (() => {
    if (isPreviousMonthReport()) {
      return now.getMonth() === 0 ? 12 : now.getMonth();
    }

    return now.getMonth() + 1;
  })(),
  year: (() => {
    if (isPreviousMonthReport() && now.getMonth() === 0) {
      return now.getFullYear() - 1;
    }

    return now.getFullYear();
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
  silent: false
};

module.exports = defaults;
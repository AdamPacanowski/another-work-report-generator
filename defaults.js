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
  author: execSync('git config user.name').toString().trim(),
  maxHoursPerDay: 7,
  minCommitTime: 0.25,
  graduation: 0.25
};

module.exports = defaults;
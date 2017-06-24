const leftPad = require('left-pad');
const moment = require('moment');
const chalk = require('chalk');

function getDateHash(date) {
  return `${ date.month() };${ date.year() }`;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getDay(day, month, year) {
  return new Date(year, month, day).getDay();
}

function getDayIndent(dayNo) {
  if (dayNo) {
    return dayNo;
  }

  return 7;
}

function drawLine() {
  console.log(leftPad('', 7 * DAY_SPACES, '-'));
}

function drawDayNames() {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayNamesString = dayNames.map(dayName => {
    return leftPad(dayName, DAY_SPACES);
  }).join('');

  console.log(dayNamesString);
}

function drawMonthSignature(month, year) {
  const availableChars = 7 * DAY_SPACES;
  const signature = `${month}.${year}`;
  const left = Math.floor((availableChars + signature.length) / 2 )

  console.log(leftPad(signature, left));
}

function getCommitNo(shortDate, commitsLengthMap) {
  return commitsLengthMap[shortDate] || 0;
}

const DAY_SPACES = 7;

const calendar = function(startDate, endDate, commitsLengthMap) {
  const mStartDate = moment(startDate);
  const mEndDate = moment(endDate);
  const daysToDisplay = {};

  for (let j = mStartDate; j.diff(mEndDate); j.add(1, 'days')) {
    daysToDisplay[getDateHash(j)] = [];
  }

  Object.keys(daysToDisplay).forEach((key) => {
    const splitedKey = key.split(';');
    const month = splitedKey[0];
    const year = splitedKey[1];

    drawLine();
    drawMonthSignature(month, year);
    drawDayNames();
    drawLine();

    let lineToDisplay = '';

    const daysInThisMonth = daysInMonth(month, year);

    for(let i = 1; i <= daysInThisMonth; i++) {
      const dayNo = getDay(i, month, year);
      const shortDate = (new Date(year, month, i)).toISOString().split('T')[0];

      const commitNo = getCommitNo(shortDate, commitsLengthMap);
      let chalkMethod;

      if (commitNo) {
        chalkMethod = chalk.green;
      } else {
        chalkMethod = chalk.red;
      }

      const informationToDisplay = `(${ commitNo })${ i }`;

      if (i === 1) {
        lineToDisplay += chalkMethod(leftPad(
          informationToDisplay, 
          getDayIndent(dayNo * DAY_SPACES)
        ));
      } else {
        lineToDisplay += chalkMethod(leftPad(
          informationToDisplay,
          DAY_SPACES
        ));
      }

      if (dayNo === 0 || i === daysInThisMonth) {
        console.log(lineToDisplay);
        lineToDisplay = '';
      }
    }
  });
};

module.exports = calendar;

/* 
  Czerwiec
  Pon, wt, śr, cz, pią, sob, nie
             (5)1,   2,   3,   4
    5,  6,  7,  8,   9,  10,  11
*/
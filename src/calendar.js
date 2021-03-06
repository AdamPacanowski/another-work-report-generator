const leftPad = require('left-pad');
const moment = require('moment');
const chalk = require('chalk');

/**
 * Get date hash.
 * @param {Moment} date 
 */
function getDateHash(date) {
  return `${ date.month() };${ date.year() }`;
}

/**
 * Get the number of days in month.
 * @param {number} month (0 - 11)
 * @param {number} year
 */
function daysInMonth(month, year) {
  const newMonth = leftPad(Number(month) + 1, 2, '0');

  return moment(`${ year }-${ newMonth }`, 'YYYY-MM').daysInMonth();
}

/**
 * Get day (range => 0 - 6)
 * @param {number} day (1 - 31)
 * @param {number} month (0 - 11)
 * @param {number} year
 */
function getDay(day, month, year) {
  return new Date(year, month, day).getDay();
}

/**
 * Get string in format YYYY-MM-DD.
 * @param {Date} date 
 */
function getYYYYMMDD(date) {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * Get indent for day.
 * @param {number} dayNo (0 - 6)
 */
function getDayIndent(dayNo) {
  if (dayNo) {
    return dayNo;
  }

  return 7;
}

/**
 * Draw line in console.
 */
function drawLine() {
  console.log(leftPad('', 7 * DAY_SPACES, '-'));
}

/**
 * Draw day names in console.
 */
function drawDayNames() {
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayNamesString = dayNames.map(dayName => {
    return leftPad(dayName, DAY_SPACES);
  }).join('');

  console.log(dayNamesString);
}

/**
 * Draw month signature in console.
 * @param {*} month (0 - 11)
 * @param {*} year 
 */
function drawMonthSignature(month, year) {
  const availableChars = 7 * DAY_SPACES;
  const signature = `${+month + 1}.${year}`;
  const left = Math.floor((availableChars + signature.length) / 2 );

  console.log(leftPad(signature, left));
}

/**
 * Get number of commits for proper date
 * @param {String} shortDate (YYYY-MM-DD)
 * @param {Object} commitsLengthMap 
 */
function getCommitNo(shortDate, commitsLengthMap) {
  return commitsLengthMap[shortDate] || 0;
}

/**
 * Check is date in range. 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {*} day 
 * @param {*} month (0 - 11)
 * @param {*} year 
 */
function isInDateRange(startDate, endDate, day, month, year) {
  return moment(new Date(year, month, day))
    .isBetween(
      getYYYYMMDD(startDate), 
      getYYYYMMDD(endDate), 
      null, 
      '[)'
    );
}

const DAY_SPACES = 7;

/**
 * Display calendar in console.
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {Object} commitsLengthMap - key: YYYY-MM-DD value: number
 */
const calendar = function(startDate, endDate, commitsLengthMap) {
  const mStartDate = moment(startDate);
  const mEndDate = moment(endDate);
  const daysToDisplay = {};

  for (let j = mStartDate; j.diff(mEndDate) < 0; j.add(1, 'days')) {
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
      const shortDate = `${ year }-${ leftPad(+month + 1, 2,'0') }-${ leftPad(i, 2, '0') }`;

      const commitNo = getCommitNo(shortDate, commitsLengthMap);
      const isInDateRangeResult = isInDateRange(startDate, endDate, i, month, year);
      let chalkMethod;

      if (commitNo) {
        chalkMethod = chalk.green;
      } else {
        chalkMethod = chalk.red;
      }

      if (!isInDateRangeResult) {
        chalkMethod = chalk.grey;
      }

      const informationToDisplay = `(${ commitNo })${ i }`;

      if (i === 1) {
        lineToDisplay += chalkMethod(leftPad(
          informationToDisplay, 
          getDayIndent(dayNo) * DAY_SPACES
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

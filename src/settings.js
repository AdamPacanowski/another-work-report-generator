const yargs = require('yargs');
const chalk = require('chalk');
const leftPad = require('left-pad');
const moment = require('moment');
const defaults = require('./defaults');

// Parse utils
const parseNumber = function(value, fieldName) {
  const number = parseFloat(value);
  
  if (Number.isNaN(number)) {
    throw new Error(`Parse error - ${ fieldName } isn't a number.`);
  }

  return number;
};

// Yargs config
const argv = yargs
  .version(function() {
    return require('../package.json').version;
  })
  .option('path', {
    alias: 'p',
    describe: 'Repositories root path',
    default: defaults.path
  })
  .option('output-path', {
    alias: 'o',
    describe: 'Generated report path',
    default: defaults.outputPath
  })
  .option('month', {
    alias: 'm',
    describe: 'Report month',
    default: defaults.month,
    coerce: opt => {
      const number = parseNumber(opt, 'Month');

      if (number < 1 || number > 12) {
        throw new Error('Parse error - It isn\'t month number.');
      }

      return number;
    }
  })
  .option('year', {
    alias: 'y',
    describe: 'Report year',
    default: defaults.year,
    coerce: opt => {
      return parseNumber(opt, 'Year');
    }
  })
  .option('author', {
    alias: 'a',
    describe: 'Report author name',
    default: defaults.author,
    coerce: opt => {
      if (!defaults.author) {
        throw new Error('Parse error - Author is missing.');
      }
      return opt;
    }
  })
  .option('max-hours-per-day', {
    describe: 'Number of max hours per day',
    default: defaults.maxHoursPerDay,
    coerce: opt => {
      return parseNumber(opt, 'Max hours per day');
    }
  })
  .option('min-commit-time', {
    describe: 'Number of min commit time in hours',
    default: defaults.minCommitTime,
    coerce: opt => {
      return parseNumber(opt, 'Min commit time in hours');
    }
  })
  .option('graduation', {
    describe: 'Smallest time unit in hours',
    default: defaults.graduation,
    coerce: opt => {
      return parseNumber(opt, 'Graduation');
    }
  })
  .option('silent', {
    describe: 'Disable output in console',
    default: defaults.silent,
    type: 'boolean'
  })
  .option('disable-auto-open-file', {
    describe: 'Disable auto opening new report file',
    default: defaults.disableAutoOpenFile,
    type: 'boolean'
  })
  .option('disable-calendar', {
    describe: 'Disable displaying calendar',
    default: defaults.disableCalendar,
    type: 'boolean'
  })
  .option('disable-interactive', {
    describe: 'Disable interactive command line',
    default: defaults.disableInteractive,
    type: 'boolean'
  })
  .option('last-hours', {
    describe: 'Take commits from last [x] hours. This property override month and year properties.',
    default: defaults.lastHours,
    coerce: opt => {
      if (opt !== null) {
        return parseNumber(opt, 'Last hours');
      }
      return null;
    }
  })
  .option('output', {
    describe: 'Application output {excel, console}',
    default: defaults.output,
    coerce: opt => {
      if (['excel', 'console'].indexOf(opt) === -1) {
        throw new Error('Parse error - Wrong output parameter.');
      }

      return opt;
    }
  })
  .option('locale', {
    describe: 'Date locale (now only for console output)',
    default: defaults.locale,
    type: 'string'
  })
  .wrap(yargs.terminalWidth() || 100)
  .detectLocale(false)
  .help()
  .demandOption((() => {
    if (!defaults.author) {
      return ['author'];
    }

    return [];
  })())
  .argv;

// Creating settings object
const settings = {};
settings.path = argv.path;
settings.outputPath = argv.outputPath;
settings.month = argv.month;
settings.year = argv.year;
settings.author = argv.author;
settings.maxHoursPerDay = argv.maxHoursPerDay;
settings.minCommitTime = argv.minCommitTime;
settings.graduation = argv.graduation;
settings.silent = argv.silent;
settings.disableAutoOpenFile = argv.disableAutoOpenFile;
settings.disableCalendar = argv.disableCalendar;
settings.disableInteractive = argv.disableInteractive;
settings.lastHours = argv.lastHours;
settings.output = argv.output;
settings.locale = argv.locale;


// Computing settings
settings.month = parseInt(settings.month, 10);
settings.year = parseInt(settings.year, 10);

if (settings.lastHours === null) {
  settings.startTime = new Date(settings.year, settings.month - 1, 1);
  settings.endTime = new Date(settings.year + (settings.month === 12 ? 1 : 0), settings.month % 12, 1);
} else {
  settings.startTime = moment().subtract(settings.lastHours, 'hours').toDate();
  settings.endTime = new Date();
}
settings.reportName = `report-${ settings.year }-${ leftPad(settings.month, 2, '0') }.xlsx`;

// Disable output
if (settings.silent) {
  console.log = () => {};
}

// Display settings
console.log(chalk.bold('--- Settings ---'));
for (let key in settings) {
  var toDisplay = settings[key];

  if (settings[key] instanceof Date) {
    toDisplay = moment(settings[key]).format();
  }

  console.log(chalk.white(`${ key }: `) + chalk.cyan(toDisplay));
}

module.exports = settings;
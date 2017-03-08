const argv = require('yargs');
const defaults = require('./defaults');

const parseNumber = function(value, fieldName) {
  const number = parseFloat(value);
  
  if (Number.isNaN(number)) {
    throw new Error(`Parse error - ${ fieldName } isn't a number.`);
  }

  return number;
};

argv
  .version(function() {
    return require('./package.json').version;
  })
  .option('path', {
    alias: 'p',
    describe: 'Repositories root path',
    default: defaults.path
  })
  .option('month', {
    alias: 'm',
    describe: 'Report month',
    default: defaults.month,
    coerce: opt => {
      const number = parseNumber(opt, 'Month');

      if (number < 1 || number > 12) {
        throw new Error(`Parse error - It isn't month number.`);
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
    default: defaults.author
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
  .wrap(argv.terminalWidth())
  .help()
  .argv;

const settings = {};
settings.path = argv.argv.path;
settings.month = argv.argv.month;
settings.year = argv.argv.year;
settings.author = argv.argv.author;
settings.maxHoursPerDay = argv.argv.maxHoursPerDay;
settings.minCommitTime = argv.argv.minCommitTime;
settings.graduation = argv.argv.graduation;

settings.month = parseInt(settings.month, 10);
settings.year = parseInt(settings.year, 10);
settings.startTime = new Date(settings.year, settings.month - 1, 1);
settings.endTime = new Date(settings.year + (settings.month === 12 ? 1 : 0), settings.month % 12, 1);

console.log('settings', settings);

module.exports = settings;
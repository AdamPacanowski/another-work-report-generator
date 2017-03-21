const yargs = require('yargs');
const leftPad = require('left-pad');
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
    return require('./package.json').version;
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
  .wrap(yargs.terminalWidth())
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

// Computing settings
settings.month = parseInt(settings.month, 10);
settings.year = parseInt(settings.year, 10);
settings.startTime = new Date(settings.year, settings.month - 1, 1);
settings.endTime = new Date(settings.year + (settings.month === 12 ? 1 : 0), settings.month % 12, 1);
settings.reportName = `report-${ settings.year }-${ leftPad(settings.month, 2, '0') }.xlsx`;

// Disable output
if (settings.silent) {
  console.log = () => {};
}

// Display settings
console.log('--- Settings ---'.help);
for (let key in settings) {
  console.log(`${ key }: ${ settings[key] }`.help);
}

module.exports = settings;
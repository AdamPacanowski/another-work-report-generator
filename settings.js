const prog = require('caporal');
const version = require('./package.json').version;
const defaults = require('./defaults');

const settings = defaults;

prog
    .version(version)
    .option('--path <path>', `repositories root path (default = ${ defaults.path })`)
    .action((args, options, logger) => {
      settings.path = options.path;
      logger.debug(`Path = ${ settings.path }`);
    })
    .option('--month <month>', `report month (default = ${ defaults.month })`, /^(0?[1-9]|1[012])$/)
    .action((args, options, logger) => {
      settings.month = options.month;
      logger.debug(`Month = ${ settings.month }`);
    })
    .option('--year <year>', `report year (default = ${ defaults.year })`, prog.INT)
    .action((args, options, logger) => {
      settings.year = options.year;
      logger.debug(`Year = ${ settings.year }`);
    })
    .option('--author <author>', `report author name (default = ${ defaults.author })`)
    .action((args, options, logger) => {
      settings.author = options.author;
      logger.debug(`Author = ${ settings.author }`);
    })
    .option('--max-hours-per-day <hours>', `number of max hours per day (default = ${ defaults.maxHoursPerDay })`)
    .action((args, options, logger) => {
      settings.maxHoursPerDay = options.hours;
      logger.debug(`Max hours per day = ${ settings.maxHoursPerDay }`);
    })
    .option('--min-commit-time <hours>', `number of min commit time in hours (default = ${ defaults.minCommitTime })` )
    .action((args, options, logger) => {
      settings.minCommitTime = options.hours;
      logger.debug(`Min commit time = ${ settings.minCommitTime }`);
    })
    .option('--graduation <hours>', `smallest time unit in hours (default = ${ defaults.graduation })`)
    .action((args, options, logger) => {
      if (!options.graduation) { return; } // due to library bug
      settings.graduation = options.graduation;
      logger.debug(`Graduation = ${ settings.graduation }`);
    });

prog.parse(process.argv);

settings.month = parseInt(settings.month, 10);
settings.year = parseInt(settings.year, 10);
settings.startTime = new Date(settings.year, settings.month - 1, 1);
settings.endTime = new Date(settings.year + (settings.month === 12 ? 1 : 0), settings.month % 12, 1);

prog.logger().debug('Settings:', settings);

module.exports = settings;
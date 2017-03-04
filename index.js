const version = require('./package.json').version;
const prog = require('caporal');

const settings = {

};

prog
    .version(version)
    .option('--path <path>', 'repositories root path')
    .action((args, options, logger) => {
      settings.path = options.path;
      logger.debug(`Path = ${ settings.path }`);
    })
    .option('--month <month>', 'report month', /^(0?[1-9]|1[012])$/)
    .action((args, options, logger) => {
      settings.month = options.month;
      logger.debug(`Month = ${ settings.month }`);
    })
    .option('--year <year>', 'report year', prog.INT)
    .action((args, options, logger) => {
      settings.year = options.year;
      logger.debug(`Year = ${ settings.year }`);
    })
    .option('--author <author>', 'report author name')
    .action((args, options, logger) => {
      settings.author = options.author;
      logger.debug(`Author = ${ settings.author }`);
    })
    .option('--max-hours-per-day <hours>', 'number of max hours per day')
    .action((args, options, logger) => {
      settings.maxHoursPerDay = options.hours;
      logger.debug(`Max hours per day = ${ settings.maxHoursPerDay }`);
    })
    .option('--min-commit-time <hours>', 'number of min commit time in hours' )
    .action((args, options, logger) => {
      settings.minCommitTime = options.hours;
      logger.debug(`Min commit time = ${ settings.minCommitTime }`);
    })
    .option('--graduation <hours>', 'smallest time unit in hours')
    .action((args, options, logger) => {
      settings.graduation = options.graduation;
      logger.debug(`Graduation = ${ settings.graduation }`)
    });



prog.parse(process.argv);




console.log(`Month`);
const version = require('./package.json').version;
const prog = require('caporal');

const settings = {

};

prog
    .version(version)
    .option('--month <month>', 'Set report month', /^(0?[1-9]|1[012])$/)
    .action((args, options, logger) => {
      settings.month = args[1];
      logger.debug(`Month = ${ settings.month }`);
    });



prog.parse(process.argv);




console.log(`Month`);
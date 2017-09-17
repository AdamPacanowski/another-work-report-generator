const _ = require('lodash');

module.exports = {
  findPatternInArray(buffer, regex) {
    return _.findIndex(buffer, (str) => {
      return str.match(regex);
    });
  },

  prepareBuffer() {
    const consoleBuffer = [];

    console.log = (message) => {
      consoleBuffer.push(message);
    };

    return consoleBuffer;
  },

  clearProcessArgv() {
    const processArgv = JSON.parse(JSON.stringify(process.argv));
    const testsIndex = processArgv.indexOf('tests');

    processArgv.splice(testsIndex + 1);

    process.argv = processArgv;
  }
};
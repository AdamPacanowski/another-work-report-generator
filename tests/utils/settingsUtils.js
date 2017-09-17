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
  }
};
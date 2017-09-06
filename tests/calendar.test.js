const moment = require('moment');
const calendar = require('../src/calendar');
const stubRepoCreator = require('./stubRepoCreator');

test('getDateHash', () => {
    stubRepoCreator([{
        date: new Date(),
        linesChanged: 10
    }]);
});

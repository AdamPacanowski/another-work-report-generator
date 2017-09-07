const moment = require('moment');
const calendar = require('../src/calendar');
const stubRepoCreator = require('./stubRepoCreator');

test('getDateHash', () => {
    stubRepoCreator([{
        date: new Date('2017-01-01 12:00:00'),
        linesChanged: 10
    }, {
        date: new Date('2017-01-01 14:00:00'),
        linesChanged: 100
    }, {
        date: new Date('2017-01-02 12:00:00'),
        linesChanged: 50
    }, {
        date: new Date('2017-01-03 12:00:00'),
        linesChanged: 100
    }]);
});

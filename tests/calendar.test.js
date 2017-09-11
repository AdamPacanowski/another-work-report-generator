const chalk = require('chalk');
const leftPad = require('left-pad');
const calendar = require('../src/calendar');
const stubRepoCreator = require('./stubRepoCreator');

/*test('getDateHash', () => {
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
});*/

const DAY_SPACES = 7;

/**
 * Generate single calendar value to compare
 * @param {string} firstNumber 
 * @param {string} secondNumber 
 * @param {string} color 
 */
function prepareValueToTest(firstNumber, secondNumber, color) {
    return chalk[color](leftPad(
        `(${ firstNumber })${ secondNumber }`,
        DAY_SPACES
    ));
}

/**
 * Generate string values in selected color
 * e.g. prepareNextValues(9, 15, 'red') 
 * => "     (0)9  (0)10  (0)11  (0)12  (0)13  (0)14  (0)15"
 * in red color
 * @param {number} start 
 * @param {number} end 
 * @param {string} color 
 */
function prepareNextValues(start, end, color) {
    let text = '';

    for (let i = start; i <= end; i++) {
        text += chalk[color](leftPad(
            `(0)${ i }`,
            DAY_SPACES
        ));
    }

    return text;
}


let consoleBuffer;

beforeEach(() => {
    consoleBuffer = [];

    console.log = (message) => {
        consoleBuffer.push(message);
    }
});

test('simple calendar test', () => {
    const startDate = new Date('2017-01-01');
    const endDate = new Date('2017-02-01');
    const commitsLengthMap = {
        '2017-01-01': 1,
        '2017-01-02': 2,
        '2017-01-03': 1
    };

    calendar(startDate, endDate, commitsLengthMap);

    expect(consoleBuffer[0]).toBe('-------------------------------------------------');
    expect(consoleBuffer[1]).toBe('                     1.2017');
    expect(consoleBuffer[2]).toBe('    Mon    Tue    Wed    Thu    Fri    Sat    Sun');
    expect(consoleBuffer[3]).toBe('-------------------------------------------------');    
    expect(consoleBuffer[4]).toBe(chalk.green(leftPad('(1)1', 49)));
    expect(consoleBuffer[5]).toBe(
        [
            prepareValueToTest(2, 2, 'green'),
            prepareValueToTest(1, 3, 'green'),
            prepareValueToTest(0, 4, 'red'), prepareValueToTest(0, 5, 'red'),
            prepareValueToTest(0, 6, 'red'), prepareValueToTest(0, 7, 'red'),
            prepareValueToTest(0, 8, 'red')
        ].join('')
    );
    expect(consoleBuffer[6]).toBe(prepareNextValues(9, 15, 'red'));
    expect(consoleBuffer[7]).toBe(prepareNextValues(16, 22, 'red'));
    expect(consoleBuffer[8]).toBe(prepareNextValues(23, 29, 'red'));
    expect(consoleBuffer[9]).toBe(prepareNextValues(30, 31, 'red'));
});

test('two month calendar', () => {
    const startDate = new Date('2017-01-01');
    const endDate = new Date('2017-03-01');
    const commitsLengthMap = {
        '2017-01-01': 1,
        '2017-01-02': 2,
        '2017-01-03': 1,
        '2017-02-01': 5,
        '2017-02-03': 1
    };

    calendar(startDate, endDate, commitsLengthMap);

    expect(consoleBuffer[0]).toBe('-------------------------------------------------');
    expect(consoleBuffer[1]).toBe('                     1.2017');
    expect(consoleBuffer[2]).toBe('    Mon    Tue    Wed    Thu    Fri    Sat    Sun');
    expect(consoleBuffer[3]).toBe('-------------------------------------------------');    
    expect(consoleBuffer[4]).toBe(chalk.green(leftPad('(1)1', 49)));
    expect(consoleBuffer[5]).toBe(
        [
            prepareValueToTest(2, 2, 'green'),
            prepareValueToTest(1, 3, 'green'),
            prepareValueToTest(0, 4, 'red'), prepareValueToTest(0, 5, 'red'),
            prepareValueToTest(0, 6, 'red'), prepareValueToTest(0, 7, 'red'),
            prepareValueToTest(0, 8, 'red')
        ].join('')
    );
    expect(consoleBuffer[6]).toBe(prepareNextValues(9, 15, 'red'));
    expect(consoleBuffer[7]).toBe(prepareNextValues(16, 22, 'red'));
    expect(consoleBuffer[8]).toBe(prepareNextValues(23, 29, 'red'));
    expect(consoleBuffer[9]).toBe(prepareNextValues(30, 31, 'red'));

    expect(consoleBuffer[10]).toBe('-------------------------------------------------');
    expect(consoleBuffer[11]).toBe('                     2.2017');
    expect(consoleBuffer[12]).toBe('    Mon    Tue    Wed    Thu    Fri    Sat    Sun');
    expect(consoleBuffer[13]).toBe('-------------------------------------------------');    
    expect(consoleBuffer[14]).toBe(
        [
            chalk.green(leftPad('(5)1', 3 * DAY_SPACES)),
            prepareValueToTest(0, 2, 'red'),
            prepareValueToTest(1, 3, 'green'),
            prepareNextValues(4, 5, 'red')
        ].join('')
    );
    expect(consoleBuffer[15]).toBe(prepareNextValues(6, 12, 'red'));
    expect(consoleBuffer[16]).toBe(prepareNextValues(13, 19, 'red'));
    expect(consoleBuffer[17]).toBe(prepareNextValues(20, 26, 'red'));
    expect(consoleBuffer[18]).toBe(prepareNextValues(27, 28, 'red'));
});

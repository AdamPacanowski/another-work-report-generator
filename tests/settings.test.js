const _ = require('lodash');
const moment = require('moment');

let consoleBuffer;
let orginalArgv = JSON.stringify(process.argv);

function findPatternInArray(regex) {
    return _.findIndex(consoleBuffer, (str) => {
        return str.match(regex);
    });
}

beforeEach(() => {
    consoleBuffer = [];

    console.log = (message) => {
        consoleBuffer.push(message);
    }

    process.argv = JSON.parse(orginalArgv);
});

test('simple settings test', () => {
    process.argv.push('--month=1');
    process.argv.push('--graduation=0.5');
    
    const settings = require('../src/settings');

    expect(settings.month).toBe(1);
    expect(settings.graduation).toBe(0.5);
    console.log(consoleBuffer);
    expect(findPatternInArray(/month.*1/)).not.toBe(-1);
    expect(findPatternInArray(/graduation.*0.5/)).not.toBe(-1);
});

test('silent test', () => {
    process.argv.push('--silent');
    process.argv.push('--graduation=0.5');

    const settings = require('../src/settings');

    expect(settings.graduation).toBe(0.5);

    expect(findPatternInArray(/graduation.*0.5/)).toBe(-1);
});

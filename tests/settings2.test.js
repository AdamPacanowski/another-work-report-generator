const moment = require('moment');

const defaults = require('../src/defaults');

test('lastHours property test', () => {
  const orginalArgv = JSON.stringify(process.argv);

  process.argv.push('--last-hours=24');
  process.argv.push('--silent');

  const momentNow = new moment();

  const settings = require('../src/settings');

  expect(momentNow.diff(settings.startTime, 'minutes')).toBe(1439);
  expect(momentNow.diff(settings.endTime, 'minutes')).toBe(0);   
    
  expect(settings.graduation).toBe(defaults.graduation);

  process.argv = JSON.parse(orginalArgv);
});

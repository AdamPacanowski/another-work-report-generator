const settingsUtils = require('./utils/settingsUtils');

// Settings tests are splitted by files due to node cache bug.

test('simple settings test', () => {
  settingsUtils.clearProcessArgv();
  const buffer = settingsUtils.prepareBuffer();

  process.argv.push('--month=1');
  process.argv.push('--graduation=0.5');
    
  const settings = require('../src/settings');

  expect(settings.month).toBe(1);
  expect(settings.graduation).toBe(0.5);

  expect(settingsUtils.findPatternInArray(buffer, /month.*1/))
    .not.toBe(-1);
  expect(settingsUtils.findPatternInArray(buffer, /graduation.*0.5/))
    .not.toBe(-1);
});

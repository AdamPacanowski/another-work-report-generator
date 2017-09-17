const settingsUtils = require('./utils/settingsUtils');

test('silent test', () => {
  settingsUtils.clearProcessArgv(); 

  const buffer = settingsUtils.prepareBuffer();

  process.argv.push('--silent');
  process.argv.push('--graduation=0.5');

  const settings = require('../src/settings');

  expect(settings.graduation).toBe(0.5);

  expect(settingsUtils.findPatternInArray(buffer, /graduation.*0.5/))
    .toBe(-1);
});

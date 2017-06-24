require('date-utils');
require('./prerequirements');
const settings = require('./settings');
const calendar = require('./calendar');
const commitsGetter = require('./commitsGetter');
const commitsParser = require('./commitsParser');
const excelCreator = require('./excelCreator');

const rawCommits = commitsGetter(settings);
const calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);
calendar(settings.startTime, settings.endTime, calculatedCommits.commitsLengthMap);
excelCreator(calculatedCommits.commits, settings);

require('./prerequirements');
const settings = require('./settings');
const commitsGetter = require('./commitsGetter');
const commitsParser = require('./commitsParser');
const excelCreator = require('./excelCreator');

const rawCommits = commitsGetter(settings);
const calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);
excelCreator(calculatedCommits);

console.log(calculatedCommits);
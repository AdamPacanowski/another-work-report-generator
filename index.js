require('./prerequirements');
const settings = require('./settings');
const commitsGetter = require('./commitsGetter');
const commitsParser = require('./commitsParser');

const rawCommits = commitsGetter(settings);
const calculatedCommits = commitsParser.standardCalculation(rawCommits, settings);

console.log(calculatedCommits);
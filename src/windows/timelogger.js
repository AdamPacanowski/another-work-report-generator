const edge = require('edge');

const assemblyFile = 'bin/TimeLibrary.dll';

const test = edge.func({
  assemblyFile,
  methodName: 'InvokeTest'
});

test({
  test: (status) => { console.log('Windows session status: ' + status); }
});

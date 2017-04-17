const edge = require('electron-edge');

const assemblyFile = 'bin/TimeLibrary.dll';

const test = edge.func({
  assemblyFile,
  methodName: 'InvokeTest'
});

test({
  test: (status) => { 
    console.log('Windows session status: ' + status); 

    var node = document.createElement('div');
    var textnode = document.createTextNode(status + ' ' + new Date());
    node.appendChild(textnode);
    document.getElementsByTagName('body')[0].appendChild(node);
    console.log('document', document)
  }
});

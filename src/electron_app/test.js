const edge = require('electron-edge');

const assemblyFile = 'bin/SessionLibrary.dll';

const test = edge.func({
  assemblyFile,
  typeName: 'SessionLibrary.Startup',
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

const remote = require('electron').remote;  
const edge = require('electron-edge');

const assemblyFile = 'bin/SessionLibrary.dll';

const test = edge.func({
  assemblyFile,
  typeName: 'SessionLibrary.Startup',
  methodName: 'InvokeTest'
});

console.log('app', remote.getGlobal('app'));

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

const remote = require('electron').remote;
const app = remote.getGlobal('app');
const fs = require('fs');
const path = require('path');
const edge = require('electron-edge');
const lowdb = require('lowdb');


const assemblyFile = 'bin/SessionLibrary.dll';

const sessionHandler = edge.func({
  assemblyFile,
  typeName: 'SessionLibrary.Startup',
  methodName: 'InvokeTest'
});

/*const documentsPath = app.getPath('documents');
const applicationFolder = path.join(documentsPath, 'another-work-report-generator');

if (!fs.existsSync(applicationFolder)) {
  fs.mkdirSync(applicationFolder);
}

const dbFile = path.join(applicationFolder, 'db.json');
const db = lowdb(dbFile, {
  storage: require('lowdb/lib/storages/file-async')
});
db.defaults({
  log: []
}).write();*/

sessionHandler({
  test: (status) => {
    const time = new Date();

    var node = document.createElement('div');
    var textnode = document.createTextNode(status + ' ' + new Date());
    node.appendChild(textnode);
    document.getElementsByTagName('body')[0].appendChild(node);

    /*db.get('log')
      .push({
        time,
        eventType: status
      })
      .write();*/
  }
});

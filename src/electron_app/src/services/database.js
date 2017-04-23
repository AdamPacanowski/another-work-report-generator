'use babel';

import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import lowdb from 'lowdb';

const app = remote.getGlobal('app');

class Database {
  constructor() {
    const documentsPath = app.getPath('documents');
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
    }).write();

    console.log('log', db.get('log').values());
  }
}

export default Database;

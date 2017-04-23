'use babel';

import Database from './database';

class Services {
  constructor() {
    this.database = new Database();
  }
}

export default new Services();

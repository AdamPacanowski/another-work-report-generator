'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './MainView';
import Services from './services/init';

console.log('start');

window.onload = function() {
  const db = Services.database;
  ReactDOM.render(<MainView />, document.getElementById('app'));
};

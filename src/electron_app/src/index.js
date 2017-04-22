'use babel';

import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './MainView';

window.onload = function() {
  ReactDOM.render(<MainView />, document.getElementById('app'));
};

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import App from './App';

import './index.css';

// Initialization of the redux store
const store = configureStore();

// Render the application
ReactDOM.render(
  <MuiThemeProvider>
    <App store={store} />
  </MuiThemeProvider>,
  document.querySelector('#root')
);

registerServiceWorker();

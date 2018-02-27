import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MemoryRouter as Router } from 'react-router-dom';
import theme from './theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();

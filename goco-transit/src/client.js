import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MemoryRouter as Router } from 'react-router-dom';
import theme from './theme';

import App from './app'

render(
  // Pass down the theme through the whole app
  <MuiThemeProvider theme={theme}>
    <Router>
      <App userAgent={navigator.userAgent} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)

if (module.hot)
  module.hot.accept()
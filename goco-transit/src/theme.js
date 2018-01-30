import React from 'react'
import createMuiTheme from 'material-ui/styles/createMuiTheme';

// Theme for the whole app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#014983',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00AEEF',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
});

export default theme
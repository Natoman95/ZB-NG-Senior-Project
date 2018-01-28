import React from 'react';
import { withStyles } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import Main from './components/main';

// Universal color theme
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

// Main page for the application
class App extends React.Component {
  render() {
    return (
      // Pass down the theme through the whole app
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    );
  }
}

export default withStyles()(App);
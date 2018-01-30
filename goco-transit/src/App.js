import React from 'react';
import { withStyles } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/main';
import { MemoryRouter as Router } from 'react-router-dom'
import theme from './theme'

// Main page for the application
class App extends React.Component {
  render() {
    return (
      // Pass down the theme through the whole app
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Main />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withStyles()(App);
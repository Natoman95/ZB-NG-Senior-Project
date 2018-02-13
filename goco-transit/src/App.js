import React from 'react';
import { withStyles } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MemoryRouter as Router } from 'react-router-dom';
import theme from './theme';

// Components
import Main from './components/main';
import Login from './components/login';

// Services
import { isAuthenticated } from './services/auth-service';

// Main page for the application
class App extends React.Component {

  // Depending on the user's authentication status, either the main component
  // or the login component will be displayed
  render() {
    if (isAuthenticated() === true) {
      return (
        <div>
          <Main />
        </div>
      );
    }
    else {
      return (
        <div>
          <Login />
        </div>
      );
    }
  }
}

export default withStyles()(App);
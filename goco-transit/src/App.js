import React from 'react';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Components
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';

// Services
import { isAuthenticated } from './services/auth-service';

// Main page for the application
class App extends React.Component {
  constructor() {
    super();

    this.onAuthChange = this.onAuthChange.bind(this);
  }

  onAuthChange() {
    // Force this component to re-render
    this.forceUpdate();
  }

  // Depending on the user's authentication status, either the main component
  // or the login component will be displayed
  render() {
    let content = (<div></div>);
    if (isAuthenticated()) {
      content = (<MainPage onLogout={this.onAuthChange} />);
    }
    else {
      content = (<LoginPage onLogin={this.onAuthChange} />);
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          {content}
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default withStyles()(App);
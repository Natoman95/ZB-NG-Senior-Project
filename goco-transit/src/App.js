import React from 'react';
import { withStyles } from 'material-ui/styles';

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
    if (isAuthenticated()) {
      return (
        <div>
          <MainPage onLogout={this.onAuthChange} />
        </div>
      );
    }
    else {
      return (
        <div>
          <LoginPage onLogin={this.onAuthChange} />
        </div>
      );
    }
  }
}

export default withStyles()(App);
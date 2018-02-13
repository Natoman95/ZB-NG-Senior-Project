import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Gordon360Home from '../images/gordon_360_home.png';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router'

// Services
import { authenticate } from '../services/auth-service';

// Login page component
class Login extends React.Component {
  constructor() {
    super();
    // We need the component's state so we can trigger a page refresh
    this.state = {
      triggerRedirect: false
    }
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  // Authenticate the user and trigger a page change
  handleClickLogin() {
    authenticate();
    this.setState({ fireRedirect: true });
  }

  render() {
    return (
      <div>
        {/* Header bar with app title */}
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              GoCo Transit
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Login information is displayed on a card */}
        <div style={{ margin: "1.5em" }}>
          <Card>

            {/* An image of Gordon 360 to nofity the user to use
            their 360 credentials */}
            <CardMedia
              style={{ width: "100%", height: "12em" }}
              image={Gordon360Home}
            />

            {/* Username */}
            <CardContent>
              <TextField
                id="userName"
                label="Username"
                variant="username"
                margin="none"
                style={{ width: "100%" }}
              />

              <div style={{ margin: "1em" }}>
              </div>

              {/* Password */}
              <TextField
                id="password"
                label="Password"
                variant="password"
                margin="none"
                style={{ width: "100%" }}
              />
            </CardContent>

            {/* Login button */}
            <CardActions>
              <Button color="secondary" onClick={this.handleClickLogin}>
                Login
              </Button>
              {/* If the component state changed, then redirect to the first
              of the tab components */}
              {this.state.triggerRedirect && (
                <Redirect to={"/"} />
              )}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
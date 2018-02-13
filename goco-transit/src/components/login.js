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

// Main app component
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      triggerRedirect: false
    }
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  handleClickLogin() {
    authenticate();
    this.setState({ fireRedirect: true });
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              GoCo Transit
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ margin: "1.5em" }}>
          <Card>
            <CardMedia
              style={{ width: "100%", height: "12em" }}
              image={Gordon360Home}
            />

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

              <TextField
                id="password"
                label="Password"
                variant="password"
                margin="none"
                style={{ width: "100%" }}
              />
            </CardContent>

            <CardActions>
              <Button color="secondary" onClick={this.handleClickLogin}>
                Login
              </Button>
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
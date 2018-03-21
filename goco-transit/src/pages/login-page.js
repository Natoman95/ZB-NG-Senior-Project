import React from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import GordonLogo from '../images/gordon_logo.svg';
import theme from '../theme';

// Services
import { authenticate } from '../services/auth-service';

// Login page component
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      password: null,
      loginFailed: false,
      errorMessage: null,
      loading: false,
    }

    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  // Authenticate the user and trigger a page change
  async handleClickLogin(event) {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      await authenticate(this.state.userName, this.state.password);
      this.props.onLogin();
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false, loginFailed: true });
    }
  }

  // Set state variables
  handleFormChange(input) {
    return event => {
      this.setState({ [input]: event.target.value });
      this.setState({ loginFailed: false });
    };
  }

  // Depending on the user's authentication status, either the login component
  // will be displayed or the user will be redirected to the first tab
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
            {/* Username */}
            <form onSubmit={this.handleClickLogin}>
              <CardContent>
                <Grid container>
                  {/* Gordon Logo */}
                  <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center"
                      style={{ backgroundColor: theme.palette.primary.main }} >
                      <Grid item style={{ padding: "2em" }}>
                        <img style={{ width: '100%' }} src={GordonLogo} alt='Gordon Logo' />
                      </Grid>
                    </Grid>
                    {/* Reminder that login happens through 360 */}
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item style={{ paddingTop: "1.5em" }}>
                        <Typography variant="subheading">Log in through Gordon 360</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <TextField
                  id="userName"
                  label="Username"
                  placeholder="firstname.lastname"
                  variant="username"
                  margin="none"
                  value={this.state.userName}
                  onChange={this.handleFormChange('userName')}
                  style={{ width: "100%", paddingTop: '1em' }}
                />

                <div style={{ margin: "1em" }}>
                </div>

                {/* Password */}
                <TextField
                  id="password"
                  label="Password"
                  variant="password"
                  type="password"
                  margin="none"
                  value={this.state.password}
                  onChange={this.handleFormChange('password')}
                  style={{ width: "100%" }}
                />

                {/* Error message if login fails */}
                {this.state.loginFailed &&
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{ paddingTop: "1em", paddingLeft: "1em", color: "#ff3300" }}
                  >
                    {this.state.errorMessage}
                  </Typography>
                }
              </CardContent>

              {/* Login button */}
              <CardActions>
                <Grid container style={{ paddingBottom: "1em" }}>
                  <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item>
                        <Button
                          variant="raised"
                          type="submit"
                          color="secondary"
                          disabled={this.state.loading}
                        >
                          {!this.state.loading && 'SIGN IN'}
                          {this.state.loading && <CircularProgress size={24} />}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardActions>
            </form>
          </Card>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
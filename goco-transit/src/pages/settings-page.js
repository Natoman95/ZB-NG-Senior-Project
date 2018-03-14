import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { Redirect } from 'react-router'

// Components
import { Icons } from '../icon-library';

// Services
import { signOut, isAuthenticated } from '../services/auth-service';
import { getUser } from '../services/user-service';

// Component for changing settings
class SettingsPage extends React.Component {
  constructor() {
    super();
    // We need the component's state so we can trigger a page refresh
    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      displayPhone: false,
      displayEmail: true,
      privacyComplete: true,
      waiverComplete: true,
      termsComplete: true,
      triggerReRender: false,
      user: null,
      firstName: null,
      lastName: null,
      phoneNum: null,
      email: null,
      loading: true,
    }
    // The click handlers needs "this"
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentWillMount() {
    this.loadUserData();
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    let data = await getUser();
    console.log(data);
    this.setState({
      user: data,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNum: data.phoneNum,
      email: data.email,
      userName: data.userName,
      loading: false,
    });
  };

  // Authenticate the user and trigger a page change
  handleClickLogout() {
    signOut();
    this.setState({ triggerReRender: true });
  }

  // Redirect to 360 to edit user info
  handleClickEdit() {
    window.location = "https://360.gordon.edu/#/profile/" + this.state.userName;
  }

  // Bind dialog data to the state
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  // If the user is logged in, then display the settings
  // But if the logout button is clicked, redirect to the login page
  render() {
    if (isAuthenticated()) {
      if (!this.state.loading) {
        return (
          <div>
            <Grid container>
              <Grid item xs={8}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item>
                    <h3>
                      Contact Information
                    </h3>
                  </Grid>
                </Grid>
              </Grid>

              {/* Button for editing contact information */}
              <Grid item xs={4}>
                <Grid container direction="row" justify="flex-end" alignItems="center">
                  <Grid item>
                    <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleClickEdit}>
                      {Icons.editIcon}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Shows which legal agreements have been completed */}
            <h3>
              Legal Agreements
            </h3>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={this.state.waiverComplete}
                    value="waiverComplete"
                  />
                }
                label="Liability Waiver"
              />
            </FormGroup>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={this.state.privacyComplete}
                    value="privacyComplete"
                  />
                }
                label="Privacy Policy"
              />
            </FormGroup>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={this.state.termsComplete}
                    value="termsComplete"
                  />
                }
                label="Terms of Use"
              />
            </FormGroup>

            <div style={{ padding: '.75em', }}>
            </div>

            {/* Button to logout */}
            <Button
              variant="raised"
              color="secondary"
              style={{ width: '100%', }}
              onClick={this.handleClickLogout}
            >
              Logout
            </Button>
          </div>
        )
      }
      else {
        return (<div>
          <Button
            variant="raised"
            color="secondary"
            style={{ width: '100%', }}
            onClick={this.handleClickLogout}
          >
            Logout
          </Button>
        </div>);
      }
    }
    else {
      return (
        <Redirect to={"/"} />
      )
    }
  }
}

export default SettingsPage;
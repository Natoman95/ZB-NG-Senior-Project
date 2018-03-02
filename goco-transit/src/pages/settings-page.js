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
    }
    // The click handler needs "this"
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  componentWillMount() {
    this.loadUserData();
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    let data = await getUser();
    this.setState({
      user: data,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNum: data.phoneNum,
      email: data.email,
    });
  };

  // Authenticate the user and trigger a page change
  handleClickLogout() {
    signOut();
    this.setState({ triggerReRender: true });
  }

  // Bind dialog data to the state
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  // If the user is logged in, then display the settings
  // But if the logout button is clicked, redirect to the login page
  render() {
    if (isAuthenticated()) {
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
                  <Button variant="fab" color="secondary" aria-label="add">
                    {Icons.editIcon}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div style={{ padding: '.75em', }}>
            Name: {this.state.firstName} {this.state.lastName}
          </div>
          <div style={{ padding: '.75em', }}>
            Phone: {this.state.phoneNum}
          </div>
          <div style={{ padding: '.75em', }}>
            Email: {this.state.email}
          </div>

          {/* Decide which contact information will be shared with riders */}
          <h3>
            Contact Information to Share
          </h3>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.displayPhone}
                  onChange={this.handleChange('displayPhone')}
                  value="displayPhone"
                  color="secondary"
                />
              }
              label="Phone Number"
            />
          </FormGroup>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.displayEmail}
                  onChange={this.handleChange('displayEmail')}
                  value="displayEmail"
                />
              }
              label="Email Address"
            />
          </FormGroup>

          {/* Shows which legal agreements have been completed */}
          <h3>
            Legal Agreements
          </h3>

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.waiverComplete}
                  onChange={this.handleChange('waiverComplete')}
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
                  checked={this.state.privacyComplete}
                  onChange={this.handleChange('privacyComplete')}
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
                  checked={this.state.termsComplete}
                  onChange={this.handleChange('termsComplete')}
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
      return (
        <Redirect to={"/"} />
      )
    }
  }
}

export default SettingsPage;
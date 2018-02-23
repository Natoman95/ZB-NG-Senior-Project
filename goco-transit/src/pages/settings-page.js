import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { Redirect } from 'react-router'

// Components
import {Icons} from '../components/icon-library';

// Services
import { signOut, isAuthenticated } from '../services/auth-service';

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
    }
    // The click handler needs "this"
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

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
                  <h2>
                    Contact Information
              </h2>
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
            Name: Nathan Gray
        </div>
          <div style={{ padding: '.75em', }}>
            Phone: 999-888-7777
        </div>
          <div style={{ padding: '.75em', }}>
            Email: nathan.gray@gordon.edu
        </div>

          {/* Decide which contact information will be shared with riders */}
          <h2>
            Contact Information to Share
        </h2>

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
          <h2>
            Legal Agreements
        </h2>

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
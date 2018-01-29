import React from 'react';
import Grid from 'material-ui/Grid';
import CreateIcon from 'material-ui-icons/Create';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class Settings extends React.Component {
  state = {
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
    displayPhone: false,
    displayEmail: true,
    privacyComplete: true,
    waiverComplete: true,
    termsComplete: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
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
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Button fab color="secondary" aria-label="add">
                  <CreateIcon />
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

        <Button raised color="secondary" style={{ width: '100%', }}>
          Logout
        </Button>

      </div>
    );
  }
}

export default Settings;
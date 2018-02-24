import React from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import ZachPhoto from '../images/user_profile_zach.jpg'
import NathanPhoto from '../images/user_profile_nathan.jpg'
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

// Components
import AddRequestDialog from '../components/add-request-dialog';
import {Icons} from '../icon-library';

// Services
import { findOfferedRides } from '../services/ride-service';

/** 
 * This page is displayed when a user wants to find a ride somewhere.
 * It allows the user to search for a ride by location and date range
 */
class RequestSearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      displayAddRequestDialog: false,
      origin: null,
      destination: null,
      startDate: null,
      endDate: null,
      results: null
    };
  }

  // Returns the current date and time in datetime-local format ("YYYY-MM-DDTHH:MM")
  getDateTime = () => {
    var now = new Date();
    return this.pad(now.getFullYear(), 4)
           + "-" + this.pad((now.getMonth() + 1), 2)
           + "-" + this.pad(now.getDate(), 2)
           + "T" + this.pad(now.getHours(), 2)
           + ":" + this.pad(now.getMinutes(), 2)
  };

  // Pads a number with leading zeroes and returns it as a String
  pad = (number, length) => {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }
  
  /**
   * Finds a future date offset from today in YYYY-MM-DD format
   */
  getFutureDate = (offset) => {
    // Creates a date object based on the current day and offsets it by a constant
    let date = new Date();
    let nextDate = new Date(date);
    nextDate.setDate(date.getDate() + offset);

    let dd = nextDate.getDate();
    let mm = nextDate.getMonth() + 1; //January is 0
    let yyyy = nextDate.getFullYear();

    // Handle single-digit days and months
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    let formattedDate = yyyy + '-' + mm + '-' + dd;

    return formattedDate;
  }

  /**
   * When the search button is clicked, rides matching the user's parameters must be found
   */
  handleClickSearch = () => {
    this.setState({
      results: findOfferedRides(this.state.startDate, this.state.endDate,
        this.state.origin, this.state.destination)
    });
  }

  // Change state variables based on changes to input forms
  handleFormChange = (input) => {
    return event => {
      this.setState({ [input]: event.target.value });
    };
  }

  render() {
    return (
      <div>
        {/* Ride Search dialog */}
        <h3>
          Find a Ride by Location
        </h3>

        {/* Location entry */}
        <div style={{ marginTop: '2em' }}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={6}>
              <TextField // Origin (start)
                style = {{width: 228.42}} // Same width as departure fields
                id="origin"
                label="Origin"
                type="search"
                margin="normal"
                value={this.state.origin}
                onChange={this.handleFormChange('origin')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField // Destination (end)
                style = {{width: 228.42}} // Same width as departure fields
                id="destination"
                label="Destination"
                type="search"
                margin="normal"
                value={this.state.destination}
                onChange={this.handleFormChange('destination')}
              />
            </Grid>
          </Grid>
        </div>

        {/* Date range selection */}
        <div style={{ marginTop: '2em' }}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={6}>
              <form noValidate>
                <TextField
                  id="startDate"
                  label="Earliest Possible Departure"
                  type="datetime-local"
                  // Default time for the start date is today
                  defaultValue={this.getDateTime()}
                  min={this.getDateTime()}
                  value={this.state.startDate}
                  onChange={this.handleFormChange('startDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <form noValidate>
                <TextField
                  id="startDate"
                  label="Latest Possible Departure"
                  type="datetime-local"
                  // Default time for the max date is tomorrow
                  defaultValue={this.getDateTime()}
                  min={this.getDateTime()}
                  onChange={this.handleFormChange('endDate')}
                  value={this.state.endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
          </Grid>
        </div>

        {/* Search button */}
        <div>
          <Button
            variant="raised"
            color="secondary"
            style={{ width: '100%', marginTop: '2em' }}
            onClick={this.handleClickSearch}
          >
            Search
          </Button>
        </div>

        {/* Search Results - visible only if user has hit the search button 
         Generated from an array of results */}
        {this.state.results !== null &&
          <div style={{ marginTop: '3em' }}>
            <h3>
              Results
            </h3>

            {this.state.results.map((result) => {
              return (
                <List dense={this.state.dense}>
                  <ListItem
                    button
                    disableGutters={this.state.noGutters}
                    divider={this.state.divider}
                    onClick={() => { this.addRequestDialogChild.handleClickOpen(); }}>
                    {/* Driver profile picture */}
                    <Avatar src={result.driver.profilePhoto} />
                    {/* Ride date */}
                    <ListItemText
                      primary={result.destination}
                      secondary={this.state.secondary ? result.date : null}
                    />
                  </ListItem>
                </List>
              );
            })}
          </div>
        }

        {/* Dialog box */}
        <AddRequestDialog ref={(addRequestDialogInstance) => { this.addRequestDialogChild = addRequestDialogInstance; }} />

      </div>
    );
  }
}

export default RequestSearchPage;
import React from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List'; import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

// Components
import AddRequestDialog from '../components/dialog-boxes/add-request-dialog';

// Services
import { searchOfferedRides } from '../services/ride-service';

/** 
 * This page is displayed when a user wants to find a ride somewhere.
 * It allows the user to search for a ride by location and date range
 */
class SearchPage extends React.Component {
  constructor(props) {
    super(props);

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

  componentWillMount() {
    // Once the component mounts, make sure the tab matches the component
    this.props.matchTab();
  }

  // Returns the date and time plus a given number of milliseconds (ms) in datetime-local format ("YYYY-MM-DDTHH:MM")
  getDateTime = (ms) => {
    var dateTime = new Date((new Date()).getTime() + ms);
    return this.pad(dateTime.getFullYear(), 4)
      + "-" + this.pad((dateTime.getMonth() + 1), 2)
      + "-" + this.pad(dateTime.getDate(), 2)
      + "T" + this.pad(dateTime.getHours(), 2)
      + ":" + this.pad(dateTime.getMinutes(), 2)
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
   * When the search button is clicked, rides matching the user's parameters must be found
   */
  handleClickSearch = () => {
    this.setState({
      results: searchOfferedRides(this.state.startDate, this.state.endDate,
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

        {/* Grid for entry fields */}
        <div style={{ marginTop: '2em' }}>
          <Grid container spacing={40}>
            {/* Origin */}
            <Grid item>
              <TextField
                style={{ width: 226.23 }} // Same width as departure fields
                id="origin"
                label="Origin"
                type="search"
                value={this.state.origin}
                onChange={this.handleFormChange('origin')}
              />
            </Grid>
            {/* Destination */}
            <Grid item>
              <TextField // Destination (end)
                style={{ width: 226.23 }} // Same width as departure fields
                id="destination"
                label="Destination"
                type="search"
                value={this.state.destination}
                onChange={this.handleFormChange('destination')}
              />
            </Grid>
            {/* Start date */}
            <Grid item>
              <form noValidate>
                <TextField
                  id="startDate"
                  label="Earliest Possible Departure"
                  type="datetime-local"
                  defaultValue={this.getDateTime(0)} // Default time for the start date is today
                  value={this.state.startDate}
                  onChange={this.handleFormChange('startDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
            {/* End date */}
            <Grid item>
              <form noValidate>
                <TextField
                  id="startDate"
                  label="Latest Possible Departure"
                  type="datetime-local"
                  defaultValue={this.getDateTime(86400000)} // Default time for the end date is tomorrow
                  min={this.getDateTime(86400000)}
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

            {/* Display search results as a list of Rides */}
            {this.state.results.map((searchResult) => {
              return (
                <List dense={this.state.dense}>
                  <ListItem
                    button
                    disableGutters={this.state.noGutters}
                    divider={this.state.divider}
                    onClick={() => { this.addRequestDialogChild.handleClickOpen(searchResult); }}>
                    
                    {/* Driver profile picture */}
                    <Avatar src={searchResult.driverUsername.profilePicture} />
                    
                    {/* Ride date */}
                    <ListItemText
                      primary={searchResult.destination}
                      secondary={this.state.secondary ? searchResult.getDepartureDate() : null}
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

SearchPage.propTypes = {
  matchTab: PropTypes.func.isRequired,
};

export default SearchPage;
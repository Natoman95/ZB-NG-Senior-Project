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
import { getSearchResults } from '../services/ride-service';
import { getDate } from '../services/date-service';
import { getUser } from '../services/user-service';

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
      startDateTime: null,
      endDateTime: null,
      searchResults: [],
      searchAttempted: false,
      username: null
    };
  }

  /**
   * Gets the logged in User's username
   */
  async getUsername() {
    try {
      let userData = await getUser();
      console.log("sp-getUsername");
      this.setState({ username: userData.username });
    }
    catch (err) {
      throw err;
    }
  };

  componentWillMount() {
    // Once the component mounts, make sure the tab matches the component
    this.props.matchTab();
    this.getUsername();
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
   * When the search button is clicked, rides matching the user's parameters are displayed
   */
  handleClickSearch = async () => {
    let searchResultsData = await getSearchResults(this.state.startDateTime, this.state.endDateTime, this.state.origin, this.state.destination);
    console.log("sp-handleClickSearch-sRD");
    this.setState({ searchResults: searchResultsData });
    console.log("sp-handleClickSearch-sA");
    this.setState({ searchAttempted: true });
  }

  // Change state variables based on changes to input forms
  handleFormChange = (input) => {
    return event => {
      console.log("sp-handleFormChange");
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
            <Grid item xl={3} md={6} sm={12}>
              <TextField
                fullWidth
                id="originField"
                label="Origin"
                type="search"
                value={this.state.origin}
                onChange={this.handleFormChange('origin')}
              />
            </Grid>
            {/* Destination */}
            <Grid item xl={3} md={6} sm={12}>
              <TextField // Destination (end)
                fullWidth
                id="destinationField"
                label="Destination"
                type="search"
                value={this.state.destination}
                onChange={this.handleFormChange('destination')}
              />
            </Grid>
            {/* Start date */}
            <Grid item xl={3} md={6} sm={12}>
              <TextField
                fullWidth
                id="startDateField"
                label="Earliest Possible Departure"
                type="datetime-local"
                defaultValue={this.getDateTime(0)} // Default time for the start date is today
                value={this.state.startDate}
                onChange={this.handleFormChange('startDate')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* End date */}
            <Grid item xl={3} md={6} sm={12}>
              <TextField
                fullWidth
                id="endDateField"
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
        {(this.state.searchResults.length > 0) &&
          <div style={{ marginTop: '3em' }}>
            <h3>
              Search Results ({this.state.searchResults.length})
            </h3>
            
            {/* Display search results as a list of Rides */}
            {this.state.searchResults.map((searchResult) => {
              return (
                <List dense={this.state.dense}>
                  <ListItem
                    button
                    disableGutters={this.state.noGutters}
                    divider={this.state.divider}
                    onClick={() => { this.addRequestDialogChild.handleClickOpen(
                      this.state.username,
                      searchResult,
                      this.state.startDateTime,
                      this.state.endDateTime,
                      this.state.origin,
                      this.state.destination
                    ); }}>
                    
                    {/* Driver profile picture */}
                    <Avatar src={searchResult.driverUsername.profilePicture} />
                    
                    {/* Ride date */}
                    <ListItemText
                      primary={searchResult.destination}
                      secondary={this.state.secondary ? getDate(searchResult.departureDateTime) : null}
                    />
                  </ListItem>
                </List>
              );
            })}
          </div>
        }
        
        {/* Display message if search button has been clicked and no results were found */}
        {(this.state.searchAttempted && this.state.searchResults.length === 0) &&
          <div style={{ marginTop: '3em' }}>
            <h3>
              No rides found.
            </h3>
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
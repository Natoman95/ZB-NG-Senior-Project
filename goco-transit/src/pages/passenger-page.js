import React from 'react';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import RequestedDetailsDialog from '../components/dialog-boxes/requested-details-dialog';
import ConfirmedDetailsDialog from '../components/dialog-boxes/confirmed-details-dialog';
import { Icons } from '../icon-library';
import Loader from '../components/loader';

// Services
import { getUser } from '../services/user-service';
import { getConfirmedRides, getRideByID } from '../services/ride-service';
import { getDate, getTime } from '../services/date-service';
import { getRequests } from '../services/request-service';

/**
 * This page allows a user to manage anything having to do with their
 * role as a passenger. This means displaying a user's requested rides
 * and the rides where they are confirmed as a passenger.
 * It also allows a user to navigate to the search page to find
 * rides they might want to be a passenger on.
 */
class PassengerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      user: null,
      confirmedRides: null,
      requestedRides: null,
      loading: true
    };

    this.rideDictionary = [];
  }

  componentWillMount() {
    // Once the component mounts, make sure the tab matches the component
    this.props.matchTab();
    this.loadUserData();
  }

  // Return the index of the dictionary element containing the Ride
  searchRideDictionary= (rideID) => {
    for (let i = 0; i < this.rideDictionary.length; i++) {
      if (this.rideDictionary[i].value.rideId === rideID) {
        return i;
      }
    }
    return false;
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (<Loader />);
    }
    else {
      content = (
        <div>
          {/* List of confirmed rides generated from an array */}
          <h3>
            Confirmed Rides ({this.state.confirmedRides.length})
          </h3>
          <List dense={this.state.dense}>
            {this.state.confirmedRides.map((confirmedRide) => {
              return (
                <ListItem
                  button
                  onClick={() => { this.confirmedDetailsDialogChild.handleClickOpen(confirmedRide); }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >
                  {/* Route destination and date range */}
                  <ListItemText
                    primary={confirmedRide.destination}
                    secondary={this.state.secondary ? getDate(confirmedRide.departureDateTime) : null}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* List of requests generated from an array */}
          <h3 style={{ marginTop: '3em' }}>
            Requested Rides ({this.state.requestedRides.length})
          </h3>

          <List dense={this.state.dense}>
            {this.state.requestedRides.map((requestedRide) => {

              // Get the Request's associated Ride, if it exists
              let index = this.searchRideDictionary(requestedRide.rideId);
              let linkedRide = this.rideDictionary[index].value;

              return (
                <ListItem
                  button
                  onClick={() => { this.requestedDetailsDialogChild.handleClickOpen(requestedRide); }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >

                  {/* Route destination and date range */}
                  <ListItemText
                    primary={linkedRide.destination}
                    secondary={this.state.secondary ?
                      (
                        // No linked Ride
                        (linkedRide === false) ?
                          (
                            getDate(requestedRide.earliestDepartureDateTime) + " " + getTime(requestedRide.earliestDepartureDateTime)
                            + ' - '
                            + getDate(requestedRide.latestDepartureDateTime) + " " + getTime(requestedRide.latestDepartureDateTime)
                          // Has linked Ride
                          ) : 
                            getDate(linkedRide.departureDateTime) + " " + getTime(linkedRide.departureDateTime)
                      ) : null
                    }
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Add a request button */}
          <Grid container>
            <Grid item xs={12}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <Link to="/passenger/search">
                    <Button variant="fab" color="secondary" aria-label="add">
                      {Icons.searchIcon}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Dialog boxes */}
          <RequestedDetailsDialog ref={(requestedDetailsDialogInstance) => { this.requestedDetailsDialogChild = requestedDetailsDialogInstance; }} />
          <ConfirmedDetailsDialog ref={(confirmedDetailsDialogInstance) => { this.confirmedDetailsDialogChild = confirmedDetailsDialogInstance; }} />

        </div>
      );
    }

    return (<div>{content}</div>)
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    this.setState({ loading: true });
    try {
      let data = await getUser();
      this.setState({ user: data });

      // Set confirmedRides to empty array if promise is rejected
      let confirmedRidesData = await getConfirmedRides(this.state.user.username);
      this.setState({ confirmedRides: confirmedRidesData });

      // Set requestedRides to empty array if promise is rejected
      let requestsData = await getRequests(this.state.user.username);
      this.setState({ requestedRides: requestsData });

      // Link Requests to their linked Rides, if they exist
      let linkedRide;
      for (let i = 0; i < this.state.requestedRides.length; i++) {
        linkedRide = await getRideByID(this.state.requestedRides[i].rideId)
        if (linkedRide !== (null || undefined)) {
          // Has linked Ride
          this.rideDictionary.push({
            key: this.state.requestedRides[i].requestId,
            value: linkedRide
          });
        } else {
          // No linked Ride
          this.rideDictionary.push({
            key: this.state.requestedRides[i].requestId,
            value: false
          });
        }
      }
      
      this.setState({ loading: false });
    }
    catch (err) {
      throw err;
    }
  };
}

PassengerPage.propTypes = {
  matchTab: PropTypes.func.isRequired,
};

export default PassengerPage;
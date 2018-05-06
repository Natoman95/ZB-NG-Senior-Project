import React from 'react';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import PropTypes from 'prop-types';

// Components
import OfferDetailsDialog from '../components/dialog-boxes/offer-details-dialog';
import AddOfferDialog from '../components/dialog-boxes/add-offer-dialog';
import { Icons } from '../icon-library';
import Loader from '../components/loader';

// Services
import { getUser, getUserImage } from '../services/user-service';
import { getOfferedRides, getTotalConfirmedRequests, getTotalPendingRequests } from '../services/ride-service';
import { getDate } from '../services/date-service';

/**
 * This page allows a user to manage anything having to do with their
 * role as a driver. This means displaying information on rides the
 * user has offered and allowing the user to offer rides to other people
 * and update information about those rides, including their passengers
 */
class DriverPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      user: null,
      offeredRides: null,
      loading: false,
    };

    this.onOffersUpdated = this.onOffersUpdated.bind(this);
  }

  onOffersUpdated() {
    this.loadUserData();
    this.forceUpdate();
  }

  componentWillMount() {
    // Once the component mounts, make sure the tab matches the component
    this.props.matchTab();
    this.loadUserData();
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (<Loader />);
    }
    else {
      content = (
        <div>
          {/* List of offered rides generated from an array */}
          <h3>
            Offered Rides ({this.state.offeredRides.length})
          </h3>

          <List dense={this.state.dense}>
            {this.state.offeredRides.map((offeredRide) => {
              return (
                <ListItem
                  button
                  onClick={() => { this.offerDetailsDialogChild.handleClickOpen(offeredRide) }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >
                  {/* Number of users on the offered ride */}
                  <ListItemAvatar>
                    <IconButton disabled={true}>
                      {getTotalPendingRequests(offeredRide.requests) > 0 ?
                        <Badge 
                          badgeContent={getTotalConfirmedRequests(offeredRide.requests) + "/" + offeredRide.maxCapacity}
                          color="error"
                        >
                          {Icons.seatIcon}
                        </Badge>
                        :
                        <Badge 
                          badgeContent={getTotalConfirmedRequests(offeredRide.requests) + "/" + offeredRide.maxCapacity}
                          color="primary"
                        >
                          {Icons.seatIcon}
                        </Badge>
                      }
                    </IconButton>
                  </ListItemAvatar>
                  {/* Date of the ride */}
                  <ListItemText
                    primary={offeredRide.destination}
                    secondary={this.state.secondary ? getDate(offeredRide.departureDateTime) : null}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Add Offer Button */}
          <Grid container>
            <Grid item xs={12}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <Button variant="fab" color="secondary" aria-label="add"
                  onClick={() => { this.addOfferDialogChild.handleClickOpen(this.state.user.username) }}>
                    {Icons.addIcon}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Dialog boxes */}
          <OfferDetailsDialog ref={(offerDetailsDialogInstance) => { this.offerDetailsDialogChild = offerDetailsDialogInstance }} />
          <AddOfferDialog onPost={this.onOffersUpdated} ref={(addOfferDialogInstance) => { this.addOfferDialogChild = addOfferDialogInstance }} />

        </div>
      );
    }

    return (<div>{content}</div>);
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    this.setState({ loading: true });
    try {
      let userData = await getUser();
      this.setState({ user: userData });

      let rideData = await getOfferedRides(this.state.user.username);
      this.setState({ offeredRides: rideData });

      // Iterate through each offered ride and:
      // - Add up the total pending requests and pass this up to the main page
      // - Link the appropriate profile picture to each offered ride 
      let pendingCount = 0;
      for (let offeredRide in this.state.offeredRides) {
        pendingCount += getTotalPendingRequests(this.state.offeredRides[offeredRide].requests);
        this.state.offeredRides[offeredRide].driverPhoto = this.state.user.profilePhoto;
        // Iterate through each request of the offered ride and link the appropriate profile picture to each request
        for (let request in this.state.offeredRides[offeredRide].requests) {
          this.state.offeredRides[offeredRide].requests[request].requesterPhoto =
            await getUserImage(this.state.offeredRides[offeredRide].requests[request].requesterUsername);
        }
      }
      this.props.pendingRequests(pendingCount);

      this.setState({ loading: false });
    }
    catch (err) {
      throw err;
    }
  };
}

DriverPage.propTypes = {
  matchTab: PropTypes.func.isRequired,
  pendingRequests: PropTypes.func.isRequired,
};

export default DriverPage;
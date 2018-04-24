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
import { getUser } from '../services/user-service';
import { getOfferedRides } from '../services/ride-service';
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
                  onClick={() => { this.offerDetailsDialogChild.handleClickOpen(offeredRide); }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >
                  {/* Number of users on the offered ride */}
                  <ListItemAvatar>
                    <IconButton disabled={true}>
                      <Badge badgeContent={offeredRide.passengerUsernames.length + "/" + offeredRide.maxCapacity} color="primary">
                        {Icons.seatIcon}
                      </Badge>
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
                  onClick={() => { this.addOfferDialogChild.handleClickOpen(this.state.user.username); }}>
                    {Icons.addIcon}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Dialog boxes */}
          <OfferDetailsDialog ref={(offerDetailsDialogInstance) => { this.offerDetailsDialogChild = offerDetailsDialogInstance; }} />
          <AddOfferDialog onPost={this.onOffersUpdated} ref={(addOfferDialogInstance) => { this.addOfferDialogChild = addOfferDialogInstance; }} />

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

      this.setState({ loading: false });
    }
    catch (err) {
      throw err;
    }
  };
}

DriverPage.propTypes = {
  matchTab: PropTypes.func.isRequired,
};

export default DriverPage;
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
import { getDepartureDate, getDepartureTime } from '../services/ride-service';

// Contains ride requests made by the user
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
      requests: null,
      loading: true
    };
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
          {/* List of confirmed rides generated from an array */}
          <h3>
            Confirmed
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
                    secondary={this.state.secondary ? getDepartureDate(confirmedRide) : null}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* List of requests generated from an array */}
          <h3 style={{ marginTop: '3em' }}>
            Requested
          </h3>

          <List dense={this.state.dense}>
            {this.state.requests.map((requestedRide) => {
              return (
                <ListItem
                  button
                  onClick={() => { this.requestedDetailsDialogChild.handleClickOpen(requestedRide); }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >
                  {/* Route destination and date range */}
                  <ListItemText
                    primary={requestedRide.destination}
                    secondary={this.state.secondary ? (requestedRide.earliestDepartureDateTime + ' - ' + requestedRide.latestDepartureDateTime) : null}
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
      this.setState({
        user: data,
        requests: data.requests,
        confirmedRides: data.confirmedRides,
        loading: false,
      });
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
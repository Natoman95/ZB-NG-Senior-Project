import React from 'react';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

// Components
import RequestSearchPage from './request-search-page';
import DeleteRequestDialog from '../components/delete-request-dialog';
import DeleteRideDialog from '../components/delete-ride-dialog';
import {Icons} from '../icon-library';

// Services
import { getUser } from '../services/user-service';

// Contains ride requests made by the user
class RequestsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      user: null,
      confirmedRides: null,
      requests: null
    };

    this.state.user = getUser();
    this.state.requests = this.state.user.requests;
    this.state.confirmedRides = this.state.user.confirmedRides;
  }

  render() {
    return (
      <div>
        {/* List of confirmed rides generated from an array */}
        <h3>
          Rides
        </h3>
        <List dense={this.state.dense}>
          {this.state.confirmedRides.map((confirmedRide) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                <ListItemAvatar>
                  {/* Depending on whether the user has been accepted as a passenger
                  A different avatar will be displayed */}
                  <Avatar>
                    {Icons.confirmedRideIcon}
                  </Avatar>
                </ListItemAvatar>
                {/* Route destination and date range */}
                <ListItemText
                  primary={confirmedRide.destination}
                  secondary={this.state.secondary ? confirmedRide.date : null}
                />
                {/* Delete confirmed ride button */}
                <ListItemSecondaryAction>
                  <IconButton onClick={() => { this.deleteRideDialogChild.handleClickOpen(); }} aria-label="Delete">
                    {Icons.deleteIcon}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* List of requests generated from an array */}
        <h3 style={{ marginTop: '3em' }}>
          Requests
        </h3>

        <List dense={this.state.dense}>
          {this.state.requests.map((request) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                <ListItemAvatar>
                  {/* Depending on whether the user has been accepted as a passenger
                  A different avatar will be displayed */}
                  <Avatar>
                    {Icons.pendingRideIcon}
                  </Avatar>
                </ListItemAvatar>
                {/* Route destination and date range */}
                <ListItemText
                  primary={request.destination}
                  secondary={this.state.secondary ? (request.dateMin + '-' + request.dateMax) : null}
                />
                {/* Delete request button */}
                <ListItemSecondaryAction>
                  <IconButton onClick={() => { this.deleteRequestDialogChild.handleClickOpen(); }} aria-label="Delete">
                    {Icons.deleteIcon}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* Add a request button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Link to="/requests/search">
                  <Button variant="fab" color="secondary" aria-label="add">
                    {Icons.searchIcon}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Dialog boxes */}
        <DeleteRequestDialog ref={(deleteRequestDialogInstance) => { this.deleteRequestDialogChild = deleteRequestDialogInstance; }} />
        <DeleteRideDialog ref={(deleteRideDialogInstance) => { this.deleteRideDialogChild = deleteRideDialogInstance; }} />
        
      </div>
    );
  }
}

export default RequestsPage;
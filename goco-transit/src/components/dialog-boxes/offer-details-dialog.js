import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import { Typography } from 'material-ui';

// Components
import { Icons } from '../../icon-library';
import ConfirmationDialog from './confirmation-dialog';
import PassengerListDialog from './passenger-list-dialog';

// Models
import RideModel from '../../models/ride-model';

// Services
import { getDate, getTime } from '../../services/date-service';
import { getTotalConfirmedRequests, getTotalPendingRequests } from '../../services/ride-service';

/* This dialog opens on the driver page of the app
   It displays more information about a ride which a user
   has offered to other users */
class OfferDetailsDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      ride: new RideModel() // Prevents null pointer exception
    };
  }

  // Open the add offer dialog
  handleClickOpen = (offeredRide) => {
    this.setState({ ride: offeredRide });
    this.setState({ display: true });
  };

  // Close the add offer dialog
  handleClose = () => {
    this.setState({ display: false });
  };

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ride Offer Details"}</DialogTitle>
        
        {this.state.display && // Don't attempt to get undefined data
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              {/* Ride offer details */}
              <List dense={this.state.dense} style={{ padding: '0px' }} >

                {/* Origin */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.originIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText primary={this.state.ride.origin} />
                  </div>
                </ListItem>

                {/* Destination */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.destinationIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText primary={this.state.ride.destination} />
                  </div>
                </ListItem>

                {/* Date */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.dateIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText primary={getDate(this.state.ride.departureDateTime)} />
                  </div>
                </ListItem>

                {/* Time */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.timeIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText primary={getTime(this.state.ride.departureDateTime)} />
                  </div>
                </ListItem>

                {/* Notes */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Badge badgeContent={
                      <IconButton
                        disabled
                        style={{
                          backgroundColor: '#BDBDBD',
                          color: '#FFFFFF',
                          width: '1.25em',
                          height: '1.25em'
                      }}>
                        {Icons.seatIcon}
                      </IconButton>}>
                      <Avatar>
                        {Icons.noteIcon}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText
                      primary={(this.state.ride.driverNote === null || undefined ?
                        <Typography style={{ fontStyle: 'italic', fontSize: '1em', color: '#757575'}}> Not provided </Typography>
                        : this.state.ride.driverNote)}
                    />
                  </div>
                </ListItem>
              </List>

            </DialogContentText>

            <hr/>

            {/* Action buttons */}
            <Grid container spacing={40} justify="center">
              <Grid item>
                <IconButton onClick={ () => { this.passengerDialogChild.handleClickOpen(this.state.ride.requests) }}>
                  {this.state.display && // Don't attempt to get undefined length
                    getTotalPendingRequests(this.state.ride.requests) > 0 ?
                      <Badge 
                        badgeContent={getTotalConfirmedRequests(this.state.ride.requests) + "/" + this.state.ride.maxCapacity}
                        color="error"
                      >
                        {Icons.seatIcon}
                      </Badge>
                      :
                      <Badge 
                        badgeContent={getTotalConfirmedRequests(this.state.ride.requests) + "/" + this.state.ride.maxCapacity}
                        color="primary"
                      >
                        {Icons.seatIcon}
                      </Badge>
                  }
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={this.handleClose}>
                  {Icons.exitIcon}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={ () => { this.confirmationDialogChild.handleClickOpen(
                    "Delete this ride offer?", "Your passengers will be notified.") }}
                >
                  {Icons.deleteIcon}
                </IconButton>
              </Grid>
            </Grid>

          </DialogContent>
        }

        {/* Dialog boxes */}
        <ConfirmationDialog ref={(confirmationDialogInstance) => { this.confirmationDialogChild = confirmationDialogInstance }} />
        <PassengerListDialog ref={(passengerDialogInstance) => { this.passengerDialogChild = passengerDialogInstance }} />

      </Dialog>
    );
  }
}

export default OfferDetailsDialog;
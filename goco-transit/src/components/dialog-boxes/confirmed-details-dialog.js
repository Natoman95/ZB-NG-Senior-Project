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
import PropTypes from 'prop-types';

// Components
import { Icons } from '../../icon-library';
import ConfirmationDialog from './confirmation-dialog';

// Models
import RideModel from '../../models/ride-model';

// Services
import { getDate, getTime } from '../../services/date-service';
import { getUserFullName } from '../../services/user-service';

/* This dialog opens on the passenger page of the app
   It displays more information about a ride on which a user
   has been accepted as passenger */
class ConfirmedDetailsDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      confirmedRide: new RideModel(), // Prevents null pointer exception
      requestID: null,
    };
  }

  // Open the add offer dialog
  handleClickOpen = (confirmedRide, username) => {
    // Find the request in the ride that belongs to the current user
    for (let i = 0; i < confirmedRide.requests.length; i++) {
      let request = confirmedRide.requests[i];
      if (request.requesterUsername.toUpperCase() === username.toUpperCase()) {
        this.setState({ requestID: request.requestID });
      }
    }
    this.setState({ confirmedRide: confirmedRide, display: true });
  };

  // Close the add offer dialog
  handleClose = () => {
    this.setState({ display: false });
  };

  handleDelete = () => {
    this.props.onDelete(this.state.requestID);
    this.setState({ display: false });
  }

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      
        <DialogTitle id="alert-dialog-title">{"Confirmed Ride Details"}</DialogTitle>
        
        {this.state.display && // Don't attempt to get undefined data
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              {/* Confirmed ride details */}
              <List dense={this.state.dense} style={{ padding: '0px' }} >

                {/* Driver name */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.avatarIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText primary={getUserFullName(this.state.confirmedRide.driverUsername)} />
                  </div>
                </ListItem>
                
                {/* Origin */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.originIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText primary={this.state.confirmedRide.origin} />
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
                    <ListItemText primary={this.state.confirmedRide.destination} />
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
                    <ListItemText primary={getDate(this.state.confirmedRide.departureDateTime) + " at " + getTime(this.state.confirmedRide.departureDateTime)} />
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
                        {Icons.driverIcon}
                      </IconButton>}>
                      <Avatar>                      
                        {Icons.noteIcon}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <div style={{ paddingLeft: '1.5em' }}>
                    <ListItemText
                      primary={(this.state.confirmedRide.driverNote === null || undefined ?
                        <Typography style={{ fontStyle: 'italic', fontSize: '1em', color: '#757575'}}> Not provided </Typography>
                        : this.state.confirmedRide.driverNote)}
                    />
                  </div>
                </ListItem>
              </List>
            </DialogContentText>

            <hr/>

            {/* Action buttons */}
            <Grid container spacing={40} justify="center">
              <Grid item>
                <IconButton onClick={this.handleClose}>
                  {Icons.exitIcon}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => {
                  this.confirmationDialogChild.handleClickOpen(
                    "Cancel this reservation?", "Your driver will be notified.");
                }}
                >
                  {Icons.deleteIcon}
                </IconButton>
              </Grid>
            </Grid>

          </DialogContent>
        }
        
        {/* Dialog boxes */}
        <ConfirmationDialog
          onConfirm={this.handleDelete}
          ref={(confirmationDialogInstance) => { this.confirmationDialogChild = confirmationDialogInstance }} />

      </Dialog>
    );
  }
}

ConfirmedDetailsDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default ConfirmedDetailsDialog;
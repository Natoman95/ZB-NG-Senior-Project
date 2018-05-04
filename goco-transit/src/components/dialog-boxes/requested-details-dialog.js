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

// Models
import RideModel from '../../models/ride-model';

// Services
import { getDate, getTime } from '../../services/date-service';

/* This dialog opens on the passenger page of the app
   It displays more information about a ride which a user
   has requested but is not a passenger on yet */
class RequestedDetailsDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      requestedRide: new RideModel() // Prevents null pointer exception
    };
  }

  // Open the add offer dialog
  handleClickOpen = (requestedRide) => {
    this.setState({ requestedRide: requestedRide });
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
        <DialogTitle id="alert-dialog-title">{"Ride Request Details"}</DialogTitle>
        
        {this.state.display && // Don't attempt to get undefined data
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              {/* Requested ride details */}
              <List dense={this.state.dense} style={{ padding: '0px' }} >

                {/* Origin */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.originIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.state.requestedRide.origin} />
                </ListItem>

                {/* Destination */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.destinationIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={this.state.requestedRide.destination} />
                </ListItem>

                {/* Time */}
                <ListItem disableGutters={this.state.noGutters} divider={false}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.timeIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={getDate(this.state.requestedRide.departureDateTime) + " " + getTime(this.state.requestedRide.departureDateTime)} />
                </ListItem>

                {/* Notes */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Badge badgeContent={Icons.driverIcon} style={{backgroundColor: '#BDBDBD'}}>
                      <Avatar>
                        {Icons.noteIcon}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={(this.state.requestedRide.driverNote === null || undefined ?
                      <Typography style={{ fontStyle: 'italic', fontSize: '1em', color: '#757575'}}> Not provided </Typography>
                      : this.state.requestedRide.driverNote)}
                  />
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
                    "Delete this ride request?", "You will be removed from the waiting list.");
                }}
                >
                  {Icons.deleteIcon}
                </IconButton>
              </Grid>
            </Grid>

          </DialogContent>
        }

        {/* Dialog boxes */}
        <ConfirmationDialog ref={(confirmationDialogInstance) => { this.confirmationDialogChild = confirmationDialogInstance }} />

      </Dialog>
    );
  }
}

export default RequestedDetailsDialog;
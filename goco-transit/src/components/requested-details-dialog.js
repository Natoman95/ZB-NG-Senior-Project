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

// Components
import { Icons } from '../icon-library';
import ConfirmationDialog from '../components/confirmation-dialog';
import RequestModel from '../models/request-model';

/* Add an offer dialog box */
class RequestedDetailsDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      request: new RequestModel() // Prevents null pointer exception
    };
  }

  // Open the add offer dialog
  handleClickOpen = (requestedRide) => {
    this.setState({ request: requestedRide });
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
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ride Request Details"}</DialogTitle>
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
                <ListItemText primary={this.state.request.origin} />
              </ListItem>

              {/* Destination */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.destinationIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.request.destination} />
              </ListItem>

              {/* Start of availability range */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    TBD
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.request.earliestDeparture} />
              </ListItem>

              {/* End of availability range */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    TBD
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.request.latestDeparture} />
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.noteIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.request.passengerNote} />
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
              <IconButton onClick={() => { this.confirmationDialogChild.handleClickOpen(
                "Delete this ride request?", "You will be removed from the waiting list."); }}
              >
                {Icons.deleteIcon}
              </IconButton>
            </Grid>
          </Grid>

        </DialogContent>

        {/* Dialog boxes */}
        <ConfirmationDialog ref={(confirmationDialogInstance) => { this.confirmationDialogChild = confirmationDialogInstance; }} />

      </Dialog>
      
    );
  
  }
}

export default RequestedDetailsDialog;
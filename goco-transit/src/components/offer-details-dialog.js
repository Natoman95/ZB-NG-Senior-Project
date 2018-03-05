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

// Components
import { Icons } from '../icon-library';
import DeleteOfferDialog from '../components/delete-offer-dialog';

/* Add an offer dialog box */
class OfferDetailsDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
    };
  }

  // Open the add offer dialog
  handleClickOpen = () => {
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
                <ListItemText primary="(Origin)" />
              </ListItem>

              {/* Destination */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.destinationIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Destination)" />
              </ListItem>

              {/* Date */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.dateIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Date)" />
              </ListItem>

              {/* Time */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.timeIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Time)" />
              </ListItem>

              {/* Number of seats */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.seatIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Destination)" />
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.noteIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Note to passengers)" />
              </ListItem>
            </List>

          </DialogContentText>

          <hr/>

          {/* Action buttons */}
          <Grid container spacing={40} justify="center">
            <Grid item>
              <IconButton>
                <Badge color="primary">
                  {/* ^TODO (Fix import): badgeContent={offeredRide.passengers.length + "/" + offeredRide.maxCapacity} */}
                  {Icons.personIcon}
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={this.handleClose}>
                {Icons.exitIcon}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => { this.deleteOfferDialogChild.handleClickOpen(); }} >
                {Icons.deleteIcon}
              </IconButton>
            </Grid>
          </Grid>

        </DialogContent>

        {/* Dialog boxes */}
        <DeleteOfferDialog ref={(deleteOfferDialogInstance) => { this.deleteOfferDialogChild = deleteOfferDialogInstance; }} />

      </Dialog>
      
    );
  
  }
}

export default OfferDetailsDialog;
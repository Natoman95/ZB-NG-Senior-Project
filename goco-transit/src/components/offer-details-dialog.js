import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

// Components
import { Icons } from '../icon-library';

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
      seats: 1,
    };
  }

  constants = {
    SEAT_MAX: 9, // Maximum number of available seats allowed in a given offer
  };

  // Open the add offer dialog
  handleClickOpen = () => {
    this.setState({ display: true });
  };

  // Close the add offer dialog
  handleClose = () => {
    this.setState({ display: false });
  };

  // Limits seat maximum to pre-defined constant
  handleSeatPlus = () => {
    if (this.state.seats < this.constants.SEAT_MAX) { this.setState({ seats: this.state.seats + 1 }) }
  }

  // Limits seat minimum to 1
  handleSeatMinus = () => {
    if (this.state.seats > 1) { this.setState({ seats: this.state.seats - 1 }) }
  }

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add a ride offer:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {/* Ride info input */}
            <List dense={this.state.dense}>

              {/* Origin */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.originIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Origin)"
                />
              </ListItem>

              {/* Destination */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.destinationIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Destination)"
                />
              </ListItem>

              {/* Date */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.dateIcon}
                  </Avatar>
                </ListItemAvatar>
                <TextField required type="date" />
              </ListItem>

              {/* Time */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.timeIcon}
                  </Avatar>
                </ListItemAvatar>
                <TextField required type="time" />
              </ListItem>

              {/* Number of seats */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.seatIcon}
                  </Avatar>
                </ListItemAvatar>
                <IconButton onClick={this.handleSeatMinus} >
                  {Icons.leftArrowIcon}
                </IconButton>
                {this.state.seats}
                <IconButton onClick={this.handleSeatPlus} >
                  {Icons.rightArrowIcon}
                </IconButton>
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.noteIcon}
                  </Avatar>
                </ListItemAvatar>
                <div style={{ paddingLeft: "1em" }} >
                  <TextField label="Note to passengers" multiline={true} style={{ paddingLeft: "1em" }} />
                </div>
              </ListItem>
            </List>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Back
          </Button>
          <Button onClick={this.handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default OfferDetailsDialog;
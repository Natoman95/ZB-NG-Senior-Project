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
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import LeftArrowIcon from 'material-ui-icons/chevronLeft';
import RightArrowIcon from 'material-ui-icons/chevronRight';
import PlaceIcon from 'material-ui-icons/place';
import ClockIcon from 'material-ui-icons/watchLater';
import CalendarIcon from 'material-ui-icons/dateRange';
import SeatIcon from 'material-ui-icons/eventSeat';
import NoteIcon from 'material-ui-icons/assignment';
import TextField from 'material-ui/TextField';

{/* Add an offer dialog box */}

class AddOfferDialog extends React.Component {
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
    SEAT_MAX: 10, // Maximum number of available seats allowed in a given offer
  };

  // Open the delete offer dialog
  handleClickOpen = () => {
    this.setState({ display: true });
  };

  // Close the delete offer dialog
  handleClose = () => {
    this.setState({ display: false });
  };

  // Limits seat maximum to pre-defined constant
  handleSeatPlus = () => {
    if (this.state.seats < this.SEAT_MAX) { this.setState({ seats: this.state.seats + 1 }) }
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

              {/* Location */}
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    <PlaceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Location)"
                />
              </ListItem>

              {/* Date */}
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField required type="date" style={{ paddingLeft: "1em" }} />
              </ListItem>

              {/* Time */}
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    <ClockIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField required type="time" style={{ paddingLeft: "1em" }} />
              </ListItem>

              {/* Number of seats */}
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    <SeatIcon />
                  </Avatar>
                </ListItemAvatar>
                <IconButton onClick={this.handleSeatMinus} >
                  <LeftArrowIcon />
                </IconButton>
                {this.state.seats}
                <IconButton onClick={this.handleSeatPlus} >
                  <RightArrowIcon />
                </IconButton>
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    <NoteIcon />
                  </Avatar>
                </ListItemAvatar>
                <div style={{ paddingLeft: "1em" }} >
                  <TextField label="Note to passengers" multiline={true} />
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

export default AddOfferDialog;
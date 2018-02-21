import React from 'react';
import DoneIcon from 'material-ui-icons/Done';
import DeleteIcon from 'material-ui-icons/Delete';
import QuestionIcon from 'material-ui-icons/Help';
import PersonIcon from 'material-ui-icons/Person';
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
import AddIcon from 'material-ui-icons/Add';
import LeftArrowIcon from 'material-ui-icons/chevronLeft';
import RightArrowIcon from 'material-ui-icons/chevronRight';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PlaceIcon from 'material-ui-icons/place';
import ClockIcon from 'material-ui-icons/watchLater';
import CalendarIcon from 'material-ui-icons/dateRange';
import SeatIcon from 'material-ui-icons/eventSeat';
import NoteIcon from 'material-ui-icons/assignment';
import TextField from 'material-ui/TextField';

// Services
import { getUser } from '../services/user-service';

// Contains rides offered to other users
class OffersPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      displayAddOfferDialog: false,
      displayDeleteOfferDialog: false,
      seats: 1,
      offers: null
    };

    this.state.offers = getUser().offers;
  }

  constants = {
    seatMax: 10, // Maximum number of available seats allowed in a given offer
  };

  handleAddClickOpen = () => {
    this.setState({ displayAddOfferDialog: true });
  };

  handleAddClose = () => {
    this.setState({ displayAddOfferDialog: false });
  };

  handleDeleteClickOpen = () => {
    this.setState({ displayDeleteOfferDialog: true });
  };

  handleDeleteClose = () => {
    this.setState({ displayDeleteOfferDialog: false });
  };

  // Limits seat maximum to pre-defined constant
  handleSeatPlus = () => {
    if (this.state.seats < 10) { this.setState({ seats: this.state.seats + 1 }) }
  }

  // Limits seat minimum to 1
  handleSeatMinus = () => {
    if (this.state.seats > 1) { this.setState({ seats: this.state.seats - 1 }) }
  }

  render() {
    return (
      <div>
        {/* List of offers - items display the number of users who have accepted the ride 
         Generated from an array */}
        <List dense={this.state.dense}>
          {this.state.offers.map((offer) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                {/* Number of users on the offered ride */}
                <ListItemAvatar>
                  <IconButton disabled={true}>
                    <Badge badgeContent={offer.passengers.length} color="primary">
                      <PersonIcon />
                    </Badge>
                  </IconButton>
                </ListItemAvatar>
                {/* Date of the ride */}
                <ListItemText
                  primary={offer.destination}
                  secondary={this.state.secondary ? offer.date : null}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.handleDeleteClickOpen} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* Add Offer Button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Button variant="fab" color="secondary" aria-label="add" onClick={this.handleAddClickOpen}>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Delete an offer dialog box */}
        <Dialog
          open={this.state.displayDeleteOfferDialog}
          onClose={this.handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this ride offer?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              (Ride data will go here)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose}>
              Cancel
            </Button>
            <Button onClick={this.handleDeleteClose}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add ride offer dialog box */}
        <Dialog
          open={this.state.displayAddOfferDialog}
          onClose={this.handleAddClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add a ride offer"}</DialogTitle>
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
            <Button onClick={this.handleAddClose}>
              Back
            </Button>
            <Button onClick={this.handleAddClose}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default OffersPage;
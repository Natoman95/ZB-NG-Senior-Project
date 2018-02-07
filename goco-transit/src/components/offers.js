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
import TextField from 'material-ui/TextField';

// Contains rides offered to other users
class Offers extends React.Component {
  state = {
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
    addOpen: false,
    deleteOpen: false,
  };

  handleAddClickOpen = () => {
    this.setState({ addOpen: true });
  };

  handleAddClose = () => {
    this.setState({ addOpen: false });
  };

  handleDeleteClickOpen = () => {
    this.setState({ deleteOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ deleteOpen: false });
  };

  render() {
    return (
      <div>
        {/* List of offers - items display the number of users who have accepted the ride */}
        <List dense={this.state.dense}>
          <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
            <ListItemAvatar>
              <IconButton disabled={true}>
                <Badge badgeContent={4} color="primary">
                  <PersonIcon />
                </Badge>
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary="Scranton"
              secondary={this.state.secondary ? '2/3/18' : null}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleDeleteClickOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
            <ListItemAvatar>
              <IconButton disabled={true}>
                <Badge badgeContent={2} color="primary">
                  <PersonIcon />
                </Badge>
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary="Boston"
              secondary={this.state.secondary ? '4/6/18' : null}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleDeleteClickOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        {/* Add Offer Button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Button fab color="secondary" aria-label="add" onClick={this.handleAddClickOpen}>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Delete an offer dialog box */}
        <Dialog
          open={this.state.deleteOpen}
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
              Back
            </Button>
            <Button onClick={this.handleDeleteClose}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add ride offer dialog box */}
        <Dialog
          open={this.state.addOpen}
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
                  <TextField type="date" style={{ paddingLeft: "1em" }} />
                </ListItem>

                {/* Time */}
                <ListItem disableGutters={true} divider={false}>
                  <ListItemAvatar>
                    <Avatar>
                      <ClockIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField type="time" style={{ paddingLeft: "1em" }} />
                </ListItem>

                {/* Number of seats */}
                <ListItem disableGutters={true} divider={false}>
                  <ListItemAvatar>
                    <Avatar>
                      <SeatIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField type="number" name="Seats available" min="1" style={{ paddingLeft: "1em" }} />
                </ListItem>

                {/* Notes */}
                <ListItem disableGutters={true} divider={false}>
                  <TextField label="Note to passengers" multiline={true} />
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

export default Offers;
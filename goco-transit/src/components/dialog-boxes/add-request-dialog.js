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
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import { Typography } from 'material-ui';

// Components
import { Icons } from '../../icon-library';

// Models
import RideModel from '../../models/ride-model';
import RequestModel from '../../models/request-model';

// Services
import { getDate, getTime } from '../../services/date-service';
import { addRequest } from "../../services/request-service";

/* This dialog opens on the search page of the app
   It allows the user to request a ride that might take
   them where they want to go */
class AddRequestDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      username: null,

      // From the search result
      ride: new RideModel(), // Prevents null pointer exception

      // From the dialog input
      requesterNoteValue: null
    };
  }

  // Open the add request dialog
  handleClickOpen = (username, searchResult) => {
    this.setState({
      username: username,
      ride: searchResult,
      requesterNoteValue: null
    });
    this.setState({display: true})
  };

  // Close the add request dialog
  handleClose = (confirmSelected) => {
    if (confirmSelected) {
      // Request created from search result
      addRequest(
        new RequestModel(
          "",
          this.state.username.toLowerCase(),
          this.state.ride.rideID,
          this.state.requesterNoteValue,
          0
        )
      )
    }
    this.setState({ display: false });
  };

  // Set state variables
  handleFormChange(input) {
    return event => {
      this.setState({ [input]: event.target.value });
    };
  }

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add this ride request?"}</DialogTitle>

          {this.state.display && // Don't attempt to get undefined data
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            
              {/* Ride info */}
              <List dense={this.state.dense} style={{ padding: '0px' }} >

                {/* Origin */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.originIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={this.state.ride.origin}
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
                    primary={this.state.ride.destination}
                  />
                </ListItem>

                {/* Date */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.dateIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={getDate(this.state.ride.departureDateTime)}
                  />
                </ListItem>

                {/* Time */}
                <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                  <ListItemAvatar>
                    <Avatar>
                      {Icons.timeIcon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={getTime(this.state.ride.departureDateTime)}
                  />
                </ListItem>

                {/* Note to passengers */}
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
                  <ListItemText
                    primary={(this.state.ride.driverNote === null || undefined ?
                      <Typography style={{ fontStyle: 'italic', fontSize: '1em', color: '#757575'}}> Not provided </Typography>
                      : this.state.ride.driverNote)}
                  />
                </ListItem>

                {/* Note to driver */}
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
                  <div style={{ paddingLeft: "1em" }} >
                    <TextField
                      id="requesterNoteInput"
                      label="Note to driver"
                      value={this.state.requesterNoteValue}
                      onChange={this.handleFormChange("requesterNoteValue")}
                      multiline
                    />
                  </div>
                </ListItem>
              </List>

            </DialogContentText>
          
            <hr/>

            {/* Action buttons */}
            <Grid container spacing={40} justify="center">
              <Grid item>
                <IconButton onClick={() => this.handleClose(false)}>
                  {Icons.exitIcon}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => this.handleClose(true)}>
                  {Icons.confirmIcon}
                </IconButton>
              </Grid>
            </Grid>

          </DialogContent>
        }

      </Dialog>
    );
  }
}

export default AddRequestDialog;
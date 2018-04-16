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

// Components
import { Icons } from '../../icon-library';

// Models
import RideModel from '../../models/ride-model';

// Services
import { getDate, getTime } from '../../services/date-service';

/* Add a request dialog box */
class AddRequestDialog extends React.Component {
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

  // Open the add request dialog
  handleClickOpen = (searchResult) => {
    this.setState({ ride: searchResult });
    this.setState({ display: true });
  };

  // Close the add request dialog
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
        <DialogTitle id="alert-dialog-title">{"Add this ride request?"}</DialogTitle>
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
                {console.log("add-request:99")}
                {console.log(this.state.ride.departureDateTime)}
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

              {/* Notes */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.noteIcon}
                  </Avatar>
                </ListItemAvatar>
                <div style={{ paddingLeft: "1em" }} >
                  <TextField label="Note to driver" multiline={true} />
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
            <IconButton onClick={this.handleClose}>
              {Icons.confirmIcon}
            </IconButton>
          </Grid>
        </Grid>

        </DialogContent>

      </Dialog>
    );
  }
}

export default AddRequestDialog;
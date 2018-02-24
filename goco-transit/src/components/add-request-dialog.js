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
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

// Components
import { Icons } from '../icon-library';

{/* Add a request dialog box */ }

class AddRequestDialog extends React.Component {
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

  // Open the add request dialog
  handleClickOpen = () => {
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add this ride request?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {/* Ride info */}
            <List dense={this.state.dense}>

              {/* Origin */}
              <ListItem disableGutters={true} divider={false}>
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
              <ListItem disableGutters={true} divider={false}>
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
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.dateIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Date)"
                />
              </ListItem>

              {/* Time */}
              <ListItem disableGutters={true} divider={false}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.timeIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Time)"
                />
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={true} divider={false}>
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

export default AddRequestDialog;
import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

/* Delete a ride dialog box */
class DeleteRideDialog extends React.Component {
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

  // Open the delete ride dialog
  handleClickOpen = () => {
    this.setState({ display: true });
  };

  // Close the delete ride dialog
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
        <DialogTitle id="alert-dialog-title">{"Remove yourself from this ride?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            (Ride data will go here)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Cancel
          </Button>
          <Button onClick={this.handleClose}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteRideDialog;
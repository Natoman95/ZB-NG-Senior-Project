import React from 'react';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

{/* Delete a request dialog box */}

class DeleteRequestDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      displayDeleteRequestDialog: false,
    };
  }

  // Open the delete request dialog
  handleClickOpen = () => {
    this.setState({ displayDeleteRequestDialog: true });
  };

  // Close the delete request dialog
  handleClose = () => {
    this.setState({ displayDeleteRequestDialog: false });
  };

  render() {
    return (
      <Dialog>
        <DialogTitle id="alert-dialog-title">{"Delete this ride request?"}</DialogTitle>
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

export default DeleteRequestDialog;
import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

/* Delete an offer dialog box */
class DeleteOfferDialog extends React.Component {
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

  // Open the delete offer dialog
  handleClickOpen = () => {
    this.setState({ display: true });
  };

  // Close the delete offer dialog
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
        <DialogTitle id="alert-dialog-title">{"Delete this ride offer?"}</DialogTitle>
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

export default DeleteOfferDialog;
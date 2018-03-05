import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';

// Components
import { Icons } from '../icon-library';

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
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this ride offer?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ paddingBottom: '8px' }}>
              Your passengers will be notified.
            </div>
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
              <IconButton onClick={this.handleClose} >
                {Icons.confirmedRideIcon}
              </IconButton>
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog>
    );
  }
}

export default DeleteOfferDialog;
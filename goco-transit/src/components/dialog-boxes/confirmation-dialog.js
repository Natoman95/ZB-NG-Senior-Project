import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';

// Components
import { Icons } from '../../icon-library';

/* Confirmation dialog box */
class ConfirmationDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      title: null,
      subtitle: null,
      display: false,
    };
  }

  // Open the confirmation dialog and pass in text parameters
  handleClickOpen = (t, st) => {
    this.setState({ title: t });
    this.setState({ subtitle: st });
    this.setState({ display: true });
  };

  // Close the confirmation dialog
  handleClose = (confirmed) => {
    this.setState({ display: false });
    return confirmed;
  };

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose(false)}
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ paddingBottom: '8px' }}>
              {this.state.subtitle}
            </div>
          </DialogContentText>

          <hr/>

          {/* Action buttons */}
          <Grid container spacing={40} justify="center">
            <Grid item>
              <IconButton onClick={this.handleClose(false)}>
                {Icons.exitIcon}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={this.handleClose(true)} >
                {Icons.confirmIcon}
              </IconButton>
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog>
    );
  }
}

export default ConfirmationDialog;
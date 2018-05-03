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

/* This is a generic dialog used to confirm a user's actions */
class InformationDialog extends React.Component {
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

  // Open the information dialog and pass in text parameters
  handleClickOpen = (t, st) => {
    this.setState({ title: t });
    this.setState({ subtitle: st });
    this.setState({ display: true });
  };

  // Close the information dialog
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
              <IconButton onClick={this.handleClose}>
                {Icons.exitIcon}
              </IconButton>
            </Grid>
          </Grid>

        </DialogContent>
      </Dialog>
    );
  }
}

export default InformationDialog;
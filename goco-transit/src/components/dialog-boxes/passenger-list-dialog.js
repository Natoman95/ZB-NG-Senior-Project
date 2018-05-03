import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

// Components
import { Icons } from '../../icon-library';

/* This dialog opens on the driver page of the app
   It displays more information about a ride which a user
   has offered to other users */
class PassengerListDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      passengerUsernames: [],
      requestIDs: []
    };
  }

  // Open the add offer dialog
  handleClickOpen = (confirmed, requested) => {
    this.setState({
      passengerUsernames: confirmed,
      requestIDs: requested
     });
    this.setState({ display: true });
  };

  // Close the add offer dialog
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
        <DialogTitle id="alert-dialog-title">{"Passengers"}</DialogTitle>
        
        {this.state.display && // Don't attempt to get undefined data
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              
              {/* generate lists then map them into list items (use avatars and secondary actions)*/}
              {/* secondary list item text: passenger note? */}
              {/* or expand list item with confirm/decline option? */}

              <h4 style={{ marginTop: '0em' }}>
                Confirmed ({this.state.passengerUsernames.length})
              </h4>

              <hr/>
              
              <h4>
                Requested ({this.state.requestIDs.length})
              </h4>

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
        }
      </Dialog>
    );
  }
}

export default PassengerListDialog;
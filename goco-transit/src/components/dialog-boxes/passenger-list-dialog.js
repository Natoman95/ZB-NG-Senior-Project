import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemText,
  ListItemAvatar
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

// Components
import { Icons } from '../../icon-library';

// Services
import { getRequestByID } from '../../services/request-service';
import { getUserImage, getUserFullName } from '../../services/user-service';

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
      confirmedRequests: [],
      pendingRequests: [],
      confirmedListItemExpansion: [],
      pendingListItemExpansion: []
    };
  }

  // Open the add offer dialog
  handleClickOpen = async (requestIDs) => {
    // Sort Requests by confirmation status
    let request;
    for (let requestID in requestIDs) {
      request = await getRequestByID(requestIDs[requestID]);
      if (request.isConfirmed) {
        this.state.confirmedRequests.push({
          request: request,
          profilePic: 'data:image/png;base64,' + (await getUserImage(request.requesterUsername)).def,
          index: this.state.confirmedRequests.length
        });
        this.state.confirmedListItemExpansion.push(false);
      } else {
        this.state.pendingRequests.push({
          request: request,
          profilePic: 'data:image/png;base64,' + (await getUserImage(request.requesterUsername)).def,
          index: this.state.pendingRequests.length
        });
        this.state.pendingListItemExpansion.push(false);
      }
    } 
    
    this.setState({ display: true });
  };

  // Close the add offer dialog
  handleClose = () => {
    this.setState({ display: false });
  };

  // Toggle an expandable list item's state
  handleListItemClick = (list, index) => {
    if (list === 1) {
      let confirmedListState = this.state.confirmedListItemExpansion;
      confirmedListState[index] = !confirmedListState[index];
      this.setState({ confirmedListItemExpansion: confirmedListState });
    } else if (list === 2) {
      let pendingListState = this.state.pendingListItemExpansion;
      pendingListState[index] = !pendingListState[index];
      this.setState({ pendingListItemExpansion: pendingListState });
    }
  }

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
            
              <h4 style={{ marginTop: '0em', marginBottom: '0em' }}>
                Confirmed ({this.state.confirmedRequests.length})
              </h4>

              <List dense={this.state.dense}>
                {this.state.confirmedRequests.map((confirmedRequest) => {
                  return (
                    <ListItem
                      button
                      onClick={() => { this.handleListItemClick(1, this.state.confirmedRequests.findIndex(
                        i => i.request.requestID === confirmedRequest.requestID
                      ))}}
                      disableGutters={this.state.noGutters}
                      divider={this.state.divider}
                    >
                      <ListItemAvatar>
                        <Avatar src={confirmedRequest.profilePic}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={getUserFullName(confirmedRequest.request.requesterUsername)}
                        secondary={confirmedRequest.request.requesterNote}
                      />
                    </ListItem>
                  )
                })}
              </List>

              <hr/>
              
              <h4 style={{ marginTop: '1em', marginBottom: '0em' }}>
                Requested ({this.state.pendingRequests.length})
              </h4>

              <List dense={this.state.dense}>
                {this.state.pendingRequests.map((pendingRequest) => {
                  return (
                    <ListItem
                      button
                      onClick={ (index) => { this.handleListItemClick(2, pendingRequest.index) }}
                      disableGutters={this.state.noGutters}
                      divider={this.state.divider}
                    >
                      <ListItemAvatar>
                        <Avatar src={pendingRequest.profilePic}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={getUserFullName(pendingRequest.request.requesterUsername)}
                        secondary={pendingRequest.request.requesterNote}
                      />
                    </ListItem>
                  )
                })}
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
            </Grid>

          </DialogContent>
        }
      </Dialog>
    );
  }
}

export default PassengerListDialog;
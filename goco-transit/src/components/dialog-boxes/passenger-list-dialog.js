import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from 'material-ui/List';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';

// Components
import { Icons } from '../../icon-library';

// Services
import { getUserFullName } from '../../services/user-service';

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
      divider: false,
      display: false,
      confirmedRequests: [],
      pendingRequests: [],
      confirmedListItemExpansion: [],
      pendingListItemExpansion: []
    };
  }

  // Open the add offer dialog
  handleClickOpen = async (requests) => {
    // Reset arrays to being empty
    await this.setState({
      confirmedRequests: [],
      pendingRequests: [],
      confirmedListItemExpansion: [],
      pendingListItemExpansion: []
    });
    
    // Sort Requests by confirmation status
    for (let request in requests) {
      if (requests[request].isConfirmed) {
        this.state.confirmedRequests.push({
          request: requests[request],
          index: this.state.confirmedRequests.length
        });
        this.state.confirmedListItemExpansion.push(false);
      } else {
        this.state.pendingRequests.push({
          request: requests[request],
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

  // Invert the expanded boolean of the specified request list item
  toggleExpansionState = (arrayChoice, index) => {
    let oldArray = [];
    let newArray = [];

    // Set oldArray based on arrayChoice (0 = Pending, 1 = Confirmed)
    (arrayChoice ? oldArray = this.state.confirmedListItemExpansion : oldArray = this.state.pendingListItemExpansion);

    // Toggle the list item so that it is the only one open
    (oldArray[index] === false || oldArray[index] === undefined ? newArray[index] = true : newArray[index] = false);

    // Set new state based on arrayChoice (0 = Pending, 1 = Confirmed)
    if (arrayChoice) {
      this.setState({ confirmedListItemExpansion: newArray });
      this.setState({ pendingListItemExpansion: [] });
    } else {
      this.setState({ pendingListItemExpansion: newArray });
      this.setState({ confirmedListItemExpansion: [] });
    }
  };

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
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

              {/* List of confirmed passengers */}
              <List dense={this.state.dense}>
                {this.state.confirmedRequests.map((confirmedRequest) => {
                  return (
                    <ExpansionPanel expanded={this.state.confirmedListItemExpansion[confirmedRequest.index]} elevation={0}>
                      <ExpansionPanelSummary
                        style={{ padding: 0 }}
                        expandIcon={
                          <IconButton onClick={this.toggleExpansionState.bind(this, true, confirmedRequest.index)}>
                            {Icons.expandIcon}
                          </IconButton>
                        }
                      >
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                        >
                          <ListItemAvatar onClick={this.toggleExpansionState.bind(this, true, confirmedRequest.index)}>
                            <Avatar src={confirmedRequest.request.requesterPhoto}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={getUserFullName(confirmedRequest.request.requesterUsername)} style={{ paddingLeft: '1.5em' }}
                            onClick={this.toggleExpansionState.bind(this, true, confirmedRequest.index)}
                          />
                          <div style={{ alignContent: 'flex-end' }}>
                            <ListItemSecondaryAction>
                              <div style={{ paddingRight: '3em' }}>
                                <IconButton>
                                  {Icons.deleteIcon}
                                </IconButton>
                              </div>
                            </ListItemSecondaryAction>
                          </div>
                        </ListItem>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ padding: 0 }}>
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                          style={{ paddingTop: '1em' }}
                        >
                          <ListItemAvatar>
                            <Badge badgeContent={
                              <IconButton
                                disabled
                                style={{
                                  backgroundColor: '#BDBDBD',
                                  color: '#FFFFFF',
                                  width: '1.25em',
                                  height: '1.25em'
                              }}>
                                {Icons.seatIcon}
                              </IconButton>}>
                              <Avatar>
                                {Icons.noteIcon}
                              </Avatar>
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText primary={confirmedRequest.request.requesterNote} style={{ paddingLeft: '1.5em' }}/>
                        </ListItem>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
              </List>

              <hr/>

              {this.state.pendingRequests.length > 0 ?
                <h4 style={{ marginTop: '1em', marginBottom: '0em', color: '#F44336' }}>
                  Requested ({this.state.pendingRequests.length})
                </h4>
                :
                <h4 style={{ marginTop: '1em', marginBottom: '0em' }}>
                  Requested ({this.state.pendingRequests.length})
                </h4>
              }
              
              {/* List of potential passengers */}
              <List dense={this.state.dense}>
                {this.state.pendingRequests.map((pendingRequest) => {
                  return (
                    <ExpansionPanel expanded={this.state.pendingListItemExpansion[pendingRequest.index]} elevation={0}>
                      <ExpansionPanelSummary
                        style={{ padding: 0 }}
                        expandIcon={
                          <IconButton onClick={this.toggleExpansionState.bind(this, false, pendingRequest.index)}>
                            {Icons.expandIcon}
                          </IconButton>
                        }
                      >
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                        >
                          <ListItemAvatar onClick={this.toggleExpansionState.bind(this, false, pendingRequest.index)}>
                            <Avatar src={pendingRequest.request.requesterPhoto}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={getUserFullName(pendingRequest.request.requesterUsername)} style={{ paddingLeft: '1.5em' }}
                            onClick={this.toggleExpansionState.bind(this, false, pendingRequest.index)}
                          />
                          <div style={{ alignContent: 'flex-end' }}>
                            <ListItemSecondaryAction>
                              <div style={{ paddingRight: '3em' }}>
                                <IconButton>
                                  {Icons.confirmIcon}
                                </IconButton>
                                <IconButton>
                                  {Icons.deleteIcon}
                                </IconButton>
                              </div>
                            </ListItemSecondaryAction>
                          </div>
                        </ListItem>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ padding: 0 }}>
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                          style={{ paddingTop: '1em' }}
                        >
                          <ListItemAvatar>
                            <Badge badgeContent={
                              <IconButton
                                disabled
                                style={{
                                  backgroundColor: '#BDBDBD',
                                  color: '#FFFFFF',
                                  width: '1.25em',
                                  height: '1.25em'
                              }}>
                                {Icons.seatIcon}
                              </IconButton>}>
                              <Avatar>
                                {Icons.noteIcon}
                              </Avatar>
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText primary={pendingRequest.request.requesterNote} style={{ paddingLeft: '1.5em' }}/>
                        </ListItem>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
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
import React from 'react';
import DoneIcon from 'material-ui-icons/Done';
import DeleteIcon from 'material-ui-icons/Delete';
import QuestionIcon from 'material-ui-icons/Help';
import PersonIcon from 'material-ui-icons/Person';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom'

// Components
import RequestSearch from './request-search'

// Contains ride requests made by the user
class Requests extends React.Component {
  state = {
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* List of requested rides */}
        <List dense={this.state.dense}>
          <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
            <ListItemAvatar>
              <Avatar>
                <DoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Pittsburgh"
              secondary={this.state.secondary ? '12/7-12/19' : null}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
            <ListItemAvatar>
              <Avatar>
                <QuestionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Wenham"
              secondary={this.state.secondary ? '1/16-18/18' : null}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        {/* Add a request button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Link to="/requests/search">
                  <Button fab color="secondary" aria-label="add">
                    <AddIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Delete a request dialog box */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this ride request?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              (Ride data will go here)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Back
            </Button>
            <Button onClick={this.handleClose}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default Requests;
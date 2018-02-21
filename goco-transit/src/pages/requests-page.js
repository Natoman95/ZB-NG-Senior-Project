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
import { Link } from 'react-router-dom';

// Components
import RequestSearchPage from './request-search-page';
import DeleteRequestDialog from '../components/delete-request-dialog';

// Services
import { getUser } from '../services/user-service';

// Contains ride requests made by the user
class RequestsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      displayDeleteRequestDialog: false,
      user: null,
      rides: null,
      requests: null
    };

    //this.state.displayDeleteRequestDialog = this.displayDeleteRequestDialog.state.displayDeleteRequestDialog;
    this.state.user = getUser();
    this.state.requests = this.state.user.requests;
    this.state.rides = this.state.user.rides;
  }

  render() {
    return (
      <div>
        {/* List of rides generated from an array */}
        <h3>
          Rides
        </h3>
        <List dense={this.state.dense}>
          {this.state.rides.map((ride) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                <ListItemAvatar>
                  {/* Depending on whether the user has been accepted as a passenger
                  A different avatar will be displayed */}
                  <Avatar>
                    <DoneIcon />
                  </Avatar>
                </ListItemAvatar>
                {/* Route destination and date range */}
                <ListItemText
                  primary={ride.destination}
                  secondary={this.state.secondary ? ride.date : null}
                />
                {/* Delete ride button */}
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.refs.deleteRequestDialogRef.handleClickOpen()} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* List of requests generated from an array */}
        <h3 style={{ marginTop: '3em' }}>
          Requests
        </h3>

        <List dense={this.state.dense}>
          {this.state.requests.map((request) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                <ListItemAvatar>
                  {/* Depending on whether the user has been accepted as a passenger
                  A different avatar will be displayed */}
                  <Avatar>
                    <QuestionIcon />
                  </Avatar>
                </ListItemAvatar>
                {/* Route destination and date range */}
                <ListItemText
                  primary={request.destination}
                  secondary={this.state.secondary ? (request.dateMin + '-' + request.dateMax) : null}
                />
                {/* Delete request button */}
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.refs.deleteRequestDialogRef.handleClickOpen()} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* Add a request button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Link to="/requests/search">
                  <Button variant="fab" color="secondary" aria-label="add">
                    <AddIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Delete a request dialog box */}
        <DeleteRequestDialog ref="deleteRequestDialogRef" />       
        
      </div>
    );
  }
}

export default RequestsPage;
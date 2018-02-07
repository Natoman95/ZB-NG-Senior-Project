import React from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import DeleteIcon from 'material-ui-icons/Delete';
import PersonIcon from 'material-ui-icons/Person';
import Avatar from 'material-ui/Avatar';
import ZachPhoto from '../images/user_profile_zach.jpg'
import NathanPhoto from '../images/user_profile_nathan.jpg'
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PlaceIcon from 'material-ui-icons/place';
import ClockIcon from 'material-ui-icons/watchLater';
import CalendarIcon from 'material-ui-icons/dateRange';

class RequestSearch extends React.Component {
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
        {/* Ride Search dialog */}
        <h3>
          Find a Ride by Location
        </h3>

        <TextField
          style={{ margin: 0 }}
          id="search"
          label="Search"
          type="search"
          margin="normal"
          fullWidth={true}
        />

        {/* Date range selection */}
        <div style={{ marginTop: '2em' }}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item>
                  <form noValidate>
                    <TextField
                      id="startDate"
                      label="Earliest Travel Day"
                      type="date"
                      defaultValue="2018-12-01"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <form noValidate>
                    <TextField
                      id="startDate"
                      label="Latest Travel Day"
                      type="date"
                      defaultValue="2018-12-31"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        {/* Search button */}
        <div>
          <Button raised color="secondary" style={{ width: '100%', marginTop: '2em' }}>
            Search
          </Button>
        </div>

        {/* Search Results */}
        <div style={{ marginTop: '3em' }}>
          <h3>
            Results
        </h3>

          <List dense={this.state.dense}>
            <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider} onClick={this.handleClickOpen}>
              <Avatar src={ZachPhoto} />
              <ListItemText
                primary="Scranton"
                secondary={this.state.secondary ? '12/3/18' : null}
              />
              <ListItemSecondaryAction>
                <IconButton disabled={true}>
                  <Badge badgeContent={1} color="primary">
                    <PersonIcon />
                  </Badge>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider} onClick={this.handleClickOpen}>
              <Avatar src={NathanPhoto} />
              <ListItemText
                primary="Oxford"
                secondary={this.state.secondary ? '12/17/18' : null}
              />
              <ListItemSecondaryAction>
                <IconButton disabled={true}>
                  <Badge badgeContent={2} color="primary">
                    <PersonIcon />
                  </Badge>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>

        {/* Confirm adding ride request dialog box */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add this ride request?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <PlaceIcon /> (Location)
              <br />
              <br />
              <CalendarIcon /> (Date)
              <br />
              <br />
              <ClockIcon /> (Time)
              <br />
              <br />
              Notes:
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Back
            </Button>
            <Button onClick={this.handleClose}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

export default RequestSearch
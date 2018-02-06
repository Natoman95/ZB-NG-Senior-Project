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

// Contains ride requests made by the user
class Requests extends React.Component {
  state = {
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
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
              <IconButton aria-label="Delete">
                <DeleteIcon onClick="">
                </DeleteIcon>
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
              <IconButton aria-label="Delete">
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
                <Button fab color="secondary" aria-label="add">
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}

// Dialog box for confirming the deletion of a ride request
class ConfirmationDialog extends React.Component {
  state = {
    value: undefined,
  };

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ value: nextProps.value });
    }
  }

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Requests;
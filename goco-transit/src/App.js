import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import GroupIcon from 'material-ui-icons/Group';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import FavoriteIcon from 'material-ui-icons/Favorite';
import SettingsIcon from 'material-ui-icons/Settings';
import DoneIcon from 'material-ui-icons/Done';
import DeleteIcon from 'material-ui-icons/Delete';
import QuestionIcon from 'material-ui-icons/Help';
import PersonIcon from 'material-ui-icons/Person';
import Typography from 'material-ui/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
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
import Chip from 'material-ui/Chip';
import Badge from 'material-ui/Badge';

// Universal color theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00AEEF',
      main: '#014983',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DE571f',
      main: '#B2BB1C',
      dark: '#B53228',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
});

// Contains the children the tabs navigate between
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

// Main page for the application
class Main extends React.Component {
  state = {
    value: 0,
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
  };

  handleChange = (event, value) => {
    // Change tab pages
    this.setState({ value });
  };

  render() {
    return (
      // Pass down the theme through the whole app
      <MuiThemeProvider theme={theme}>
        <div>
          <div>
            <AppBar position="static" color="primary">
              <Tabs
                fullWidth={true}
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor={theme.palette.primary.light}
              >
                <Tab label="Requests" icon={<GroupAddIcon />} />
                <Tab label="Offers" icon={<GroupIcon />} />
                <Tab label="Settings" icon={<SettingsIcon />} />
              </Tabs>
            </AppBar>
          </div>

          {/* Requests */}
          <div>
            {this.state.value === 0 &&
              <TabContainer>
                <div>
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
                        <IconButton aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>

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
              </TabContainer>}
          </div>

          {/* Offers */}
          <div>
            {this.state.value === 1 &&
              <TabContainer>
                <div>
                  <List dense={this.state.dense}>
                    <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                      <ListItemAvatar>
                        <Avatar>
                          <DoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Scranton"
                        secondary={this.state.secondary ? '2/3/18' : null}
                      />
                      <ListItemSecondaryAction>
                        <IconButton disabled={true}>
                          <Badge badgeContent={4} color="primary">
                            <PersonIcon />
                          </Badge>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                      <ListItemAvatar>
                        <Avatar>
                          <DoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Boston"
                        secondary={this.state.secondary ? '4/6/18' : null}
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
              </TabContainer>}
          </div>

          {/* Settings */}
          <div>
            {this.state.value === 2 &&
              <TabContainer>

              </TabContainer>}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
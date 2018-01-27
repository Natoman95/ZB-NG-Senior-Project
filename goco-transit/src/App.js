import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import GroupIcon from 'material-ui-icons/Group';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import FavoriteIcon from 'material-ui-icons/Favorite';
import SettingsIcon from 'material-ui-icons/Settings';
import Typography from 'material-ui/Typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';

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

class Main extends React.Component {
  state = {
    value: 0,
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

          {this.state.value === 0 && <TabContainer>Requests</TabContainer>}
          {this.state.value === 1 && <TabContainer>Offers</TabContainer>}
          {this.state.value === 2 && <TabContainer>Settings</TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
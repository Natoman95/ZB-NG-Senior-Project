import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import GroupIcon from 'material-ui-icons/Group';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import SettingsIcon from 'material-ui-icons/Settings';
import Typography from 'material-ui/Typography';
import { Link, Route } from 'react-router-dom'

// Components
import Offers from './offers';
import Requests from './requests';
import Settings from './settings'

// Contains the children the tabs navigate between
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

// Main app component
class Main extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <div>
          {/* Tabs */}
          <AppBar position="static" color="primary">
            <Tabs
              fullWidth={true}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
            >
              <Tab label="Requests" icon={<GroupAddIcon />} component={Link} to="/requests" />
              <Tab label="Offers" icon={<GroupIcon />} component={Link} to="/offers" />
              <Tab label="Settings" icon={<SettingsIcon />} component={Link} to="/settings" />
            </Tabs>
          </AppBar>
        </div>

        {/* Tab Pages */}
        <div>
          <TabContainer>
            <Route exact path="/requests" component={Requests} />
            <Route exact path="/offers" component={Offers} />
            <Route exact path="/settings" component={Settings} />
          </TabContainer>
        </div>
      </div>
    );
  }
}

export default Main;
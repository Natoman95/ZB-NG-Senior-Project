import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import GroupIcon from 'material-ui-icons/Group';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import SettingsIcon from 'material-ui-icons/Settings';
import Typography from 'material-ui/Typography';
import Offers from './offers';
import Requests from './requests';

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
      <div>
        <div>
          <AppBar position="static" color="primary">
            <Tabs
              fullWidth={true}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
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
              <Requests />
            </TabContainer>}
        </div>

        {/* Offers */}
        <div>
          {this.state.value === 1 &&
            <TabContainer>
              <Offers />
            </TabContainer>}
        </div>

        {/* Settings */}
        <div>
          {this.state.value === 2 &&
            <TabContainer>

            </TabContainer>}
        </div>
      </div>
    );
  }
}

export default Main;
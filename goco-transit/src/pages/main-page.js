import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { Link, Route } from 'react-router-dom'

// Components
import DriverPage from './driver-page';
import PassengerPage from './passenger-page';
import SettingsPage from './settings-page';
import SearchPage from './search-page';
import { Icons } from '../icon-library';

// Contains the children the tabs navigate between
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

// Main app component
class MainPage extends React.Component {
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
          <AppBar position="static" color="primary" style={{ position: 'fixed' }}>
            <Tabs
              fullWidth={true}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
            >
              <Tab label="Passenger" icon={Icons.seatIcon} component={Link} to="/passenger" />
              <Tab label="Driver" icon={Icons.driverIcon} component={Link} to="/driver" />
              <Tab label="Settings" icon={Icons.settingsIcon} component={Link} to="/settings" />
            </Tabs>
          </AppBar>
        </div>

        {/* Tab Pages */}
        <div style={{ paddingTop: '4.25em' }}>
          <TabContainer>
            <Route exact path="/" component={PassengerPage} />
            <Route exact path="/passenger" component={PassengerPage} />
            <Route exact path="/passenger/search" component={SearchPage} />
            <Route exact path="/driver" component={DriverPage} />
            <Route exact path="/settings" component={SettingsPage} />
          </TabContainer>
        </div>
      </div>
    );
  }
}

export default MainPage;
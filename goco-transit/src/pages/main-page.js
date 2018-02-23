import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { Link, Route } from 'react-router-dom'

// Components
import OffersPage from './offers-page';
import RequestsPage from './requests-page';
import SettingsPage from './settings-page'
import RequestSearchPage from './request-search-page'
import {Icons} from './icon-library';

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
          <AppBar position="static" color="primary">
            <Tabs
              fullWidth={true}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
            >
              <Tab label="Driver" icon={React.createElement(Icons.driverIcon)} component={Link} to="/requests" />
              <Tab label="Passenger" icon={React.createElement(Icons.seatIcon)} component={Link} to="/offers" />
              <Tab label="Settings" icon={React.createElement(Icons.settingsIcon)} component={Link} to="/settings" />
            </Tabs>
          </AppBar>
        </div>

        {/* Tab Pages */}
        <div>
          <TabContainer>
            <Route exact path="/" component={RequestsPage} />
            <Route exact path="/requests" component={RequestsPage} />
            <Route exact path="/requests/search" component={RequestSearchPage} />
            <Route exact path="/offers" component={OffersPage} />
            <Route exact path="/settings" component={SettingsPage} />
          </TabContainer>
        </div>
      </div>
    );
  }
}

export default MainPage;
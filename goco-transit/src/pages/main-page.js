import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { Link, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import DriverPage from './driver-page';
import PassengerPage from './passenger-page';
import SettingsPage from './settings-page';
import SearchPage from './search-page';
import { Icons } from '../icon-library';

// Services
import { getUser } from '../services/user-service';

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
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.matchTabToRoute = this.matchTabToRoute.bind(this);

    this.loadUserData();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  /**
   * Whenever the route is changed or set without using the tab buttons
   * this method can be used to match the tab to the current route
   */
  matchTabToRoute() {
    let path = this.props.history.location.pathname;
    if (path === '/' || path.includes('/passenger')) {
      this.setState({ value: 0 });
    }
    else if (path.includes('/driver')) {
      this.setState({ value: 1 });
    }
    else if (path.includes('/settings')) {
      this.setState({ value: 2 });
    }
  }

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
              centered
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
            <Route
              exact path="/"
              render={() => <PassengerPage
                matchTab={this.matchTabToRoute}>
              </PassengerPage>} />
            <Route
              exact path="/passenger"
              render={() => <PassengerPage
                matchTab={this.matchTabToRoute}>
              </PassengerPage>} />
            <Route
              exact path="/passenger/search"
              render={() => <SearchPage
                matchTab={this.matchTabToRoute}>
              </SearchPage>} />
            <Route
              exact path="/driver"
              render={() => <DriverPage
                matchTab={this.matchTabToRoute}>
              </DriverPage>} />
            <Route
              exact path="/settings"
              render={() => <SettingsPage
                onLogout={this.props.onLogout}
                matchTab={this.matchTabToRoute}>
              </SettingsPage>} />
          </TabContainer>
        </div>
      </div>
    );
  }

  /**
   * Load user data on login - grabbing from 360
   */
  async loadUserData() {
    await getUser();
  };

}

MainPage.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default withRouter(MainPage);
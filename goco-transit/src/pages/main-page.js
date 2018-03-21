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

    this.loadUserData();
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
                matchTab={() => this.setState({ value: 0 })}>
              </PassengerPage>} />
            <Route
              exact path="/passenger"
              render={() => <PassengerPage
                matchTab={() => this.setState({ value: 0 })}>
              </PassengerPage>} />
            <Route
              exact path="/passenger/search"
              render={() => <SearchPage
                matchTab={() => this.setState({ value: 0 })}>
              </SearchPage>} />
            <Route
              exact path="/driver"
              render={() => <DriverPage
                matchTab={() => this.setState({ value: 1 })}>
              </DriverPage>} />
            <Route
              exact path="/settings"
              render={() => <SettingsPage
                onLogout={this.props.onLogout}
                matchTab={() => this.setState({ value: 2 })}>
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
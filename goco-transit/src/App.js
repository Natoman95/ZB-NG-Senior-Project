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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Main extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Requests" icon={<GroupAddIcon />} />
            <Tab label="Offers" icon={<GroupIcon />} />
            <Tab label="Settings" icon={<SettingsIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Requests</TabContainer>}
        {value === 1 && <TabContainer>Offers</TabContainer>}
        {value === 2 && <TabContainer>Settings</TabContainer>}
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);

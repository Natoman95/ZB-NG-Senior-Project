import React from 'react';

import OriginIcon from 'material-ui-icons/myLocation';
import DestinationIcon from 'material-ui-icons/place';
import TimeIcon from 'material-ui-icons/watchLater';
import DateIcon from 'material-ui-icons/dateRange';
import NoteIcon from 'material-ui-icons/assignment';
import PersonIcon from 'material-ui-icons/person';
import DriverIcon from 'material-ui-icons/driveETA';
import SeatIcon from 'material-ui-icons/eventSeat';
import ConfirmedRideIcon from 'material-ui-icons/done';
import PendingRideIcon from 'material-ui-icons/help';
import LeftArrowIcon from 'material-ui-icons/chevronLeft';
import RightArrowIcon from 'material-ui-icons/chevronRight';
import SettingsIcon from 'material-ui-icons/Settings';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search';

// Icon dictionary
var icons = {
  originIcon: React.createElement(OriginIcon),
  destinationIcon: React.createElement(DestinationIcon),
  timeIcon: React.createElement(TimeIcon),
  dateIcon: React.createElement(DateIcon),
  noteIcon: React.createElement(NoteIcon),
  personIcon: React.createElement(PersonIcon),
  driverIcon: React.createElement(DriverIcon),
  seatIcon: React.createElement(SeatIcon),
  confirmedRideIcon: React.createElement(ConfirmedRideIcon),
  pendingRideIcon: React.createElement(PendingRideIcon),
  leftArrowIcon: React.createElement(LeftArrowIcon),
  rightArrowIcon: React.createElement(RightArrowIcon),
  settingsIcon: React.createElement(SettingsIcon),
  addIcon: React.createElement(AddIcon),
  editIcon: React.createElement(EditIcon),
  deleteIcon: React.createElement(DeleteIcon),
  searchIcon: React.createElement(SearchIcon)
};

export { icons as Icons };
import React from 'react';

import OriginIcon from 'material-ui-icons/MyLocation';
import DestinationIcon from 'material-ui-icons/Place';
import TimeIcon from 'material-ui-icons/WatchLater';
import DateIcon from 'material-ui-icons/DateRange';
import NoteIcon from 'material-ui-icons/Assignment';
import DriverIcon from 'material-ui-icons/DriveEta';
import SeatIcon from 'material-ui-icons/EventSeat';
import ConfirmIcon from 'material-ui-icons/Done';
import LeftArrowIcon from 'material-ui-icons/ChevronLeft';
import RightArrowIcon from 'material-ui-icons/ChevronRight';
import SettingsIcon from 'material-ui-icons/Settings';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search';
import ExitIcon from 'material-ui-icons/Close';

// Icon dictionary
var icons = {
  originIcon: React.createElement(OriginIcon),
  destinationIcon: React.createElement(DestinationIcon),
  timeIcon: React.createElement(TimeIcon),
  dateIcon: React.createElement(DateIcon),
  noteIcon: React.createElement(NoteIcon),
  driverIcon: React.createElement(DriverIcon),
  seatIcon: React.createElement(SeatIcon),
  confirmIcon: React.createElement(ConfirmIcon),
  leftArrowIcon: React.createElement(LeftArrowIcon),
  rightArrowIcon: React.createElement(RightArrowIcon),
  settingsIcon: React.createElement(SettingsIcon),
  addIcon: React.createElement(AddIcon),
  editIcon: React.createElement(EditIcon),
  deleteIcon: React.createElement(DeleteIcon),
  searchIcon: React.createElement(SearchIcon),
  exitIcon: React.createElement(ExitIcon)
};

export { icons as Icons };
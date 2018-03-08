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
import SvgIcon from 'material-ui/SvgIcon';

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
  pendingIcon:
  (<SvgIcon>
    <path d='M10,19H13V22H10V19M12,2C17.35,2.22 19.68,
             7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,
             14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,
             12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,
             8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z' />
  </SvgIcon>),
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
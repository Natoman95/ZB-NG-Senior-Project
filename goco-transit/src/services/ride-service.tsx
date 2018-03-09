import UserModel from '../models/user-model';
import RideModel from '../models/ride-model';

const ZachPhoto = require('../images/user_profile_zach.jpg');
const NathanPhoto = require('../images/user_profile_nathan.jpg');

/**
 * This class is responsible for all actions related to rides
 */

/**
 * Get rides within a certain date range and along the route between an origin and destination
 * @param {Date} startDate first date in date range
 * @param {Date} endDate last date in date range
 * @param {String} origin starting location
 * @param {String} destination desired final location
 * @return {UserModel} Current user
 */
const findOfferedRides = (startDate: Date, endDate: Date, origin: string, destination: string) => {
  // Hardcoded for now - will retrieve from 360
  let Zach = new UserModel('Zach', 'Brown', 'zach.brown@gordon.edu');
  let Nathan = new UserModel('Nathan', 'Gray', 'nathan.gray@gordon.edu');
  Nathan.profilePhoto = NathanPhoto;
  Zach.profilePhoto = ZachPhoto;

  let Rachel = new UserModel('Rachel', 'Wonko', 'rachel.wonko@gordon.edu');
  let Jim = new UserModel('Jim', 'Bob', 'jim.bob@gordon.edu');

  // Dummy rides - will be found in a database somewhere
  let ride1 = new RideModel('Wenham', 'Oxford', '12/7/2017', Nathan);
  ride1.passengers = [Rachel];
  ride1.maxCapacity = 3;

  let ride2 = new RideModel('Manchester', 'Wenham', '1/16/2018', Zach);
  ride2.passengers = [Jim];
  ride2.maxCapacity = 4;

  let rides = [ride1, ride2];

  return rides;
};

export { findOfferedRides };
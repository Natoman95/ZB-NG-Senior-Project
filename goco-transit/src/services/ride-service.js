import UserModel from "../models/user-model";
import RideModel from "../models/ride-model";
import ZachPhoto from '../images/user_profile_zach.jpg'
import NathanPhoto from '../images/user_profile_nathan.jpg'

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
const findRides = (startDate, endDate, origin, destination) => {
  // Hardcoded for now - will retrieve from 360
  let Zach = new UserModel("Zach", "Brown", "zach.brown@gordon.edu");
  let Nathan = new UserModel("Nathan", "Gray", "nathan.gray@gordon.edu");
  Nathan.profilePhoto = NathanPhoto;
  Zach.profilePhoto = ZachPhoto;

  let Rachel = new UserModel("Rachel", "Wonko", "rachel.wonko@gordon.edu");
  let Jim = new UserModel("Jim", "Bob", "jim.bob@gordon.edu");

  // Dummy rides - will be found in a database somewhere
  let confirmedRide1 = new RideModel("Wenham", "Oxford", "12/7/2017", Nathan);
  confirmedRide1.passengers = [Rachel];

  let confirmedRide2 = new RideModel("Manchester", "Wenham", "1/16/2018", Zach);
  confirmedRide2.passengers = [Jim];

  let confirmedRides = [confirmedRide1, confirmedRide2];

  return confirmedRides;
}

export { findconfirmedRides };
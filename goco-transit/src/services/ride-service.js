// Models
import UserModel from "../models/user-model";
import RideModel from "../models/ride-model";

// Services
import { post } from './http-service';
import { getUser } from '../services/user-service';

// Media
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
const searchOfferedRides = (startDate, endDate, origin, destination) => {
  // Hardcoded for now - will retrieve from 360
  let Zach = new UserModel("Zach", "Brown", "zach.brown@gordon.edu");
  let Nathan = new UserModel("Nathan", "Gray", "nathan.gray@gordon.edu");
  Nathan.profilePhoto = NathanPhoto;
  Zach.profilePhoto = ZachPhoto;

  let Rachel = new UserModel("Rachel", "Wonko", "rachel.wonko@gordon.edu");
  let Jim = new UserModel("Jim", "Bob", "jim.bob@gordon.edu");

  // Dummy rides - will be found in a database somewhere
  let ride1 = new RideModel(Nathan.username, "Wenham", "Oxford", "2017-12-07", "13:30", 3, "How much more can they take from me? They got my blood, now it's my car!");
  ride1.passengers = [Rachel];
  ride1.maxCapacity = 3;
  ride1.id = "000003";

  let ride2 = new RideModel(Zach.username, "Manchester", "Wenham", "2017-11-03", "08:45", 4, "The way I see it, if you're gonna build a time machine into a car, why not do it with some style?");
  ride2.passengers = [Jim];
  ride2.maxCapacity = 4;
  ride2.id = "000004";

  let rides = [ride1, ride2];

  return rides;
}

const addRideOffer = (origin, destination, date, time, maxCapacity, driverNote) => {
  let rideToAdd = new RideModel(getUser().username, origin, destination, date, time, maxCapacity, driverNote);
  return post();
};

const getOfferedRides = (username) => {
  let offeredRides = [];

  // call database (pass in username) and get back their offered rides
  // for each ride in the return, push a new RideModel to the offeredRides array
  // return the offeredRides array

  // get();
};

export { searchOfferedRides, addRideOffer, getOfferedRides };
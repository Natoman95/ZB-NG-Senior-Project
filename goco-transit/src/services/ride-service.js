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
  let rides = null; // Avoids compilation error until this is rewritten 
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
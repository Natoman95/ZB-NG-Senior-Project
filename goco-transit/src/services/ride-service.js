// Models
import RideModel from "../models/ride-model";

// Services
import { get, post } from './http-service';
import { getUser } from '../services/user-service';

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
  let offeredRides = get(`transit/ride/user/${username}/offered`);
  return offeredRides;
};

// TODO: Returns just the date portion of departureDateTime
const getDepartureDate = (ride) => {
  return null;
}

// TODO: Returns just the time portion of departureDateTime
const getDepartureTime = (ride) => {
  return null;
}

export { searchOfferedRides, addRideOffer, getOfferedRides, getDepartureDate, getDepartureTime };
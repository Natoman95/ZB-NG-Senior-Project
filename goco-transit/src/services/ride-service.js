// Services
import { get, put, post, del } from './http-service';
import { getItem, setItem, removeItem, isCachedDataExpired } from "../services/storage-service";

/**
 * This class is responsible for all actions related to user rides
 * which they may be drivers or passengers on. This means getting,
 * posting, updating, and deleting requests
 */

/**
 * Get a Ride by its unique ID
 * Corresponds to GetByID in back end's RideController
 */
const getRideByID = async (id) => {
  return get(`transit/ride/id/${id}/`);
};

/**
 * Get the offered Rides that belong to a User
 * Corresponds to GetOfferedByUsername in back end's RideController
 */
const getOfferedRides = async (username) => {
  return get(`transit/ride/user/${username}/offered/`);
};

/**
 * Get the confirmed Rides that belong to a User
 * Corresponds to GetConfirmedByUsername in back end's RideController
 */
const getConfirmedRides = async (username) => {
  return await get(`transit/ride/user/${username}/confirmed/`);    
};

/**
 * Get the requested Rides that belong to a User
 * Corresponds to GetPendingByUsername in back end's RideController
 */
const getRequestedRides = async (username) => {
  return get(`transit/ride/user/${username}/pending/`);    
};

/**
 * Get Rides within a certain date range and along the route between an origin and destination
 * Utilizes GetByLocation in back end's RideController
 */
const getSearchResults = (startDate, endDate, origin, destination) => {
  let body = {};
  body.startDate = startDate;
  body.endDate = endDate;
  body.origin = origin;
  body.destination = destination;
  return post(`transit/ride/location/`, body);
};

/**
 * Add a new Ride to the database
 * Corresponds to PostRide in back end's RideController
 */
const addRideOffer = (ride) => {
  return post(`transit/ride/`, ride);
};

/**
 * Update a Ride's starting location
 * Corresponds to UpdateOrigin in back end's RideController
 */
const updateOrigin = (rideID, origin) => {
  return put(`transit/ride/origin/${rideID}/${origin}/`);
};

/**
 * Update a Ride's ending location
 * Corresponds to UpdateDestination in back end's RideController
 */
const updateDestination = (rideID, destination) => {
  return put(`transit/ride/destination/${rideID}/${destination}/`);
};

/**
 * Update a Ride's departure time
 * Corresponds to UpdateDateTime in back end's RideController
 */
const updateDepartureDateTime = (rideID, departureDateTime) => {
  return put(`transit/ride/date/${rideID}/${departureDateTime}/`);
};

/**
 * Update the driver of a Ride's note to passengers
 * Corresponds to UpdateNote in back end's RideController
 */
const updateDriverNote = (rideID, driverNote) => {
  return put(`transit/ride/note/${rideID}/${driverNote}/`);
};

/**
 * Update a Ride's maximum capacity
 * Corresponds to UpdateCapacity in back end's RideController
 */
const updateMaxCapacity = (rideID, maxCapacity) => {
  return put(`transit/ride/capacity/${rideID}/${maxCapacity}/`);
};

/**
 * Delete a Ride from the database by its unique ID
 * Corresponds to DeleteRide in back end's RideController
 */
const deleteRideByID = (rideID) => {
  return del(`transit/ride/delete/${rideID}/`);
};

export {
  getRideByID,
  getOfferedRides,
  getConfirmedRides,
  getRequestedRides,
  getSearchResults,
  addRideOffer,
  updateOrigin,
  updateDestination,
  updateDepartureDateTime,
  updateDriverNote,
  updateMaxCapacity,
  deleteRideByID
};
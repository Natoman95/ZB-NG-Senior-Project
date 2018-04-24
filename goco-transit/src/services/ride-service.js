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
  let ride;
  let key = "ride_" + id;
  if (isCachedDataExpired(key)) {
    ride = await get(`transit/ride/id/${id}/`);
    setItem(key, ride);
  }
  else {
    ride = getItem(key);
  }
  return ride;
};

/**
 * Get the offered Rides that belong to a User
 * Corresponds to GetOfferedByUsername in back end's RideController
 */
const getOfferedRides = async (username) => {
  let rides;
  let key = "offered";
  if (isCachedDataExpired(key)) {
    rides = await get(`transit/ride/user/${username}/offered/`);
    setItem(key, rides);
  }
  else {
    rides = getItem(key);
  }
  return rides;
};

/**
 * Get the confirmed Rides that belong to a User
 * Corresponds to GetConfirmedByUsername in back end's RideController
 */
const getConfirmedRides = async (username) => {
  let rides;
  let key = "confirmed";
  if (isCachedDataExpired(key)) {
    rides = await get(`transit/ride/user/${username}/confirmed/`);    
    setItem(key, rides);
  }
  else {
    rides = getItem(key);
  }
  return rides;
};

/**
 * Get the requested Rides that belong to a User
 * Corresponds to GetPendingByUsername in back end's RideController
 */
const getRequestedRides = async (username) => {
  let rides;
  let key = "confirmed";
  if (isCachedDataExpired(key)) {
    rides = await get(`transit/ride/user/${username}/pending/`);    
    setItem(key, rides);
  }
  else {
    rides = getItem(key);
  }
  return rides;
};

/**
 * Get Rides within a certain date range and along the route between an origin and destination
 * Utilizes GetByLocation in back end's RideController
 */
const getSearchResults = (startDate, endDate, origin, destination) => {
  // TODO: filter by start and end dates
  return get(`transit/ride/location/${origin}/${destination}/`);
};

/**
 * Add a new Ride to the database
 * Corresponds to PostRide in back end's RideController
 */
const addRideOffer = (ride) => {
  removeItem("offered");
  return post(`transit/ride/`, ride);
};

/**
 * Update a Ride's User array of passengers
 * Corresponds to UpdatePassengers in back end's RideController
 */
const updatePassengersArray = (rideID, passengerUsername) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/passengers/${rideID}/${passengerUsername}/`);
};

/**
 * Update a Ride's starting location
 * Corresponds to UpdateOrigin in back end's RideController
 */
const updateOrigin = (rideID, origin) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/origin/${rideID}/${origin}/`);
};

/**
 * Update a Ride's ending location
 * Corresponds to UpdateDestination in back end's RideController
 */
const updateDestination = (rideID, destination) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/destination/${rideID}/${destination}/`);
};

/**
 * Update a Ride's departure time
 * Corresponds to UpdateDateTime in back end's RideController
 */
const updateDepartureDateTime = (rideID, departureDateTime) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/date/${rideID}/${departureDateTime}/`);
};

/**
 * Update the driver of a Ride's note to passengers
 * Corresponds to UpdateNote in back end's RideController
 */
const updateDriverNote = (rideID, driverNote) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/note/${rideID}/${driverNote}/`);
};

/**
 * Update a Ride's maximum capacity
 * Corresponds to UpdateCapacity in back end's RideController
 */
const updateMaxCapacity = (rideID, maxCapacity) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/capacity/${rideID}/${maxCapacity}/`);
};

/**
 * Update a Ride's User array of Requests
 * Corresponds to UpdateRequests in back end's RideController
 */
// TODO: Account for decreasing the capacity when passenger(s) will be affected 
const updateRequestsArray = (rideID, requestID) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return put(`transit/ride/requests/${rideID}/${requestID}/`);
};

/**
 * Delete a Ride from the database by its unique ID
 * Corresponds to DeleteRide in back end's RideController
 */
const deleteRideByID = (rideID) => {
  removeItem("offered");
  removeItem("ride_" + rideID);
  return del(`transit/ride/delete/${rideID}/`);
};

export {
  getRideByID,
  getOfferedRides,
  getConfirmedRides,
  getRequestedRides,
  getSearchResults,
  addRideOffer,
  updatePassengersArray,
  updateOrigin,
  updateDestination,
  updateDepartureDateTime,
  updateDriverNote,
  updateMaxCapacity,
  updateRequestsArray,
  deleteRideByID
};
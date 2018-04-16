// Services
import { get, put, post, del } from './http-service';

/* This class is responsible for all actions related to Rides */

/**
 * Get a Ride by its unique ID
 * Corresponds to GetByID in back end's RideController
 */
const getRideByID = (id) => {
  return get(`transit/ride/id/${id}/`);
}

/**
 * Get the offered Rides that belong to a User
 * Corresponds to GetOfferedByUsername in back end's RideController
 */
const getOfferedRides = (username) => {
  return get(`transit/ride/user/${username}/offered/`);
};

/**
 * Get the confirmed Rides that belong to a User
 * Corresponds to GetConfirmedByUsername in back end's RideController
 */
const getConfirmedRides = (username) => {
  return get(`transit/ride/user/${username}/confirmed/`);
};

/**
 * Get Rides within a certain date range and along the route between an origin and destination
 * Utilizes GetByLocation in back end's RideController
 */
const getSearchResults = (startDate, endDate, origin, destination) => {
  // TODO: filter by start and end dates
  return get(`transit/ride/location/${origin}/${destination}/`);
}

/**
 * Add a new Ride to the database
 * Corresponds to PostRide in back end's RideController
 */
const addRideOffer = (ride) => {
  return post(ride);
};

/**
 * Update a Ride's User array of passengers
 * Corresponds to UpdatePassengers in back end's RideController
 */
const updatePassengersArray = (rideID, passengerUsername) => {
  return put(`transit/ride/passengers/${rideID}/${passengerUsername}/`);
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
 * Update a Ride's User array of Requests
 * Corresponds to UpdateRequests in back end's RideController
 */
// TODO: Account for decreasing the capacity when passenger(s) will be affected 
const updateRequestsArray = (rideID, requestID) => {
  return put(`transit/ride/requests/${rideID}/${requestID}/`);
};

/**
 * Delete a Ride from the database by its unique ID
 * Corresponds to DeleteRide in back end's RideController
 */
const deleteRideByID = (rideID) => {
  return del(`transit/ride/delete/${rideID}/`);
};

// TODO: Returns just the date portion of departureDateTime
const getDepartureDate = (ride) => {
  return ride.departureDateTime;
}

// TODO: Returns just the time portion of departureDateTime
const getDepartureTime = (ride) => {
  return ride.departureDateTime;
}

export {
  getRideByID,
  getOfferedRides,
  getConfirmedRides,
  getSearchResults,
  addRideOffer,
  updatePassengersArray,
  updateOrigin,
  updateDestination,
  updateDepartureDateTime,
  updateDriverNote,
  updateMaxCapacity,
  updateRequestsArray,
  deleteRideByID,
  getDepartureDate,
  getDepartureTime
};
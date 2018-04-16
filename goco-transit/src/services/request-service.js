// Services
import { get, put, post, del } from './http-service';

/* This class is responsible for all actions related to Requests */

/**
 * Get a Request by its unique ID
 * Corresponds to GetByID in back end's RequestController
 */
const getRequestByID = (requestID) => {
  return get(`transit/request/id/${requestID}/`);
}

/**
 * Get the Requests belonging to a User
 * Corresponds to GetByUsername in back end's RequestController
 */
const getRequests = (username) => {
  return get(`transit/request/user/${username}/`);
}

/**
 * Add a new Request to the database
 * Corresponds to PostRequest in back end's RequestController
 */
const addRequest = (request) => {
  return post(`transit/request/`, request);
}

/**
 * Update the Ride associated with a Request
 * Corresponds to UpdateRide in back end's RequestController
 */
const updateRide = (requestID, rideID) => {
  return put(`transit/request/ride/${requestID}/${rideID}/`);
}

/**
 * Update a Request's desired starting location
 * Corresponds to UpdateOrigin in back end's RequestController
 */
const updateOrigin = (requestID, origin) => {
  return put(`transit/request/origin/${requestID}/${origin}/`);
}

/**
 * Update a Request's desired ending location
 * Corresponds to UpdateDestination in back end's RequestController
 */
const updateDestination = (requestID, destination) => {
  return put(`transit/request/origin/${requestID}/${destination}/`);
}

/**
 * Update a Request's earliest possible departure time
 * Corresponds to UpdateEarliestDateTime in back end's RequestController
 */
const updateEarliestDepartureDateTime = (requestID, earliestDepartureDateTime) => {
  return put(`transit/request/earliest/${requestID}/${earliestDepartureDateTime}/`);
};

/**
 * Update a Request's latest possible departure time
 * Corresponds to UpdateLatestDateTime in back end's RequestController
 */
const updateLatestDepartureDateTime = (requestID, latestDepartureDateTime) => {
  return put(`transit/request/latest/${requestID}/${latestDepartureDateTime}/`);
};

/**
 * Delete a Request from the database by its unique ID
 * Corresponds to DeleteRequest in back end's RequestController
 */
const deleteRequestByID = (requestID) => {
  return del(`transit/request/delete/${requestID}/`);
};


export {
  getRequestByID,
  getRequests,
  addRequest,
  updateRide,
  updateOrigin,
  updateDestination,
  updateEarliestDepartureDateTime,
  updateLatestDepartureDateTime,
  deleteRequestByID
};
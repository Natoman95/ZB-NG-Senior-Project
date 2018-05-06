// Services
import { get, post, del } from './http-service';

/**
 * This class is responsible for all actions related to user requests
 * to become passengers on rides. This means getting, posting, updating,
 * and deleting requests
 */

/**
 * Get a Request by its unique ID
 * Corresponds to GetByID in back end's RequestController
 */
const getRequestByID = async (requestID) => {
  return await get(`transit/request/id/${requestID}/`);
};

/**
 * Get the Requests belonging to a User
 * Corresponds to GetByUsername in back end's RequestController
 */
const getRequests = async (username) => {
  return get(`transit/request/user/${username}/`);
};

/**
 * Add a new Request to the database
 * Corresponds to PostRequest in back end's RequestController
 */
const addRequest = (request) => {
  return post(`transit/request/`, request);
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
  deleteRequestByID
};
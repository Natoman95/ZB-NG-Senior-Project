// Services
import { get, post, del } from './http-service';
import { getItem, setItem, removeItem, isCachedDataExpired } from "../services/storage-service";

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
  let request;
  let key = "request_" + requestID;
  if (isCachedDataExpired(key)) {
    request = await get(`transit/request/id/${requestID}/`);
    setItem(key, request);
  }
  else {
    request = getItem(key);
  }
  return request;
};

/**
 * Get the Requests belonging to a User
 * Corresponds to GetByUsername in back end's RequestController
 */
const getRequests = async (username) => {
  let request;
  let key = "requests";
  if (isCachedDataExpired(key)) {
    request = await get(`transit/request/user/${username}/`);
    setItem(key, request);
  }
  else {
    request = getItem(key);
  }
  return request;
};

/**
 * Add a new Request to the database
 * Corresponds to PostRequest in back end's RequestController
 */
const addRequest = (request) => {
  removeItem("requests");
  removeItem("pending");
  return post(`transit/request/`, request);
};

/**
 * Delete a Request from the database by its unique ID
 * Corresponds to DeleteRequest in back end's RequestController
 */
const deleteRequestByID = (requestID) => {
  removeItem("requests");
  removeItem("request_" + requestID);
  return del(`transit/request/delete/${requestID}/`);
};


export {
  getRequestByID,
  getRequests,
  addRequest,
  deleteRequestByID
};
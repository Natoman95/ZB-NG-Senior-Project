import { getItem, setItem, clearStorage } from "./storage-service";
import { parseResponse } from "./http-service";

/**
 * This class is responsible for all actions related to user authentication
 */

/**
 * Handle an authentication error
 * @param {Error} err An authentication error
 * @throws {Error} An error that can be shown to users (`error.message`)
 */
const handleError = err => {
  console.error('Could not authenticate user:', err);
  if (err.error && err.error_description) {
    throw new Error(err.error_description);
  } else {
    throw new Error('Something went wrong! Please contact CTS for help.');
  }
};

/**
 * Get token for user from backend
 * @param {String} userName Username in firstname.lastname format
 * @param {String} password User's password
 * @return {String} Token for use on API requests
 */
const getAuth = (userName, password) => {
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  const body = new URLSearchParams({
    userName,
    password,
    grant_type: 'password',
  });
  const request = new Request(`/token`, { method: 'post', headers, body });

  return fetch(request)
    .then(parseResponse)
    .then(data => data.access_token)
    .catch(handleError);
};

/**
 * Authenticate a user, saving the returned token for later use and caching the user's credentials
 * for refreshing the token when it expires.
 * @param {String} userName Username in firstname.lastname format
 * @param {String} password User's password
 * @return {Promise.<undefined>} Resolved when token is refreshed
 */
const authenticate = (userName, password) => {
  setItem('userName', userName);
  getAuth(userName, password).then(token => setItem('token', token));
};

/**
 * Check if current session is authenticated
 * @description This is a naive check. The session is considered authenticated if
 * @return {Promise.<boolean>} Whether session is authenticated or not
 */
const isAuthenticated = () => {
  const token = getItem('token');

  // Check that auth contains a token
  if (token !== null && token.length > 0) {
    return true;
  }
  else {
    return false;
  }
};

/**
 * Sign a user out
 * @description Removes token from storage.
 */
const signOut = () => {
  clearStorage();
};

export { authenticate, signOut, isAuthenticated };
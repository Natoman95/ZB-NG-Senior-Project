import { getItem } from './storage-service';

/**
 * Handle HTTP requests to the API
 *
 * Copied from Gordon 360
 */

/**
 * Make a headers object for use with the API
 * @description Provides the correct authorization for API requests.
 * @return {Headers} A headers object
 */
const makeHeaders = () => {
  try {
    const token = getItem('token');
    return new Headers({
      Authorization: `Bearer ${token}`,
    });
  } catch (err) {
    throw new Error('Token is not available');
  }
};

/**
 * Create a request object with the correct URL and headers for the API
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {String} method HTTP method
 * @param {object|array} body data to send with request
 * @return {Request} A request object
 */
const createRequest = (url, method, body) =>
  new Request(`/api/${url}`, {
    method,
    body,
    headers: makeHeaders(),
  });

/**
 * Parse an HTTP response
 * @param {Response} res HTTP response
 * @return {Promise.<Object|Array|String|Number>} Resolves with response body; rejects on non-2xx
 * response code
 */
const parseResponse = res => {
  // Attempt to parse body of response
  const json = res
    .json()
    // Handle error if response body is not valid JSON
    .catch(error => Promise.reject());

  // Handle error when response body is valid but status code is not
  if (!res.ok) {
    return json.then(data => Promise.reject());
  }
  return json;
};

/**
 * Make a request to the API
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {String} method HTTP method
 * @param {object|array} body data to send with request
 * @return {Promise.<Object>} Response body
 */
const makeRequest = (url, method, body) =>
  fetch(createRequest(url, method, body)).then(parseResponse);

/**
 * Get
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @return {Promise.<Object>} Response body
 */
const get = url => makeRequest(url, 'get');

/**
 * Put
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {object|array} body data to send with request
 * @return {Promise.<Object>} Response body
 */
const put = (url, body) => makeRequest(url, 'put', body);

/**
 * Post
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {object|array} body data to send with request
 * @return {Promise.<Object>} Response body
 */
const post = (url, body) => makeRequest(url, 'post', body);

/**
 * Delete
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @return {Promise.<Object>} Response body
 */
const del = url => makeRequest(url, 'delete');

export { del, get, post, put, parseResponse };
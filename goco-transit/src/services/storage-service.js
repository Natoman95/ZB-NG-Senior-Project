let CircularJSON = require('circular-json');

/**
 * Performs operations necessary for storing data for caching purposes.
 * This means caching authentication, user, ride, and request data
 * so that a user can remain logged in and so that the client
 * doesn't have to make nearly as many slow server requests.
 */

/**
 * Get an item from local storage
 */
const getItem = (key) => {
  let item = window.localStorage.getItem(key);
  let parsedItem = null;
  try {
    parsedItem = CircularJSON.parse(item);
  }
  // If parsing fails, it's not JSON and we can return the item as is
  catch (e) {
    parsedItem = item;
  }

  return parsedItem;
}

/**
 * Put an item into local storage
 */
const setItem = (key, value) => {
  let jsonValue = CircularJSON.stringify(value);
  // JSON.stringify adds extra quotes to the beginning and end of strings
  // We need to remove these quotes so we don't have: ""example""
  let clippedJsonValue = jsonValue;
  if ((typeof jsonValue) === "string") {
    clippedJsonValue = jsonValue.replace(/(^"+|"+$)/mg, '');
  }
  // store item
  window.localStorage.setItem(key, clippedJsonValue);
}

/**
 * Delete an item from local storage
 */
const removeItem = (key) => {
  window.localStorage.removeItem(key);
}

/**
 * Check to see if data needs to be updated
 */
const isCachedDataExpired = (key) => {
  let data = getItem(key);
  if (data !== undefined && data !== null) {
    return false;
  }
  else {
    return true;
  }
}

/**
 * Clear anything stored in local storage by the app
 */
const clearStorage = () => {
  window.localStorage.clear();
}

export { getItem, setItem, removeItem, isCachedDataExpired, clearStorage };
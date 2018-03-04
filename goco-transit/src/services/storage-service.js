/**
 * Handle local storage of data
 */

/**
 * Get an item from local storage
 */
const getItem = (key) => {
  let item = window.localStorage.getItem(key);

  return item;
}

/**
 * Put an item into local storage
 */
const setItem = (key, value) => {
  let jsonValue = JSON.stringify(value);
  // JSON.stringify adds extra quotes to the beginning and end of strings
  // We need to remove these quotes so we don't have: ""example""
  let clippedJsonValue = jsonValue;
  if ((typeof jsonValue) === "string") {
    clippedJsonValue = jsonValue.replace(/(^"+|"+$)/mg, '');
  }
  window.localStorage.setItem(key, clippedJsonValue);
}

/**
 * Delete an item from local storage
 */
const removeItem = (key) => {
  window.localStorage.removeItem(key);
}

export { getItem, setItem, removeItem };
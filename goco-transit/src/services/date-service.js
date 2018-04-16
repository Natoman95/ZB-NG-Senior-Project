/* This class is responsible for all actions related to HTML5 date and time-related input types */

/**
 * Returns just the date portion of a datetime
 * @param {datetime} datetime to convert
 */
const getDate = (datetime) => {
  let date = (datetime.split("T"))[0];
  return date;
}

/**
 * Returns just the time portion of a datetime
 * @param {datetime} datetime to convert
 */
const getTime = (datetime) => {
  let time = (datetime.split("T"))[1];
  return time;
}

export {
  getDate,
  getTime
};
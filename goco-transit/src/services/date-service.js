/**
 * This class is responsible for all actions related to HTML5 date and
 * time-related input types. Dates in this format can be stored in the DB
 */

// Import Moment package
let moment = require('moment');

/**
 * Returns just the date portion of a datetime
 * @param {datetime} datetime to convert
 */
const getDate = (datetime) => {
  let date = new Date(datetime.toString());
  return moment(date).format("dd M/D/YY");  
}

/**
 * Returns just the time portion of a datetime
 * @param {datetime} datetime to convert
 */
const getTime = (datetime) => {
  let time = new Date(datetime.toString());
  return moment(time).format("h:mm A");
}

export {
  getDate,
  getTime
};
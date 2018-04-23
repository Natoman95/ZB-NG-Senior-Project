/**
 * This class is responsible for all actions related to HTML5 date and
 * time-related input types. Dates in this format can be stored in the DB
 */

/**
 * Returns just the date portion of a datetime
 * @param {datetime} datetime to convert
 */
const getDate = (datetime) => {
  let date = new Date(datetime.toString());
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(-2);
}

/**
 * Returns just the time portion of a datetime
 * @param {datetime} datetime to convert
 */
const getTime = (datetime) => {
  let time = new Date(datetime.toString());
  
  // AM vs PM
  let hours = time.getHours();
  let suffix = "AM";
  if (hours > 12) {
    hours = hours - 12;
    suffix = "PM";
  }
  
  // Pad minutes
  let minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
  return hours + ":" + minutes + " " + suffix;
}

export {
  getDate,
  getTime
};
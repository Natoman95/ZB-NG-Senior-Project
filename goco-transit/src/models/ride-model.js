/**
 * Contains data on rides which may be offers or rides
 */
class RideModel {
  constructor(driver, origin, destination, date, time, maxCapacity, driverNote) {
    this.driver = driver;
    this.origin = origin;
    this.destination = destination;
    this.date = date;
    this.time = time;
    this.maxCapacity = maxCapacity;
    this.driverNote = driverNote;
  }

  id; // Primary key

  // Data inputted into add offer dialog 
  origin; // Starting location
  destination; // Ending location
  date; // Date of ride
  time; // Time of ride
  driverNote; // Note to passengers (optional)

  driver; // User - the driver for the ride
  passengers = []; // Users - any users who are part of the ride
  maxCapacity; // The number of seats available when the ride offer is created 
  pendingRequests = []; // Requests - request objects from users who wish to join the ride

  // Determine whether a user is in the list of passengers
  isUserAPassenger = (user) => {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i] === user) {
        return true;
      }
    }
    return false;
  }
}

export default RideModel;
/**
 * Contains data on rides which may be offers or rides
 */
class RideModel {
  constructor(driverUsername, origin, destination, date, time, maxCapacity, driverNote) {
    this.driverUsername = driverUsername;
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

  driverUsername; // Username - the driver for the ride
  passengers = []; // Usernames - any Users who are part of the ride
  maxCapacity; // The number of seats available when the ride offer is created 
  pendingRequests = []; // Requests - request objects from Users who wish to join the ride

  // Determine whether a username is in the list of passengers
  isUserAPassenger = (usernameIn) => {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i] === usernameIn) {
        return true;
      }
    }
    return false;
  }
}

export default RideModel;
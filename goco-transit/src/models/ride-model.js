
/**
 * Contains data on rides which are viewed either as offers or
 * requests depending on the user
 */
class RideModel {
  constructor(source, destination, dateMin, dateMax, driver) {
    this.source = source;
    this.destination = destination;
    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.driver = driver;
  }

  source;
  destination;

  dateMin;
  dateMax;

  driver;
  passengers = [];
  pending = [];

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
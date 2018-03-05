/**
 * Contains data on rides which may be offers or rides
 */
class RequestModel {
  constructor(origin, destination, dateMin, dateMax, user) {
    this.origin = origin;
    this.destination = destination;
    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.user = user;
  }

  origin;
  destination;

  date;

  user; // User - the one who wants a ride
  pendingRide; // Ride - if the request is linked to a desired ride
}

export default RequestModel;
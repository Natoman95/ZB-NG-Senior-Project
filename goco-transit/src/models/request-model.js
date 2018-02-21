/**
 * Contains data on rides which may be offers or rides
 */
class RequestModel {
  constructor(source, destination, dateMin, dateMax, user) {
    this.source = source;
    this.destination = destination;
    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.user = user;
  }

  source;
  destination;

  date;

  user; // User - the one who wants a ride
  pendingRide; // Ride - if the request is linked to a desired ride
}

export default RequestModel;
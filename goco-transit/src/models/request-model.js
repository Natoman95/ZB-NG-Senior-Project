/**
 * Contains data on rides which may be offers or rides
 */
class RequestModel {
  constructor(user, origin, destination, earliestDeparture, latestDeparture, passengerNote) {
    this.user = user;
    this.origin = origin;
    this.destination = destination;
    this.earliestDeparture = earliestDeparture;
    this.latestDeparture = latestDeparture;
    this.passengerNote = passengerNote;
  }

  id; // Primary key

  // Data inputted into request search
  origin;
  destination;
  earliestDeparture;
  latestDeparture;

  user; // User - the one who wants a ride
  pendingRide; // Ride - if the request is linked to a desired ride
}

export default RequestModel;
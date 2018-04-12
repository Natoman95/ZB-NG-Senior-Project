/**
 * Contains data on rides which may be offers or rides
 */
class RequestModel {
  constructor(requesterUsername, origin, destination, earliestDeparture, latestDeparture, passengerNote) {
    this.requesterUsername = requesterUsername;
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

  requesterUsername; // Username - the one who wants a ride
  pendingRide; // Ride - if the request is linked to a desired ride
}

export default RequestModel;
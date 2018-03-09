import UserModel from './user-model';
import RideModel from './ride-model';

/**
 * Contains data on rides which may be offers or rides
 */
class RequestModel {
  public source: string;
  public destination: string;

  public dateMin: string;
  public dateMax: string;

  public user: UserModel; // The user who wants a ride
  public pendingRide: RideModel; // If the request is linked to a desired ride

  public constructor(source: string, destination: string, dateMin: string, dateMax: string, user: UserModel) {
    this.source = source;
    this.destination = destination;
    this.dateMin = dateMin;
    this.dateMax = dateMax;
    this.user = user;
  }
}

export default RequestModel;
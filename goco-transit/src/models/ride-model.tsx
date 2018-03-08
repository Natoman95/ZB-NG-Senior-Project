import UserModel from './user-model';
import RequestModel from './request-model';

/**
 * Contains data on rides which may be offers or rides
 */
class RideModel {
  public source: string;
  public destination: string;

  public date: string;

  public driver: UserModel; // The driver for the ride
  public passengers: Array<UserModel>; // Any users who are part of the ride
  public maxCapacity: number; // The number of seats available when the ride offer is created 
  public pendingRequests: Array<RequestModel>; // Requests from users who wish to join the ride

  public constructor(source: string, destination: string, date: string, driver: UserModel) {
    this.source = source;
    this.destination = destination;
    this.date = date;
    this.driver = driver;
  }

  // Determine whether a user is in the list of passengers
  public isUserAPassenger = (user: UserModel): Boolean => {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i] === user) {
        return true;
      }
    }
    return false;
  }
}

export default RideModel;
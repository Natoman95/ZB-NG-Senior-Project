import RequestModel from './request-model';
import RideModel from './ride-model';

/**
 * Contains data on a user
 */
class UserModel {
  public firstName: string;
  public lastName: string;
  public email: string;
  public userName: string;
  public phoneNum: string;
  public profilePhoto: string;

  public requests: Array<RequestModel>; // Requests for rides
  public confirmedRides: Array<RideModel>; // Rides on which the user is a confirmed passenger
  public offeredRides: Array<RideModel>; // Rides which the user has offered to other passengers

  public constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = (email.split('@'))[0]; // Username is just the user's email without the @gordon.edu
  }
}

export default UserModel;
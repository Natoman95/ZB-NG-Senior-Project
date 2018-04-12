/**
 * Contains data on a user
 */
class UserModel {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = (email.split("@"))[0];
  }

  firstName;
  lastName;
  email;
  username;
  phoneNum;
  profilePhoto;

  requests = []; // Requests
  confirmedRides = []; // Rides
  offeredRides = []; // Rides
}

export default UserModel;
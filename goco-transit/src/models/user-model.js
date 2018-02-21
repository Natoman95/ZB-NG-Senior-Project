/**
 * Contains data on a user
 */
class UserModel {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  firstName;
  lastName;
  email;
  phoneNum;
  profilePhoto;

  requests = []; // Requests
  rides = [] // Rides
  offers = []; // Rides
}

export default UserModel;
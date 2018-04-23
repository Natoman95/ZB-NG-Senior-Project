/**
 * This represents a user who logs into the app
 * It contains their contact information and a picture of them
 * 
 * This data does not directly represent a model on the server
 * We make multiple server calls which gather data from several tables and
 * then we use only some of the data returned by 360's API
 * We didn't create our own endpoint or model because it would have
 * involved recreating a bunch of complex code that 360 uses to fetch
 * contact information
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
  
}

export default UserModel;
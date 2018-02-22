import ZachPhoto from '../images/user_profile_zach.jpg';

// Services
import { get } from '../services/http-service';

// Models
import UserModel from "../models/user-model";
import RideModel from "../models/ride-model";
import RequestModel from "../models/request-model";

/**
 * This class is responsible for all actions related to users
 */

/**
 * Get the current user
 * @return {UserModel} Current user
 */
const getUser = () => {
  // Hardcoded for now - will retrieve from 360
  let activeUser = new UserModel("Zach", "Brown", "zach.brown@gordon.edu");
  activeUser.profilePhoto = ZachPhoto;

  // Dummy requests
  let request1 = new RequestModel("Wenham", "Pittsburgh", "12/7/2017", "12/8/2017", activeUser);
  let request2 = new RequestModel("Manchester", "Wenham", "1/16/2018", "1/18/2018", activeUser);

  activeUser.requests = [
    request1,
    request2
  ];

  // Dummy users for rides and offers
  let Rachel = new UserModel("Rachel", "Wonko", "rachel.wonko@gordon.edu");
  let Jim = new UserModel("Jim", "Bob", "jim.bob@gordon.edu");

  // Dummy rides
  let confirmedRide1 = new RideModel("Manchester", "Wenham", "4/16/2018", Jim);

  activeUser.confirmedRides = [confirmedRide1];

  // Dummy ride offers
  let offeredRide1 = new RideModel("Boston", "Wenham", "3/8/2018", activeUser);
  offeredRide1.passengers = [Rachel];
  offeredRide1.maxCapacity = 4;

  let offeredRide2 = new RideModel("Wenham", "Danvers", "2/14/2018", activeUser);
  offeredRide2.passengers = [Rachel, Jim];
  offeredRide2.maxCapacity = 6;

  activeUser.offeredRides = [
    offeredRide1,
    offeredRide2
  ];

  return activeUser;
}

/**
 * Get user profile info for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<StaffProfileInfo|StudentProfileInfo>} Profile info
 */
const getProfile = username => {
  let profile;
  if (username) {
    profile = get(`profiles/${username}/`);
  } else {
    profile = get('profiles');
  }
  return profile;
};

/**
 * Get image for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<String>} Image as a Base64-encoded string
 */
const getImage = username => {
  if (username) {
    return get(`profiles/Image/${username}`);
  }

  return get('profiles/Image');
};

export { getUser, getProfile, getImage };
// Models
import UserModel from "../models/user-model";
import RideModel from "../models/ride-model";
import RequestModel from "../models/request-model";

// Services
import { getItem, setItem, isCachedDataExpired } from "../services/storage-service";
import { get } from '../services/http-service';

/**
 * This class is responsible for all actions related to users
 */

/**
 * Get the current user
 * @return {UserModel}
 */
const getUser = async () => {
  let username = getItem('username');
  let activeUser = null;

  // Fetching data from 360 if it hasn't been cached
  if (isCachedDataExpired(username)) {
    let user360data = await Promise.all([getUser360Profile(username), getUser360Image(username)])
    let profile = user360data[0]
    let image = user360data[1];

    // Populating user with 360 data
    activeUser = new UserModel(profile.FirstName, profile.LastName, profile.Email);
    activeUser.phoneNum = profile.MobilePhone;
    activeUser.profilePhoto = image;

    // Dummy requests
    let request1 = new RequestModel(activeUser.username, "Wenham", "Pittsburgh", "2017-12-07T08:30", "2017-12-07T20:30", "Take me to church.");
    let request2 = new RequestModel(activeUser.username, "Manchester", "Wenham", "2018-01-16T13:45", "2018-01-18T10:15", "I call shotgun.");

    activeUser.requests = [
      request1,
      request2
    ];

    // Dummy users for rides and offers
    let Rachel = new UserModel("Rachel", "Wonko", "rachel.wonko@gordon.edu");
    let Jim = new UserModel("Jim", "Bob", "jim.bob@gordon.edu");

    // Dummy rides
    let confirmedRide1 = new RideModel(Jim.username, "Manchester", "Wenham", "2018-04-16", "07:30", 2, "Let's ride.");

    activeUser.confirmedRides = [confirmedRide1];

  // Dummy ride offers
  let offeredRide1 = new RideModel(activeUser.username, "Boston", "Wenham", "2018-03-08", "18:15", 1); // No note
  offeredRide1.passengers = [Rachel];
  offeredRide1.maxCapacity = 4;
  offeredRide1.id = "000001";

  let offeredRide2 = new RideModel(activeUser.username, "Wenham", "Danvers", "2018-02-18", "22:00", 3, "Cars 2 was the best.");
  offeredRide2.passengers = [Rachel, Jim];  
  offeredRide2.maxCapacity = 6;
  offeredRide2.id = "000002";

    activeUser.offeredRides = [
      offeredRide1,
      offeredRide2
    ];

    // Cache user data
    setItem(username, activeUser);
  }
  // If it has been cached already, just retrieve it
  else {
    activeUser = getItem(username);
  }

  return activeUser;
}

/**
 * Get user profile info for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise} Profile info
 */
const getUser360Profile = username => {
  if (username) {
    return get(`profiles/${username}/`);
  }
  return get('profiles');
};

/**
 * Get image for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<String>} Image as a Base64-encoded string
 */
const getUser360Image = username => {
  if (username) {
    return get(`profiles/Image/${username}/`);
  }

  return get('profiles/Image');
};

export { getUser };
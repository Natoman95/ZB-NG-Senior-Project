// Models
import UserModel from "../models/user-model";

// Services
import { getItem, setItem, isCachedDataExpired } from "../services/storage-service";
import { get } from '../services/http-service';

/* This class is responsible for all actions related to users */

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
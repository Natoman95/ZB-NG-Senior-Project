// Models
import UserModel from "../models/user-model";

// Services
import { getItem, setItem, isCachedDataExpired } from "../services/storage-service";
import { get } from '../services/http-service';

/**
 * This service is responsible for fetching a user's contact information
 * and placing it into a user model
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
    let userData = await Promise.all([getUserProfile(username), getUserImage(username)])
    let profile = userData[0]
    let image = userData[1];

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
const getUserProfile = (username) => {
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
const getUserImage = async (username) => {
  if (username) {
    let rawImage = await get(`profiles/image/${username}/`);
    return 'data:image/png;base64,' + (rawImage).def;
  }

  return get('profiles/image');
};

const getUserFullName = (username) => {
  let firstName = username.split(".")[0];
  let lastName = username.split(".")[1];
  let fullName = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return fullName;
}

export { getUser, getUserImage, getUserFullName };
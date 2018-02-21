import UserModel from "../models/user-model";
import RideModel from "../models/ride-model";
import RequestModel from "../models/request-model";
import ZachPhoto from '../images/user_profile_zach.jpg'

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
  let ride1 = new RideModel("Manchester", "Wenham", "4/16/2018", Jim);

  activeUser.rides = [ride1];

  // Dummy offers
  let offer1 = new RideModel("Boston", "Wenham", "3/8/2018", activeUser);
  offer1.passengers = [Rachel];

  let offer2 = new RideModel("Wenham", "Danvers", "2/14/2018", activeUser);
  offer1.passengers = [Rachel, Jim];

  activeUser.offers = [
    offer1,
    offer2
  ];

  return activeUser;
}

export { getUser };
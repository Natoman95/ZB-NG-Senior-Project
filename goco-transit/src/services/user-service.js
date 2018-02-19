import UserModel from "../models/user-model";
import RideModel from "../models/ride-model";

/**
 * This class is responsible for all actions related to users
 */

/**
 * Get the current user
 * @return {UserModel} Current user
 */
const getUser = () => {
  // Hardcoded for now - will retrieve from 360
  let activeUser = new UserModel("Zach", "Brown", "zach.brown@gordon.edu", 1);

  let Rachel = new UserModel("Rachel", "Wonko", "rachel.wonko@gordon.edu", 2);
  let Jim = new UserModel("Jim", "Bob", "jim.bob@gordon.edu");

  // Dummy requests
  let ride1 = new RideModel("Wenham", "Pittsburgh", "12/7/2017", "12/19/2017", "Nathan");
  ride1.passengers = [Rachel, activeUser];

  let ride2 = new RideModel("Manchester", "Wenham", "1/16/2018", "1/18/2018", "Zach");
  ride2.passengers = [Jim];

  activeUser.requests = [
    ride1,
    ride2
  ];

  return activeUser;
}

export { getUser };
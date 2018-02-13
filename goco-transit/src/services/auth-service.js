import { getItem, setItem, removeItem } from "./storage-service";

// This class is responsible for all actions related to user authentication

// A fake login token for now
const dummyToken = "dummy";

// Login the user by storing an auth token in local storage
function authenticate(userName, password) {
  setItem('token', dummyToken);
}

// Clear the auth token and log the user out
function signOut() {
  removeItem('token');
}

// Check to see if the user is authenticated
function isAuthenticated() {
  let authStatus = false;
  let token = getItem('token');
  if (token !== null && typeof token !== 'undefined') {
    authStatus = true;
  }
  return authStatus;
}

export { authenticate, signOut, isAuthenticated };
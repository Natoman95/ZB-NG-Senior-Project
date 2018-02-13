import { getItem, setItem, removeItem } from "./storage-service";

const dummyToken = "dummy";

function authenticate(userName, password) {
  setItem('token', dummyToken);
}

function signOut() {
  removeItem('token');
}

function isAuthenticated() {
  let authStatus = false;
  let token = getItem('token');
  if (token !== null && typeof token !== 'undefined') {
    authStatus = true;
  }
  return authStatus;
}

export { authenticate, signOut, isAuthenticated };
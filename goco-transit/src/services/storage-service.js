
function storageIsDefined() {
  let isDefined = false;
  if (typeof window !== 'undefined') {
    isDefined = true;
  }
  return isDefined;
}

function getItem(key) {
  let item = null;
  if (storageIsDefined()) {
    item = window.localStorage.getItem(key);
  }
  return item;
}

function setItem(key, value) {
  if (storageIsDefined()) {
    window.localStorage.setItem(key, value);
  }
}

function removeItem(key) {
  if (storageIsDefined()) {
    window.localStorage.removeItem(key);
  }
}

export { getItem, setItem, removeItem };
const masterKey = "todo-timers-app";

export function saveTimer(key, dict) {
  loadDict().then((currentData) => {
    currentData[key] = dict;
    chrome.storage.local.set({ [masterKey]: currentData });
  });
}

export function loadDict() {
  return new Promise((resolve) => {
    chrome.storage.local.get(masterKey, (result) => {
      const retrievedDict = result[masterKey] || {};
      resolve(retrievedDict);
    });
  });
}

export function loadTimer(privateName) {
  return loadDict().then((currentData) => {
    return currentData[privateName];
  });
}

export function deleteDict(key) {
  loadDict().then((currentData) => {
    delete currentData[key];
    chrome.storage.local.set({ [masterKey]: currentData });
  });
}

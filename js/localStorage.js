const masterKey = "todo-timers-app";

export function saveTimer(key, dict) {
  let currentData = loadDict();
  currentData[key] = dict;
  localStorage.setItem(masterKey, JSON.stringify(currentData));
}

export function loadDict() {
  let retrievedDict =
    JSON.parse(localStorage.getItem(masterKey)) === null
      ? {}
      : JSON.parse(localStorage.getItem(masterKey));

  return retrievedDict;
}

export function loadTimer(privateName) {
  let currentData = loadDict();
  return currentData[privateName];
}

export function deleteDict(key) {
  let currentData = loadDict();
  delete currentData[key];
  localStorage.setItem(masterKey, JSON.stringify(currentData));
}

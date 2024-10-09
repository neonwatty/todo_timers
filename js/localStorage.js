const masterKey = "todo-timers-app";

export function saveDict(key, dict) {
  let currentData = loadDict();
  console.log(currentData);
  currentData[key] = dict;
  localStorage.setItem(masterKey, JSON.stringify(currentData));
}

export function loadDict() {
  let retrievedDict =
    JSON.parse(localStorage.getItem(masterKey)) === null
      ? {}
      : JSON.parse(localStorage.getItem(masterKey));

  console.log(retrievedDict);
  return retrievedDict;
}

export function deleteDict(key) {
  let currentData = loadDict();
  delete currentData[key];
  localStorage.setItem(masterKey, JSON.stringify(currentData));
}

export function saveDict(key, dict) {
  localStorage.setItem(key, value);
  localStorage.setItem(key, JSON.stringify(dict));
}

export function loadDict(key) {
  const retrievedDict = JSON.parse(localStorage.getItem(key));
  return retrievedDict;
}

export function deleteDict(key) {
  localStorage.removeItem(key);
}

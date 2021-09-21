const getKey = key => {
  const storage = JSON.parse(localStorage.getItem(key));
  return storage;
}

const setKey = (key, value) => {
  const storage = localStorage.setItem(key, JSON.stringify(value));
  return storage;
}

export { getKey, setKey }

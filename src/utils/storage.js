// storage.js

const storage = {
    get: (key, callback) => {
      const value = localStorage.getItem(key);
      callback({ [key]: value });
    },
    set: (data, callback) => {
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });
      if (callback) callback();
    }
  };
  
  export default storage;
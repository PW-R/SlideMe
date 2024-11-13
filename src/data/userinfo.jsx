// src/data/userinfo.js

let userInfo = {};

export const setUserInfo = (info) => {
  userInfo = { ...userInfo, ...info }; // Merge the new info with the existing data
};

export const getUserInfo = () => userInfo; // Return the stored user info

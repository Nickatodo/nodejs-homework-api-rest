const registerUser = require("./registerUser");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const renovateSub = require("./renovateSub");
const updateAvatarUser = require("./updateAvatarUser");
const verification = require("./verification");
const resendVerify = require("./resendVerify");

module.exports = {
  registerUser,
  login,
  logout,
  current,
  renovateSub,
  updateAvatarUser,
  verification,
  resendVerify,
};

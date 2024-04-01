const { ALLOWED_USER_IDS } = require("./config");

const checkUserAllowed = (userId, success, error) => {
  if (ALLOWED_USER_IDS.includes(userId)) {
    success();
  } else {
    error();
  }
};

module.exports = {
  checkUserAllowed
};

const { ALLOWED_USER_IDS, DATE_FORMAT } = require("./config");

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

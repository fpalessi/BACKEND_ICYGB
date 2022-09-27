const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // do not pass sensitive info (jwt.io is public), id is perfect
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };

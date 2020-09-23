const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  
    
    if (!req.session.loggedInUser) {
      return res.status(401).json({
        message: "Unauthorized user",
        code: 401,
      });
    } else {next()}
    
  
};

module.exports = {
  isLoggedIn,
};

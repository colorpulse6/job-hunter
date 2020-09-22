const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.token;
    console.log(req.cookies.token)
   console.log("Token inside verify: " + jwtToken)
    if (!jwtToken) {
      return res.status(401).json({
        message: "Unauthorized user",
        code: 401,
      });
    }
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  isLoggedIn,
};

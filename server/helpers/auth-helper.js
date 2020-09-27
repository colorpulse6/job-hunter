require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  
    if(req.session.loggedInUser) await next()
    
    else {
      return res.status(401).json({
        message: "Unauthorized user",
        code: 401,
      });
    } 
    
  
};

module.exports = {
  isLoggedIn,
};

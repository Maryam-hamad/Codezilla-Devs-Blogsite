const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/userModel"); 


const protect = async (req, res, next) => {
  
  let token;

  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
    
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decodedUser.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

     next();

    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token invalid",
      });
    }
  }

   if(!token)return res.status(401).json({ message: "Access denied, no token" });
};

module.exports = protect;
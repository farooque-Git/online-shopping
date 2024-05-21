const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      // Find user by ID in the decoded token and exclude password field
      req.user = await User.findById(decoded.id).select("-password");

      // Call next middleware
      return next();
    } catch (error) {
      console.error(error);
      // Return 401 status with error message if token verification fails
      return res
        .status(401)
        .json({ message: "Not authorized, failed token verification" });
    }
  }

  // Return 401 status with error message if no token is provided
  return res.status(401).json({ message: "Not authorized, no token provided" });
});

module.exports = { protect };

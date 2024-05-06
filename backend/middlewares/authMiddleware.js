const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      console.log(decode);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized failed token");
    }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no Token");
  }
});

module.exports = { protect };

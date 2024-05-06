const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// user registration
router.route("/").post(registerUser);

//post email and pass auth POSTMAN
router.post("/login", authController);

// get user profile private route POSTMAN
router.route("/profile").get(protect, getUserProfile);

module.exports = router;

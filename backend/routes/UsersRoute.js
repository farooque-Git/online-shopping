const express = require("express");
const { authController, getUserProfile } = require("../controllers/userController");

const router = express.Router();

//post email and pass auth
router.post("/login", authController);

// get user profile private route
router.route("/profile").get(getUserProfile);

module.exports = router;

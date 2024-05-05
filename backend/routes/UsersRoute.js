const express = require("express");
const { authController } = require("../controllers/userController");

const router = express.Router();

//post email and pass auth
router.post("/login", authController);

// post private

module.exports = router;

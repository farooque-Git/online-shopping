const express = require("express");
const {
  getProducts,
  getProduct,
} = require("../controllers/productsController");

const router = express.Router();


// Route to get all products
// router.get("/products", getProducts); NOT A GOOD PRACTICE
router.route("/products").get(getProducts);

// Route to get a specific product by ID
// router.get("/products/:id");
router.route("/products/:id").get(getProduct);

module.exports = router;

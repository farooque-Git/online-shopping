const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const router = express.Router();

// Route to get all products
router.get(
  "/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // throw new error ("some error")
    res.json(products);
  })
);

// Route to get a specific product by ID
router.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    try {
      console.log("Request params:", req.params);
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product Not FOUND!!" });
      }
    } catch (error) {
      // Handle any errors that occur during the database query
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

module.exports = router;

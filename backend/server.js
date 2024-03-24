const express = require("express");
const products = require("./data/Product");
const dotenv = require("dotenv");
const app = express();

// dotenv config
dotenv.config();

app.get("/", (req, res) => {
  res.send("<h1> Node Server</h1>");
});

// Route to get all products
app.get("/Products", (req, res) => {
  res.json(products);
});

// Route to get a specific product by ID
app.get("/Products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

// Start the server
const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server running in $(process.env.NODE_ENV) Mode on Port ${process.env.PORT} `
  );
});

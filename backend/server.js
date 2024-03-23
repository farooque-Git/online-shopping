const express = require("express");
const products = require("./data/Product");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1> Node Server</h1>");
});

// another route
app.get("/Products", (req, res) => {
  res.json(products);
});

app.get("/Products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

app.listen(8080, () => {
  console.log(" Server is on backend server");
});

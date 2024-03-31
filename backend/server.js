const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const productRoutes = require("./routes/productRoute");
const { errorHandler } = require("./middlewares/errorMiddleware");

// dotenv config
dotenv.config();

// connecting to database mongoDB
connectDb();

const app = express();

app.get("/", (req, res) => {
  res.send("<h1> This is Node Server</h1>");
});

app.use("/api", productRoutes);
// error handling middleware for other errors
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// // Route to get all products
// app.get("/Products", (req, res) => {
//   res.json(products);
// });

// // Route to get a specific product by ID
// app.get("/Products/:id", (req, res) => {
//   const product = products.find((prod) => prod._id === req.params.id);
//   res.json(product);
// });

// Start the server
const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server running in $(process.env.NODE_ENV) Mode on Port ${process.env.PORT} `
  );
});

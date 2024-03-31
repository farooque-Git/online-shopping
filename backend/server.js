const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const productRoutes = require("./routes/productRoute");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

// Route to serve API requests for products
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(errorHandler);

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

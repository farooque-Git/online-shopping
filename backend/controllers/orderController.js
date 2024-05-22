const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

// Helper function to convert price strings to numbers
const parsePrice = (price) => {
  if (typeof price === "string") {
    // Remove any non-numeric characters except the decimal point
    const numericPrice = price.replace(/[^0-9.]/g, "");
    return parseFloat(numericPrice);
  }
  return price;
};

// Add a new order item
const addOrderItem = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Check if there are any order items
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No Order Items Found");
    }

    // Preprocess orderItems prices
    const processedOrderItems = orderItems.map((item) => ({
      ...item,
      price: parsePrice(item.price),
    }));

    // Create a new order instance with the processed data
    const order = new Order({
      orderItems: processedOrderItems,
      user: req.user._id, // Set the user to the currently authenticated user
      shippingAddress,
      paymentMethod,
      itemsPrice: parsePrice(itemsPrice),
      taxPrice: parsePrice(taxPrice),
      shippingPrice: parsePrice(shippingPrice),
      totalPrice: parsePrice(totalPrice),
    });

    // Save the order to the database
    const createdOrder = await order.save();
    // Return the created order with a status of 201 (Created)
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Internal Server Error status code
  }
});

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      // If the order exists, return it as JSON
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Internal Server Error status code
  }
});

// Update an order to paid status
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Update order fields to reflect payment
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      // Save the updated order to the database
      const updatedOrder = await order.save();
      // Return the updated order
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Internal Server Error status code
  }
});

// Get orders of the authenticated user
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    // Find all orders for the authenticated user
    const orders = await Order.find({ user: req.user._id });
    // Return the user's orders as JSON
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Internal Server Error status code
  }
});

module.exports = { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders };

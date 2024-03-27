const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongDB connected ${conn.connection.host}`);
  } catch (error) {}
};

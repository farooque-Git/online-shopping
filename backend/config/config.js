const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      //   useFindAndModify: false,
    });
    console.log(`MongDB connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    // This line terminates the Nodejs process with an exit code of 1
    // if there's an error during database connection.
    process.exit(1);
  }
};

module.exports = connectDb;

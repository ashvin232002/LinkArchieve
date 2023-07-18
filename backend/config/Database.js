const mongoose = require("mongoose");

//importing the .env 
require("dotenv").config();


exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection SuccessFull");
    })
    .catch((error) => {
      console.log("Error While Connecting To DB");
      console.error(error);
      process.exit(1);
    });
};

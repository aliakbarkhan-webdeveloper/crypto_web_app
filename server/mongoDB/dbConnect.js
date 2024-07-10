const mongoose = require("mongoose");
// const { CONNECTION_STRINGS } = require("../config/config.js");
const CONNECTION_STRINGS = "mongodb://localhost:27017";
const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(CONNECTION_STRINGS);
    console.log(`Data_BASE is connected`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;

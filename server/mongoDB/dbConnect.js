const mongoose = require("mongoose");
// const { CONNECTION_STRING } = require("../config/config.js");
const CONNECTION_STRING="mongodb://localhost:27017";
const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    let connected = await mongoose.connect(CONNECTION_STRING);
    console.log(
      `Data_BASE is connected at: ${connected.connection.host + " of mongooDB"}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;

const express = require("express");
const app = express();
const { PORT } = require("./config/config.js");
const dbConnect = require("./mongoDB/dbConnect.js");
const userRoute = require("./routes/user.route.js");
const errorHandler = require("./middleware/errorHandler.middle.js");

app.use(express.json());
app.use(userRoute);
dbConnect();

//error middleware should be used at the end
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`port is working at: ${PORT}`);
});






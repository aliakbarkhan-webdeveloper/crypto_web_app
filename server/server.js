const express = require("express");
const app = express();
const { PORT } = require("./config/config.js");
const dbConnect = require("./mongoDB/dbConnect.js");
const userRoute = require("./routes/user.route.js");
const errorHandler = require("./middleware/errorHandler.middle.js");
//importing cookie-parsr and use as a middleware so we can send token inside cookies
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(userRoute);
dbConnect();


//error middleware should be used at the end
app.use(errorHandler);

app.listen(4000, () => {
  console.log(`port is working at:${PORT}`);
});

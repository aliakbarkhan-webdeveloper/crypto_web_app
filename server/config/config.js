const dtenv = require("dotenv");
dtenv.config();

const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const SECRET_KEY_ACCESS_TOKEN = process.env.SECRET_KEY_ACCESS_TOKEN;
const SECRET_KEY_REFRESH_TOKEN = process.env.SECRET_KEY_REFRESH_TOKEN;
module.exports = {
  PORT,
  CONNECTION_STRING,
  SECRET_KEY_ACCESS_TOKEN,
  SECRET_KEY_REFRESH_TOKEN,
};

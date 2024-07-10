const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_STRINGS = process.env.CONNECTION_STRING;
const SECRET_KEY_ACCESS_TOKENS = process.env.SECRET_KEY_ACCESS_TOKEN;
const SECRET_KEY_REFRESH_TOKENS = process.env.SECRET_KEY_REFRESH_TOKEN;
module.exports = {
  PORT,
  CONNECTION_STRINGS,
  SECRET_KEY_ACCESS_TOKENS,
  SECRET_KEY_REFRESH_TOKENS,
};
 
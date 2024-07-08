const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//importing Model to Store Refresh token
const {
  SECRET_KEY_ACCESS_TOKEN,
  SECRET_KEY_REFRESH_TOKEN,
} = require("../config/config.js");
//node pkg crypto install for generating secret key or use any online tool

class JWTService {
  //sign/create tokken
  signAccessToken(payload, expiresTime) {
    jwt.sign(payload, SECRET_KEY_ACCESS_TOKEN, { expiresIn: expiresTime });
  }
  //sign/create refresh tokken
  signRefreshToken(payload, expiresTime) {
    jwt.sign(payload, SECRET_KEY_REFRESH_TOKEN, { expiresIn: expiresTime });
  }
  //verify access token
  verifyAccessToken(token) {
    return jwt.verify(token, SECRET_KEY_ACCESS_TOKEN);
  }
  //verify refresh token
  verifyRefreshToken(token) {
    return jwt.verify(token, SECRET_KEY_REFRESH_TOKEN);
  }
  //store refresh token
}

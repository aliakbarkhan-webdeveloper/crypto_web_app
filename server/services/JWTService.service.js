const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//node pkg crypto install for generating secret key
class JWTService {
  //sign/create tokken
  signAccessToken(payload, expiresTime, secretKey) {
    jwt.sign(payload, secretKey, { expiresIn: expiresTime });
  }
  //sign/create refresh tokken
  signRefreshToken(payload, expiresTime, secretKey) {
    jwt.sign(payload, secretKey, { expiresIn: expiresTime });
  }
  //verify access token
  //verify refresh token
  //store refresh token
}

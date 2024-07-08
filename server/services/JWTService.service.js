const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//node pkg crypto install for generating secret key or use any online tool
const SECRET_KEY_ACCESS_TOKEN="1683ad8fbbffa32j9293u8n311340aleu2392kjaln4jwk82hksd8akaldjff0asdjajw3lajskndna77ad7s7da9aasfa6asa94232"
class JWTService {
  //sign/create tokken
  signAccessToken(payload, expiresTime, secretKey=SECRET_KEY_ACCESS_TOKEN) {
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

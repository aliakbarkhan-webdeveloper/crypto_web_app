const jwt = require("jsonwebtoken");
//importing Model to Store Refresh token
const refreshTokenModel = require("../models/token.model.js");
const { SECRET_KEY_ACCESS_TOKENS,SECRET_KEY_REFRESH_TOKENS } = require("../config/config.js");

// const SECRET_KEY_ACCESS_TOKENS="8648b97e722f0d440a1604d6cedc2487c7db4f65b12db8bdf4a568c3680960fbea5836f62fe9319f8eb3772dfeb751ca75f248f7b34fb3bca2ea27be9c6a4e39";
// const SECRET_KEY_REFRESH_TOKENS="486d71e848aefb0afed16a5c425d710d8dfbfedea7bc5eaa4cd2844635d6d84c718365e802dd7c1ae687e9283cf69f28be51b67a9ce870c6815ccee7ef0978dd";

class JWTService {
  //sign/create tokken
  //note make methods as static so we should not make new object each time for using methods
  signAccessToken(payload, expiresTime) {
    return jwt.sign(payload, SECRET_KEY_ACCESS_TOKENS, {
      expiresIn: expiresTime,
    });
  }
  //sign/create refresh tokken
  signRefreshToken(payload, expiresTime) {
    return jwt.sign(payload, SECRET_KEY_REFRESH_TOKENS, {
      expiresIn: expiresTime,
    });
  }
  //verify access token
  verifyAccessToken(token) {
    return jwt.verify(token, SECRET_KEY_ACCESS_TOKENS);
  }
  //verify refresh token
  verifyRefreshToken(token) {
    return jwt.verify(token, SECRET_KEY_REFRESH_TOKENS);
  }
  //store refresh token
  async refreshSave(token, userid) {
    try {
      const newToken = new refreshTokenModel({
        token: token,
        userId: userid,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JWTService;

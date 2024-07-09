const jwt = require("jsonwebtoken");
//importing Model to Store Refresh token
const refreshTokenModel = require("../models/token.model.js");
const {
  SECRET_KEY_ACCESS_TOKEN,
  SECRET_KEY_REFRESH_TOKEN,
} = require("../config/config.js");
let a="8648b97e722f0d440a1604d6cedc2487c7db4f65b12db8bdf4a568c3680960fbea5836f62fe9319f8eb3772dfeb751ca75f248f7b34fb3bca2ea27be9c6a4e39"
let b="486d71e848aefb0afed16a5c425d710d8dfbfedea7bc5eaa4cd2844635d6d84c718365e802dd7c1ae687e9283cf69f28be51b67a9ce870c6815ccee7ef0978dd"

class JWTService {
  //sign/create tokken
  //note make methods as static so we should not make new object each time for using methods
  static signAccessToken(payload, expiresTime) {
    jwt.sign(payload,a,{ expiresIn: expiresTime });
  }
  //sign/create refresh tokken
  static signRefreshToken(payload, expiresTime) {
    jwt.sign(payload, b, { expiresIn: expiresTime });
  }
  //verify access token
  static verifyAccessToken(token) {
    return jwt.verify(token, a);
  }
  //verify refresh token
  static verifyRefreshToken(token) {
    return jwt.verify(token, b);
  }
  //store refresh token
  static async refreshSave(token, userId) {
    try {
      const newToken = new refreshTokenModel({
        token: token,
        userId: userId,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JWTService;

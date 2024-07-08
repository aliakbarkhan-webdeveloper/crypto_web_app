const jwt = require("jsonwebtoken");
//importing Model to Store Refresh token
const refreshTokenModel = require("../models/token.model.js");
const {
  SECRET_KEY_ACCESS_TOKEN,
  SECRET_KEY_REFRESH_TOKEN,
} = require("../config/config.js");
//node pkg crypto install for generating secret key or use any online tool

class JWTService {
  //sign/create tokken
  //note make methods as static so we should not make new object each time for using methods
  static signAccessToken(payload, expiresTime) {
    jwt.sign(payload, SECRET_KEY_ACCESS_TOKEN, { expiresIn: expiresTime });
  }
  //sign/create refresh tokken
  static signRefreshToken(payload, expiresTime) {
    jwt.sign(payload, SECRET_KEY_REFRESH_TOKEN, { expiresIn: expiresTime });
  }
  //verify access token
  static verifyAccessToken(token) {
    return jwt.verify(token, SECRET_KEY_ACCESS_TOKEN);
  }
  //verify refresh token
  static verifyRefreshToken(token) {
    return jwt.verify(token, SECRET_KEY_REFRESH_TOKEN);
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

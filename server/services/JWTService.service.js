const jwt = require("jsonwebtoken");
//importing Model to Store Refresh token
const refreshTokenModel = require("../models/token.model.js");
const { SECRET_KEY_ACCESS_TOKEN } = require("../config/config.js");
const { SECRET_KEY_REFRESH_TOKEN } = require("../config/config.js");

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
  static verifyAccessToken(Token) {
    return jwt.verify(Token, SECRET_KEY_ACCESS_TOKEN);
  }
  //verify refresh token
  static verifyRefreshToken(Token) {
    return jwt.verify(Token, SECRET_KEY_REFRESH_TOKEN);
  }
  //store refresh token
  static async refreshSave(Token, userId) {
    try {
      const newToken = new refreshTokenModel({
        token: Token,
        userId: userId,
      });
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JWTService;

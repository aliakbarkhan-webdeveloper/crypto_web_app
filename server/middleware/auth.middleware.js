const jwtService = require("../services/JWTService.service");
const User = require("../models/user.model.js");
const DTO = require("../DTO/user.dto.js");
const auth = async (req, res, next) => {
  try {
    //validating refresh and access token
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }

    let _id;
    const JWTService = new jwtService();
    try {
      _id = JWTService.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }

    //validating user
    let user;
    try {
      user = await User.findOne({ _id: _id });
    } catch (error) {
      return next(error);
    }
    let userDTO = new DTO(user);
    req.user = userDTO;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;

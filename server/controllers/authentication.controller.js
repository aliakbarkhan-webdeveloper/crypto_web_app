const Joi = require("joi");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const userDTO = require("../DTO/user.dto.js");
const jwtService = require("../services/JWTService.service.js");
const refreshModel = require("../models/token.model.js");
const refreshTokenModel = require("../models/token.model.js");
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

//Controller for Registeration of user
const registerController = async (req, res, next) => {
  //Steps in user Registration
  // 1: validate user input  =>note user validation can be done manually or with library
  //we will use joe package to valide inputs

  const userRegisterSchema = Joi.object({
    username: Joi.string().min(4).max(25).required(),
    name: Joi.string().max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordPattern).required(),
    confirmPassword: Joi.ref("password"), //it refer the above passwrod field to match
  });

  const { error } = userRegisterSchema.validate(req.body); //take data from user and store error if exist

  // 2: if error in validation then send error via error handeling file
  if (error) {
    // in server js file it will call error handler middleware dur to use of next
    return next(error);
  }

  // 3:if data already exist then send error
  const { username, name, email, password, confirmPassword } = req.body;
  try {
    let emailUsed = await User.exists({ email }); //exist({}) is mongoose query to check if value exist
    let userExist = await User.exists({ username });

    if (userExist) {
      //when we used next call other middleware
      let error = {
        status: 409,
        message: "userName is already taken",
      };
      return next(error);
    }
    if (emailUsed) {
      let error = { status: 409, message: "email registered" };
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
  // 4: Password hashing => means encrypt password
  //we will use bcrypt js for hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5:store data in DB
  let accessToken;
  let refreshToken;
  let user;
  const JWTService = new jwtService();
  try {
    const userRegister = new User({
      username,
      name,
      email,
      password: hashedPassword, // passwill be saved as hashed password
    });
    user = await userRegister.save();

    //Generating tokens

    accessToken = JWTService.signAccessToken({ _id: user._id }, "30m"); //storing payload and time of expiry which will pass into constructor
    refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
  } catch (error) {
    return next(error);
  }

  //saving refresh token in DB
  await JWTService.refreshSave(refreshToken, user._id);

  //sending tokens in cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  }); //maxAge means expiry time of cookie
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  });
  // 6:send Response
  const DTO = new userDTO(user);
  return res.status(201).json({ user: DTO, auth: true });
};
//
//
//
//

//Controller for login the user

const loginController = async (req, res, next) => {
  //steps
  //1: validate user input by creating schema with the help of joi package
  const loginValidationSchema = Joi.object({
    username: Joi.string().min(4).max(25).required(),
    password: Joi.string().pattern(passwordPattern).required(),
  });
  const { error } = loginValidationSchema.validate(req.body);

  //2: if validation error occur return error
  if (error) {
    return next(error);
  }

  //3: match username and password by using mongoDB queries
  const username = req.body.username;
  const password = req.body.password;
  let user;
  try {
    //matching username
    user = await User.findOne({ username });
    if (!user) {
      const error = { status: 401, message: "invalid username or password" };
      //error will go into errorHandler middle ware throug serverjs file bcz of use of next
      return next(error);
    }

    //matcing password after hashing bcz in DB we stored hashed password
    //password is that currently tekken from body and user.password is from DB

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = { status: 401, message: "invalid username or password" };
      //error will go into errorHandler middle ware throug serverjs file bcz of use of next
      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  //4: return response
  //generating refresh and access token and send it while login inside cookies
  const JWTService = new jwtService();
  const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");

  const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");
  //update refresh token in DB
  try {
    await refreshModel.updateOne(
      { _id: user._id },
      { token: refreshToken },
      { upsert: true } //upsert mean if it will found similar data to token and same id then it will update it,if it will not found similar then it will create new
    );
  } catch (error) {
    return next(error);
  }

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  });
  //we we use DTO to send a specific data after filtering the other data
  //we do this bcz we do do not want to send password or other seceret data in response
  const DTO = new userDTO(user);
  return res.status(200).json({ user: DTO, auth: true });
};

//
//
//
//Controller for Logout
const logoutController = async (req, res, next) => {
  //Delete refresh token from DB
  const { refreshToken } = req.cookies;
  try {
    await refreshTokenModel.deleteOne({ token: refreshToken });
  } catch (error) {
    return next(error);
  }
  //Deleting all cookies
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  //send response to user
  res.status(200).json({ user: null, auth: false });
};

const refreshController = async (req, res, next) => {
  //accessing the refreshToken
  const prevRefreshToken = req.cookies.refreshToken;
  //verify refresh token
  let id;
  const JWTService = new jwtService();
  try {
    id = JWTService.verifyRefreshToken(prevRefreshToken)._id;
  } catch (e) {
    const error = {
      status: 401,
      message: "unauthorized",
    };
    return next(error);
  }

  try {
    const verified = await refreshModel.findOne(id);
    if (!verified) {
      const error = {
        status: 401,
        message: "unauthorized",
      };
      return next(error);
    }
  } catch (error) {}
  //generate new refresh token
  try {
    const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
    const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");
    //update DB with new refresh token and update the DB
    await refreshModel.updateOne({ _id: id }, { token: refreshToken });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });
  } catch (error) {
    return next(error);
  }
  let cook=req.cookies;
  if(!cook){
    let error={
      status:401,
      message:"unauthorized"
    }
    return next(error)
  }
  const user = await User.findOne({ _id: id });
  const DTO = new userDTO(user);
  res.status(200).json({ user: DTO, auth: true });
};
module.exports = {
  loginController,
  registerController,
  logoutController,
  refreshController,
};

//const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
/*
^: This symbol indicates the start of the string.
(?=.*[a-z]): This is a positive lookahead assertion. It ensures that the string contains at least one lowercase letter ([a-z]).
(?=.*[A-Z]): Another positive lookahead assertion. It ensures that the string contains at least one uppercase letter ([A-Z]).
(?=.*\d): Yet another positive lookahead assertion. It ensures that the string contains at least one digit (\d).
[a-zA-Z\d]{8,25}: This part specifies the allowed characters and their length. It matches any combination of lowercase letters, uppercase letters, and digits, with a minimum length of 8 characters and a maximum length of 25 characters.
$: This symbol indicates the end of the string.
*/

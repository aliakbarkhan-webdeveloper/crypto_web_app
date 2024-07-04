
const { ValidationError } = require("joi");
const errorHandler = (error, req, res, next) => {
  //temporary Error
  let status = 500;
  let data = { message: "Server Error" };

  //Validation Error coming from joi
  if (error instanceof ValidationError) {
    status = 401;
    data.message = error.message;
    return res.status(status).json(data);
  }

  //if error contains status but not validation error
  if (error.status) {
    status = error.status;
  }

  //if error contains message but not validation error then we will change defaulf message with error message
  if (error.message) {
    data.message = error.message;
  }

  return res.status(status).json(data);
};

module.exports = errorHandler;

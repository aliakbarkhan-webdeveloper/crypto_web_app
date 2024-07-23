const joi = require("joi");
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;
const commentModel = require("../models/comments.model.js");


//controller for comment creation
let commentCreate = async (req, res, next) => {
  const createCommentSchema = joi.object({
    content: joi.string().required(),
    author: joi.string().regex(mongodbIdPattern).required(),
    blog: joi.string().regex(mongodbIdPattern).required(),
  });

  const { error } = createCommentSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { content, author, blog } = req.body;
  try {
    const newComment = new commentModel({
      content,
      author,
      blog,
    });
    await newComment.save();
  } catch (error) {
    return next(error);
  }
  return res.status(201).json({
    message: "comment created",
  });
};
//controller to get all the comments of a commentor
let getById = async (req, res, next) => {



};

modulte.exports = { commentCreate, getById };

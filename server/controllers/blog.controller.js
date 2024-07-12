const joi = require("joi");
const fs = require("fs"); //built-in module in node to save data on disc locally
const {SERVER_PATH}=require("../config/config.js")
const blogModel = require("../models/blog.model.js");
const mongodbPatern = /^[0-9a-fA-F]{24}$/;
const blogCreation = async (req, res, next) => {
  //validate req,body
  const blogSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().regex(mongodbPatern).required(),
    content: joi.string().required(),
    photo: joi.string().required(),
  });
  const { error } = blogSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  //handle photo and storage  , Note: 1st we store photo locally then store the name of photo in DB
  //photoHandeling=>   clientSide->encoded base64 String -> decode -> store -> save PhotoPath in DB
  const { title, author, content, photo } = req.body;
  //reading photo as buffer
  const buffer = Buffer.from(
    photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), //explanation is at the end of the file
    "base64"
  );
  //allot a random name to buffer
  const imagePath = `${Date.now()}-${author}.png`;
  //save locally with fs
  try {
    fs.writeFileSync(`storage/${imagePath}`, buffer); //first argument will be the location of image and second is the our photo in buffer form
  } catch (error) {
    return next(error);
  }

  //save Blog in mongoDb
  try {
    const newBlog=new blogModel({
        title,author,content,imagePath:`${SERVER_PATH}/storage/${imagePath}`
    })
  } catch (error) {
    return next(error)
  }
  //return response
};
const getBlogs = async (req, res, next) => {};
const findBlog = async (req, res, next) => {};
const updateBlog = async (req, res, next) => {};
const deleteBlog = async (req, res, next) => {};

module.exports = { blogCreation, getBlogs, findBlog, updateBlog, deleteBlog };

//joi Schhema, we create this schema so we can get data from from body according to this schema, if we do not create this then it will get all type of fields from body
//every value store in the form of 10010 and this can be read and handle by buffer in node js
//we use buffer to handle base64 format, by reading photo in the form of buffer
//when we handle image with buffer then we replace photo's strinf with an empty string
//data:image  means the meta data of image
//(png|jpg|jpeg);base64; it means the photo is coming any of these format with base 64encoding

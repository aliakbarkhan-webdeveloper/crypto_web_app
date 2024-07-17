const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "Blog" },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports=commentModel;
const mongoose = require("mongoose");
const { Schema } = mongoose;

//name,username,email,password

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },//email contain special string string().email, set in controller or validation logic
    password: { type: String, required: true },//password contain special string, string.pattern
  },
  { timestamps: true }
);

//mongoose.model("model name","Schema name", "collection name")
//ref means some model or field belongs to other model, 
//like comment belong to blog and blog to user
const userModel=mongoose.model("User",userSchema,"users");

module.exports=userModel;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    userid: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const tokenSchema = mongoose.model(
  "RefreshToken",
  refreshTokenSchema,
  "tokens"//create collection of tokens
);
module.exports = refreshTokenSchema;

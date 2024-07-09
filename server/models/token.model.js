const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const refreshTokenModel = mongoose.model(
  "RefreshToken",
  refreshTokenSchema,
  "tokens"//create collection of tokens
);
module.exports = refreshTokenModel;

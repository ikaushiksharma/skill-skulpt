import { NextFunction } from "express";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordReserTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

passwordReserTokenSchema.pre("save", async function (this: any, next: NextFunction) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }

  next();
});

passwordReserTokenSchema.methods.compareToken = async function (token: any) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

module.exports = mongoose.model("PasswordResetToken", passwordReserTokenSchema);

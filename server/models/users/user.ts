const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    problemsSolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem",
      },
    ],
    registeredTests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test",
      },
    ],
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function (this: any, next: any) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("user", userSchema);

module.exports = User;

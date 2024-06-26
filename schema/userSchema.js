const { Schema, model } = require("mongoose");
const joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const User = model("users", userSchema);

const addUserSchema = joi.object({
  password: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
});

const updateSubUserSchema = joi.object({
  subscription: joi.string().required(),
});

const updateAvatarUserSchema = joi.object({
  path: joi.string().required(),
});

module.exports = {
  User,
  addUserSchema,
  updateSubUserSchema,
  updateAvatarUserSchema,
};

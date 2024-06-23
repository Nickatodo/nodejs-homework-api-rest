const { Schema, model } = require("mongoose");
const joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Contact = model("contacts", contactSchema);

const addContactSchema = joi.object({
  name: joi.string().min(3).max(45).required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]/)
    .required(),
});

const updateContactSchema = joi
  .object({
    name: joi.string().min(3).max(45),
    email: joi.string().email(),
    phone: joi.string().pattern(/^[0-9]/),
    favorite: joi.boolean(),
  })
  .min(1);

const updateStatusContactSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = {
  Contact,
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};

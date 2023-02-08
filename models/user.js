const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

function userSchemaValidation(userObject) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    email: Joi.required().min(3).max(255).email(),
    password: Joi.string().min(8).max(255).required(),
    rollNumber: Joi.string().required().min(3).max(10),
  });

  return schema.validate(userObject);
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  rollNumber: { type: String, required: true, minlength: 3, maxlength: 10 },
  isAdmin: { type: Boolean },
});

const User = mongoose.model("User", userSchema);

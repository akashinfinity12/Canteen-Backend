const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");

function loginSchemaValidation(loginObject) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(loginObject);
}

router.post("/", async (req, res) => {
  const { error } = loginSchemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = existingUser.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
  });
});

module.exports = router;

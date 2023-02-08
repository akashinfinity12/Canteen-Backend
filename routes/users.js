const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, userSchemaValidation } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = userSchemaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("Account already exists");

  const user = new User(_.pick(req.body, ["name password email rollNumber"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send("User Created Successfully");
});

module.exports = router;

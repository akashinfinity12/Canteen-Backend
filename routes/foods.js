const express = require("express");
const router = express.Router();
const { foodSchemaValidate, Food } = require("../models/food");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", [auth, admin], async (req, res) => {
  const foods = await Food.find();
  res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).send("Data not found on server");

  res.send(food);
});

router.post("/", async (req, res) => {
  const { error } = foodSchemaValidate(req.body);
  if (error) return res.status(400).send("Invalid Object: " + error.message);

  const food = new Food(req.body);
  await food.save();
  res.send(food);
});

router.put("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).send("Data not found on server");

  const updatedFood = await Food.updateOne({ _id: req.params.id }, req.body);
  res.send(updatedFood);
});

router.delete("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).send("Data not found on server");

  const result = await Food.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = router;

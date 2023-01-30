const Joi = require("joi");
const mongoose = require("mongoose");

function foodSchemaValidate(foodObject) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    price: Joi.number().less(1000).required(),
    category: Joi.string().max(50).required(),
    imageUrl: Joi.string().required(),
  });

  return schema.validate(foodObject);
}

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Food = mongoose.model("Food", foodSchema);

module.exports.foodSchemaValidate = foodSchemaValidate;
module.exports.Food = Food;

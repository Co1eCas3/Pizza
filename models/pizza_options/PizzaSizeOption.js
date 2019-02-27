const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PizzaSizeOptionSchema = new Schema({
  size: {
    type: Number,
    required: true,
    min: 0
  },
  base_price: {
    type: Number,
    required: true,
    min: 0
  },
  add_price_per_topping: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = PizzaSizeOption = mongoose.model(
  "pizza_size_options",
  PizzaSizeOptionSchema
);

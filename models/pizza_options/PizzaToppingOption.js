const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PizzaToppingOptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  add_price: {
    type: Number,
    default: 0,
    min: 0
  }
});

module.exports = PizzaToppingOption = mongoose.model(
  "pizza_topping_options",
  PizzaToppingOptionSchema
);

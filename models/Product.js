const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SideOptionsSchema = new Schema({
  name: String,
  price: {
    type: Number,
    min: 0,
    default: 0
  }
});

const OptionSchema = new Schema({
  size: Number,
  ingredient: String,
  crust: String,
  side: {
    name: String,
    options: [SideOptionsSchema],
    price: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  option_type: {
    type: Map
    // of: Mixed
  },
  // client will send keys a one of these preset fields:
  //  size (num)
  //  ingredient (str)
  //  crust (str)
  //  side (obj || Schema(sub-doc))
  //    name (str)
  //    price (num)
  //    side_options (obj || Schema(sub-doc))
  //      name (str)
  //      price (num)
  price: {
    type: Number,
    get: p => p.toFixed(2),
    set: p => p.toFixed(2),
    default: 0,
    min: 0
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "product_categories"
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    max: 128
  },
  // store file path, insert path into src attr of container element
  image: String,
  options: [OptionSchema],
  base_price: {
    type: Number,
    min: 0,
    required: true
  }
});

module.exports = Product = mongoose.model("products", ProductSchema);

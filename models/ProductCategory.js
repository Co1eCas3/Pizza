const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
  category: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = ProductCategory = mongoose.model(
  "product_categories",
  ProductCategorySchema
);

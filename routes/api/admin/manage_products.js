// modules
const express = require("express"),
  router = express.Router();

// models
const ProductCategory = require("../../../models/ProductCategory"),
  Product = require("../../../models/Product");

// validation
const validateProductCategory = require("../../../validation/product_category"),
  validateProductInfo = require("../../../validation/product_info"),
  validateProductOptions = require("../../../validation/product_options");

// utils
const normalize = require("../../../utils/normalize");

// @route       POST api//admin/manage_products/add_product_category
// @desc        create new product category
//              - e.g. dinners, pizza, sides, etc.
//              POSSIBLE - add sub-categories?
// @access      TO BE MADE PRIVATE -- for admin only
// @req params  name: NORMALIZED str
router.post("/add_product_category", (req, res) => {
  const { errors, isValid } = validateProductCategory(req.body);

  if (!isValid) return res.status(400).json(errors);

  const normalCategory = normalize(req.body.category);

  ProductCategory.findOne({ category: normalCategory }).then(category => {
    if (category) {
      errors.category = "Category already exists";
      return res.status(400).json(errors);
    } else {
      const newCategory = new ProductCategory({
        category: normalCategory
      });

      newCategory
        .save()
        .then(category => res.json(category))
        .catch(err => console.log(err));
    }
  });
});

// @route       POST api/admin/manage_products/add_product
// @desc        create new products in db
// @access      WILL BE PRIVATE -- admin only
// @req params  categoryId: <ref to product_category._id, TBD by 'data-id' attr of select option el>
//              name: NORMALIZED str
//              description: str
//              base_price: parseFloat(str)
router.post("/add_product", (req, res) => {
  const { errors, isValid } = validateProductInfo(req.body);

  if (!isValid) return res.status(400).json(errors);

  const productFields = {};

  productFields.category = req.body.categoryId;

  if (req.body.name) productFields.name = normalize(req.body.name);
  if (req.body.description) productFields.description = req.body.description;
  if (req.body.base_price)
    productFields.base_price = parseFloat(req.body.base_price);

  Product.findOne({ name: productFields.name }).then(product => {
    if (product) {
      errors.name = "Product already exists";
      return res.status(400).json(errors);
    } else {
      new Product(productFields).save().then(product => res.json(product));
    }
  });
});

// @route       POST api/admin/manage_products/add_product_options
// @desc        add options (e.g. ingredients to include/exclude, size of pizza, etc.)
// @access      WILL BE PRIVATE -- admin access only
// @req params  productId: Schema.ObjectId
//              ONE OF:
//                size: num
//                crust: str
//                ingredient: str
//                side: str
//              price: parseFloat(str)
router.post("/add_product_options", (req, res) => {
  const { errors, isValid } = validateProductOptions(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newProduct = {};

  Product.findOne({ _id: req.body.productId }).then(product => {});
});
module.exports = router;

const Validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = function validateProductInfo(data) {
  let errors = {};

  data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.base_price = !isEmpty(data.base_price) ? data.base_price : "";

  if (Validator.isEmpty(data.categoryId)) {
    errors.categoryId = "Please select a product category";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please provide a name for this product";
  }

  if (!Validator.isLength(data.description, { max: 128 })) {
    errors.description =
      "Product description should be no more than 128 characters";
  }

  if (Validator.isEmpty(data.base_price)) {
    errors.base_price = "Please provide a base price for this product";
  } else if (
    (Validator.isInt(data.base_price) && parseInt(data.base_price) < 0) ||
    (Validator.isFloat(data.base_price) && parseFloat(data.base_price) < 0)
  ) {
    errors.base_price = "Please provide a valid base price for this product";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

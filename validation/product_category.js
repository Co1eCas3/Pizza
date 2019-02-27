const Validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = function validateProductCategory(data) {
  let errors = {};

  data.category = !isEmpty(data.category) ? data.category : "";

  if (Validator.isEmpty(data.category)) {
    errors.category = "Please provide a product category name";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

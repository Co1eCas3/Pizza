const Validator = require("validator");
const isEmpty = require("../../utils/is-empty");

module.exports = function validatePizzaSizeOption(data) {
  let errors = {};

  data.size = !isEmpty(data.size) ? data.size : "";
  data.base_price = !isEmpty(data.base_price) ? data.base_price : "";
  data.add_price_per_topping = !isEmpty(data.add_price_per_topping)
    ? data.add_price_per_topping
    : "";

  if (Validator.isEmpty(data.size) || parseFloat(data.size) < 0) {
    errors.size = "Please provide a valid pizza size";
  } else if (!Validator.isFloat(data.size)) {
    errors.size =
      "Sizes should be a number representing size of pizza in inches";
  }

  if (
    Validator.isEmpty(data.base_price) ||
    !Validator.isFloat(data.base_price) ||
    parseFloat(data.base_price) < 0
  ) {
    errors.base_price = "Please provide a valid price";
  }

  if (
    Validator.isEmpty(data.add_price_per_topping) ||
    !Validator.isFloat(data.add_price_per_topping) ||
    parseFloat(data.add_price_per_topping) < 0
  ) {
    errors.add_price_per_topping = "Please provide a valid price";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

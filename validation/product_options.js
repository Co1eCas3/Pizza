const Validator = require("validator");
const isEmpty = require("../utils/is-empty");

module.exports = function validateProductOptions(data) {
  let errors = {};

  if (
    !isEmpty(data.optionPrice) &&
    Validator.isFloat(data.optionPrice) &&
    parseFloat(data.optionPrice) < 0
  ) {
    errors.optionPrice = "Please provide a valid price for this option";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

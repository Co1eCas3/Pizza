const Validator = require("validator");
const isEmpty = require("../../utils/is-empty");

module.exports = function validatePizzaCrustOption(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.size_price_points = !isEmpty(data.size_price_points)
    ? data.size_price_points
    : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please provide a name for this crust type";
  }

  if (
    !Validator.isEmpty(data.size_price_points) &&
    data.size_price_points.match(/[^\d:,.]/) !== null
  ) {
    errors.size_price_points =
      "[Validator] Something's wrong with size point pricing...";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const Validator = require("validator");
const isEmpty = require("../../utils/is-empty");

module.exports = function validatePizzaToppingOption(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.add_price = !isEmpty(data.add_price) ? data.add_price : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please provide a name";
  }

  if (
    !Validator.isEmpty(data.add_price) &&
    (!Validator.isFloat(data.add_price) ||
      Validator.isFloat(data.add_price, { lt: 0 }))
  ) {
    errors.add_price = "Please provide a valid additional price";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

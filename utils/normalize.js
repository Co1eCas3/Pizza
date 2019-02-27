const Validator = require("validator");

const isNormalized = value => Validator.isLowercase(value);

module.exports = normalize = value => {
  return isNormalized(value) ? value : value.toLowerCase();
};

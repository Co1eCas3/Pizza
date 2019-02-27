const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// NOTE: PIZZA SIZE OPTIONS MUST BE CREATED FIRST
// how to insert:
// const req = 'a:1,b:2,c:3';
// const extracted = req.split(',').map(ex => ex.split(':'));
// => [ [ 'a', '1' ], [ "b", "2" ], [ "c", "3" ] ]
// SET FIELD IN ROUTE:
// extracted.forEach(pp => {
// PizzaCrustOptions.size_price_points.set(pp[0], parseFloat(pp[1]));
// })

const PizzaCrustOptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  size_price_points: {
    type: Map,
    of: Number
  }
});

module.exports = PizzaCrustOption = mongoose.model(
  "pizza_crust_options",
  PizzaCrustOptionSchema
);

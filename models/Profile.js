const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    }
  },
  phone: {
    type: Number,
    required: true
  },
  order_history: [
    {
      type: Schema.Types.ObjectId,
      ref: "orders"
    }
  ]
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

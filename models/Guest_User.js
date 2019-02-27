const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Guest_UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
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
  order: {
    type: Schema.Types.ObjectId,
    ref: "orders"
  }
});

module.exports = Guest_User = mongoose.model("guest_users", Guest_UserSchema);

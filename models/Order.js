const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
    },
    // 0 -> Cancelled, 1 -> Pending, 2 -> Complete
    status: {
      type: String,
      enum: ["0", "1", "2"],
      default: "1"
    },
    total_money:{
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
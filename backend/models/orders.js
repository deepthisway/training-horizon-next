const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    // _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    paymentMethod: {type: String, required: true},
    orderNotes: { type: String },
    // title: {type: String}, 
    // totalPrice: {type: String}
  },

  { timestamps: true }
);

const Orders = mongoose.model("orders", checkoutSchema);
module.exports = {
  Orders
}

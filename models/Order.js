const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User is required"],
      trim: true,
    },

    items: [
      {
        productName: {
          type: String,
          required: [true, "Product name is required"],
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre("validate", function () {
  this.totalAmount = this.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

module.exports = mongoose.model("Order", orderSchema);
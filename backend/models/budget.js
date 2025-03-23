const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    category: {
      type: String,
      required: true,
      // trim: true,
      // set: (value) =>
      //   value.toLowerCase() === "overall budget"
      //     ? "Overall Budget"
      //     : value.toLowerCase(),
    },
    budgetAmount: {
      type: Number,
      required: true,
      // min: [0, "Budget amount must be a positive number"],
      // validate: {
      //   validator: function (value) {
      //     return value >= 0;
      //   },
      //   message: "Budget amount cannot be negative.",
      // },
    },
  },
  { timestamps: true }
);
//   createdAt: { type: Date, default: Date.now },
// });

// Ensure unique budget per user for each category
BudgetSchema.index({ userId: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("Budget", BudgetSchema);

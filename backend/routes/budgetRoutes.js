const express = require("express");
const router = express.Router();
const Budget = require("../models/budget");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 Set Budget (User must be authenticated)
router.post("/set", authMiddleware, async (req, res) => {
  let { category, budgetAmount } = req.body;
  const userId = req.user.id; // Extracted from token
  console.log("Extracted userId from token:", userId);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: Invalid User Token" });
  }
  if (category) {
    category = category.trim();
  }

  // // Validate input
  // if (!category || budgetAmount === undefined) {
  //   return res.status(400).json({ message: "All fields are required." });
  // }

  // ✅ Input Validation
  if (!category || isNaN(budgetAmount) || budgetAmount <= 0 || budgetAmount > 10000000) {
    return res.status(400).json({
      message:
        "Invalid input. Provide a valid category and budget amount greater than zero.",
    });
  }
  // category = category.trim(); // Now safe to trim
  //   try {
  //     let budget = await Budget.findOne({ userId, category });

  //     if (budget) {
  //       budget.budgetAmount = Number(budgetAmount); // Update existing budget
  //       await budget.save();
  //     } else {
  //       try {
  //         budget = new Budget({
  //           userId,
  //           category,
  //           budgetAmount: Number(budgetAmount),
  //         });
  //         await budget.save();
  //       } catch (err) {
  //         if (err.code === 11000) {
  //           // MongoDB duplicate key error
  //           return res
  //             .status(400)
  //             .json({ message: "Budget for this category already exists." });
  //         }
  //         throw err;
  //       }
  //     }

  //     res.json({ message: "Budget set successfully", budget });
  //   } catch (error) {
  //     console.error("Error in /set route:", error.message);
  //     res.status(500).json({ message: "Server Error", error: error.message });
  //   }
  const existingBudget = await Budget.findOne({ userId, category });

  if (existingBudget) {
    return res.status(400).json({
      message: "Budget for this category already exists for this user.",
    });
  }

  try {
    const budget = new Budget({
      userId,
      category,
      budgetAmount: Number(budgetAmount),
    });
    await budget.save();
    res.json({ message: "Budget set successfully", budget });
  } catch (error) {
    console.error("Error in /set route:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 📌 Get Budget for Logged-in User
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id; // Extracted from token

  try {
    const budgets = await Budget.find({ userId });
    if (budgets.length === 0) {
      return res
        .status(404)
        .json({ message: "No budgets found for this user." });
    }
    res.json(budgets);
  } catch (error) {
    console.error("Error in GET /budget route:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 📌 Get Overall Budget for Logged-in User
router.get("/overall", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const overallBudget = await Budget.findOne({
      userId,
      category: "Overall Budget",
    });

    if (!overallBudget) {
      return res.json({ budgetAmount: 0 }); // Default to 0 if not set
    }

    res.json({ budgetAmount: overallBudget.budgetAmount });
  } catch (error) {
    console.error("Error in GET /overall route:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
module.exports = router;



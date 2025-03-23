// // // require('dotenv').config();

// // // console.log("PORT:", process.env.PORT);
// // // console.log("MONGO_URI:", process.env.MONGO_URI);
// // // console.log("JWT_SECRET:", process.env.JWT_SECRET);

// // // const express = require('express');
// // // const connectDB = require('./config/db');
// // // const cors = require('cors');

// // // const app = express();

// // // // Middleware
// // // app.use(express.json());
// // // app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // // // Connect to MongoDB and Start Server Only if Successful
// // // const startServer = async () => {
// // //     try {
// // //         await connectDB(); // Ensure MongoDB connects before starting server

// // //         const PORT = process.env.PORT || 5000;
// // //         const authRoutes = require('./routes/authRoutes');
// // //         app.use('/api/auth', authRoutes);

// // //         app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// // //     } catch (error) {
// // //         console.error("❌ Server failed to start:", error.message);
// // //         process.exit(1);
// // //     }
// // // };

// // // startServer();
// // require("dotenv").config();

// // console.log("PORT:", process.env.PORT);
// // console.log("MONGO_URI:", process.env.MONGO_URI);
// // console.log("JWT_SECRET:", process.env.JWT_SECRET);

// // const express = require("express");
// // const connectDB = require("./config/db");
// // const cors = require("cors");

// // const Budget = require("./models/Budget");

// // const app = express();

// // // Middleware
// // app.use(express.json());
// // app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // // Connect to MongoDB and Start Server Only if Successful
// // const startServer = async () => {
// //   try {
// //     await connectDB(); // Ensure MongoDB connects before starting server

// //     const PORT = process.env.PORT || 5000;

// //     // Import and use authentication routes
// //     const authRoutes = require("./routes/authRoutes");
// //     app.use("/api/auth", authRoutes);

// //     // ✅ Import and use budget routes
// //     const budgetRoutes = require("./routes/budgetRoutes");
// //     app.use("/api/budget", budgetRoutes);

// //     app.listen(PORT, () =>
// //       console.log(`🚀 Server running on http://localhost:${PORT}`)
// //     );
// //   } catch (error) {
// //     console.error("❌ Server failed to start:", error.message);
// //     process.exit(1);
// //   }
// // };

// // startServer();

// require("dotenv").config();

// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
// console.log("DEFAULT_BUDGET_LIMIT:", process.env.DEFAULT_BUDGET_LIMIT);

// const express = require("express");
// const connectDB = require("./config/db");
// const cors = require("cors");

// // Import Models
// const Budget = require("./models/budget");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // Connect to MongoDB and Start Server Only if Successful
// const startServer = async () => {
//   try {
//     await connectDB(); // Ensure MongoDB connects before starting server

//     const PORT = process.env.PORT || 5000;

//     // Import and use authentication routes
//     const authRoutes = require("./routes/authRoutes");
//     app.use("/api/auth", authRoutes);

//     // ✅ Import and use budget routes
//     const budgetRoutes = require("./routes/budgetRoutes");
//     app.use("/api/budget", budgetRoutes);

//     // // ✅ API to Get Budget for a User
//     // app.get("/api/budget/:userId", async (req, res) => {
//     //   const { userId } = req.params;

//     //   try {
//     //     const budgets = await Budget.find({ userId });
//     //     res.json(budgets);
//     //   } catch (error) {
//     //     res.status(500).json({ message: "Server Error", error: error.message });
//     //   }
//     // });

//     // // ✅ API to Set Budget for a Category
//     // app.post("/api/budget/set", async (req, res) => {
//     //   const { userId, category, budgetAmount } = req.body;

//     //   if (!userId || !category || budgetAmount === undefined) {
//     //     return res.status(400).json({ message: "All fields are required." });
//     //   }
//     //   // ✅ Validate Budget Limit
//     //   const budgetLimit = parseInt(process.env.DEFAULT_BUDGET_LIMIT) || 5000;
//     //   if (budgetAmount > budgetLimit) {
//     //     return res
//     //       .status(400)
//     //       .json({ message: `Budget cannot exceed ₹${budgetLimit}` });
//     //   }

//     //   try {
//     //     let budget = await Budget.findOne({ userId, category });

//     //     if (budget) {
//     //       budget.budgetAmount = budgetAmount;
//     //     } else {
//     //       budget = new Budget({ userId, category, budgetAmount });
//     //     }

//     //     await budget.save();
//     //     res.json({ message: "Budget saved successfully", budget });
//     //   } catch (error) {
//     //     res.status(500).json({ message: "Server Error", error: error.message });
//     //   }
//     // });

//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     );
//   } catch (error) {
//     console.error("❌ Server failed to start:", error.message);
//     process.exit(1);
//   }
// };

// startServer();

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// ✅ Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await connectDB(); // Ensure MongoDB connects before starting server
    // await Budget.syncIndexes(); // ✅ Sync indexes here

    const PORT = process.env.PORT || 5000;

    // ✅ Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/budget", budgetRoutes);

    // ✅ Start Server
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

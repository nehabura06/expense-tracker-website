// require('dotenv').config();
// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// connectDB();

// const PORT = process.env.PORT || 5000;
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// Load environment variables first
require('dotenv').config();

console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Connect to MongoDB and Start Server Only if Successful
const startServer = async () => {
    try {
        await connectDB(); // Ensure MongoDB connects before starting server

        const PORT = process.env.PORT || 5000;
        const authRoutes = require('./routes/authRoutes');
        app.use('/api/auth', authRoutes);

        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();

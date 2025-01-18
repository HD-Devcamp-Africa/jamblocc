import connectDB from "./config/db.js";

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import connectDB from "./config/db.js";
import cors from "cors";
import express from "express";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // Only this is needed

// Connect to MongoDB
connectDB();

// // Middleware
// app.use(cors());

// Allow all origins
app.use(cors()); // This will allow requests from any origin

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

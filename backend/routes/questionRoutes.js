const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

// Routes
router.post("/", questionController.storeQuestion); // Store question
router.get("/", questionController.getAllQuestions); // Get all questions
router.get("/search", questionController.searchQuestions); // Search questions by subject

module.exports = router;

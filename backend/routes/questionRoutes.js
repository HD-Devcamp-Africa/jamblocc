const express = require("express");
const questionController = require("../controllers/questionController");

const router = express.Router();

// Routes
router.post("/", questionController.storeQuestion); // Store question
router.get("/", questionController.getAllQuestions); // Get all questions
router.get("/search", questionController.searchQuestions); // Search questions by subject
router.get("/fetch-and-store", questionController.storeQuestion); // Retrieve the response and save it in the database
// The main route for getting and saving the questions from the API call
// router.get("/fetch-and-store", questionController.storeQuestion);

module.exports = router;

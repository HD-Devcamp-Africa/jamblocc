const Question = require("../models/questionModel");

// Store retrieved data
exports.storeQuestion = async (req, res) => {
  try {
    const questionData = req.body; // Expect the JSON format in the request body
    console.log("Request body:", questionData);
    const question = new Question(questionData);

    await question.save();
    res.status(201).json({ message: "Question saved successfully" });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all stored questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search questions by subject
exports.searchQuestions = async (req, res) => {
  const { subject } = req.query;
  try {
    const questions = await Question.find({
      subject: new RegExp(subject, "i"),
    });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error searching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

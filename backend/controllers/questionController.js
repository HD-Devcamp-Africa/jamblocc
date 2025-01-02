const Question = require("../models/questionModel");
const express = require("express");
const axios = require("axios");

// const Question = require("../models/questionModel"); // Importing the model (ensure it's correctly set up)
// const axios = require("axios");

// Store question data from the API
exports.storeQuestion = async (req, res) => {
  console.log("fetch-and-store endpoint hit");

  try {
    // Fetching required environment variables
    const apiUrl = process.env.API_URL;
    // const accessToken = process.env.ACCESS_TOKEN;
    const accessToken = "ALOC-ccc913cc887c0d2e4c2d";

    // Validate environment variables
    if (!apiUrl || !accessToken) {
      return res.status(500).json({
        error: "Missing API_URL or ACCESS_TOKEN in environment variables.",
      });
    }

    // Prepare API URL with query parameter
    const subject = req.query.subject || "english"; // Default subject: "english"
    const fullUrl = `${apiUrl}?subject=${subject}`;
    console.log("Requesting API with URL:", fullUrl);

    // Make the API call
    const response = await axios.get(fullUrl, {
      headers: {
        Authorization: accessToken, // Add 'Bearer' if required by the API
        Accept: "application/json",
      },
    });

    // Log the raw response data
    console.log("API Response Data:", response.data);

    // Validate the API response data
    if (
      !response.data ||
      !Array.isArray(response.data) ||
      response.data.length === 0
    ) {
      return res.status(404).json({
        error: "No questions found in the API response.",
      });
    }

    // Extract the data from the response
    const questionData = response.data;

    // Log the extracted data for further inspection
    console.log("Extracted Question Data:", questionData);

    // Validate the question structure (e.g., required fields)
    if (!questionData[0].question || !questionData[0].answers) {
      return res.status(400).json({
        error: "Invalid question data structure received from the API.",
      });
    }

    // Save the question data to the database
    const savedQuestions = [];
    for (const data of questionData) {
      const question = new Question(data); // Create a new Question instance
      const savedQuestion = await question.save(); // Save it to the database
      savedQuestions.push(savedQuestion); // Push saved question to the array
    }

    // Respond with a success message and saved data
    res.status(201).json({
      message: "Question data saved successfully.",
      savedQuestions, // Return saved questions
    });
  } catch (error) {
    // Log detailed error information
    console.error("Error fetching or saving question:", error);

    // Return the error response
    res.status(500).json({
      error: "Failed to fetch or save question.",
      details: error.response ? error.response.data : error.message,
    });
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

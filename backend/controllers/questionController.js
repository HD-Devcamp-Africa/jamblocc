import { createQuestionModel } from "../models/questionModel.js"; // Dynamic model creation function

import axios from "axios";

// Fetch questions from the API and return the response
export const fetchQuestions = async (req, res) => {
  console.log("fetchQuestions endpoint hit");

  try {
    // Hardcoded API URL and Access Token
    const apiUrl = process.env.API_URL;
    const accessToken = process.env.ACCESS_TOKEN;

    // Retrieve the 'subject' query parameter (default: 'english')
    const subject = req.query.subject || "english";
    const fullUrl = `${apiUrl}?subject=${subject}`;

    console.log("Making API request to:", fullUrl);

    // Make the API call
    const response = await axios.get(fullUrl, {
      headers: {
        accessToken: accessToken, // Correctly formatted header
        // Authorization: `Bearer ${accessToken}`, // Correctly formatted header
      },
    });

    // Return the API response directly to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching questions from API:", error.message);

    // Handle API errors and return appropriate response
    res.status(500).json({
      error: "Failed to fetch questions from the API.",
      details: error.response ? error.response.data : error.message,
    });
  }
};

export const storeQuestion = async (req, res) => {
  try {
    const apiUrl = process.env.API_URL;
    const accessToken = process.env.ACCESS_TOKEN;

    if (!apiUrl || !accessToken) {
      return res.status(500).json({
        error: "Missing API_URL or ACCESS_TOKEN in environment variables.",
      });
    }

    const subject = req.query.subject || "english";
    const fullUrl = `${apiUrl}?subject=${subject}`;

    const response = await axios.get(fullUrl, {
      headers: {
        accessToken: accessToken,
        Accept: "application/json",
      },
    });

    const { subject: responseSubject, status, data } = response.data;

    // Handle empty section
    if (!data.section || data.section.trim() === "") {
      data.section = "Default Section";
    }

    // Create dynamic model based on subject
    const QuestionModel = createQuestionModel(responseSubject);

    // Check for existing question in the subject-specific collection
    const existingQuestion = await QuestionModel.findOne({
      "data.id": data.id,
    });
    if (existingQuestion) {
      return res.status(200).json({
        message: `Question with id ${data.id} already exists in the ${responseSubject} collection.`,
      });
    }
    // Save new question
    const newQuestion = new QuestionModel({
      subject: responseSubject,
      status,
      data,
    });

    await newQuestion.save();

    console.log(
      `Question saved successfully in the ${responseSubject} collection:`,
      newQuestion
    );
    res.status(201).json({
      message: `Question saved successfully in the ${responseSubject} collection.`,
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error fetching or saving question:", error);
    res.status(500).json({
      error: "Failed to fetch or save question.",
      details: error.response ? error.response.data : error.message,
    });
  }
};

// // Store question data from the API
// export const storeQuestion = async (req, res) => {
//   console.log("fetch-and-store endpoint hit");

//   try {
//     // Fetching required environment variables
//     const apiUrl = process.env.API_URL;
//     const accessToken = process.env.ACCESS_TOKEN;

//     // Validate environment variables
//     if (!apiUrl || !accessToken) {
//       return res.status(500).json({
//         error: "Missing API_URL or ACCESS_TOKEN in environment variables.",
//       });
//     }

//     // Prepare API URL with query parameter
//     const subject = req.query.subject || "english"; // Default subject: "english"
//     const fullUrl = `${apiUrl}?subject=${subject}`;
//     console.log("Requesting API with URL:", fullUrl);

//     // Make the API call
//     const response = await axios.get(fullUrl, {
//       headers: {
//         accessToken: accessToken, // Add 'Bearer' if required by the API
//         Accept: "application/json",
//       },
//     });

//     // Log the raw response data
//     console.log("API Response Data:", response.data);

//     // Extract the data from the response
//     const questionData = response.data;

//     // check if the response is already in the database, if not save the data or response in the database
//     const savedQuestions = await Question.insertMany(questionData, {
//       ordered: false,
//     });

//     // Respond with a success message and saved data
//     res.status(201).json({
//       message: "Question data saved successfully.",
//       savedQuestions, // Return saved questions
//     });
//   } catch (error) {
//     // Log detailed error information
//     console.error("Error fetching or saving question:", error);

//     // Return the error response
//     res.status(500).json({
//       error: "Failed to fetch or save question.",
//       details: error.response ? error.response.data : error.message,
//     });
//   }
// };

// Get all stored questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search questions by subject
export const searchQuestions = async (req, res) => {
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

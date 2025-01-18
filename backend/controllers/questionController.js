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

// ############################################################################
// ############################################################################
// ############################################################################

export const storeQuestions = async (req, res) => {
  try {
    const apiUrl = process.env.API_URL;
    const accessToken = process.env.ACCESS_TOKEN;

    if (!apiUrl || !accessToken) {
      return res.status(500).json({
        error: "Missing API_URL or ACCESS_TOKEN in environment variables.",
      });
    }

    // Retrieve and validate the subject query parameter
    const subject = req.query.subject?.toLowerCase();
    const supportedSubjects = [
      "english",
      "mathematics",
      "commerce",
      "accounting",
      "biology",
      "physics",
      "chemistry",
      "englishlit",
      "government",
      "crk",
      "geography",
      "economics",
      "irk",
      "civiledu",
      "insurance",
      "currentaffairs",
      "history",
    ];

    if (!subject || !supportedSubjects.includes(subject)) {
      return res.status(400).json({
        error: `Invalid or unsupported subject. Supported subjects are: ${supportedSubjects.join(
          ", "
        )}.`,
      });
    }

    // New API endpoint to fetch multiple questions for the specified subject
    const fullUrl = `${apiUrl}/m/115?subject=${encodeURIComponent(subject)}`;

    const response = await axios.get(fullUrl, {
      headers: {
        accessToken: accessToken,
        Accept: "application/json",
      },
    });

    const { subject: responseSubject, status, data } = response.data;

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "No valid question data found for the specified subject.",
      });
    }

    // Iterate through each question in the fetched data
    const QuestionModel = createQuestionModel(responseSubject);

    const savedQuestions = [];
    for (const questionData of data) {
      // Handle empty or missing section
      if (!questionData.section || questionData.section.trim() === "") {
        questionData.section = "Default Section";
      }

      // Check for existing question in the subject-specific collection
      const existingQuestion = await QuestionModel.findOne({
        "data.id": questionData.id,
      });

      if (existingQuestion) {
        console.log(`Question with id ${questionData.id} already exists.`);
        continue; // Skip saving if it already exists
      }

      // Create a new question document
      const newQuestion = new QuestionModel({
        subject: responseSubject,
        status,
        data: questionData,
      });

      await newQuestion.save();
      savedQuestions.push(newQuestion);
      console.log(`Question saved successfully with id ${questionData.id}`);
    }

    res.status(201).json({
      message: `Successfully saved ${savedQuestions.length} question(s) in the ${responseSubject} collection.`,
    });
  } catch (error) {
    console.error("Error fetching or saving questions:", error);

    // Handle specific errors
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        error: "Subject not found in the API.",
        details: error.response.data,
      });
    }

    res.status(500).json({
      error: "Failed to fetch or save questions.",
      details: error.response ? error.response.data : error.message,
    });
  }
};
//  ###########################################################################
//  ###########################################################################
//  ###########################################################################
// Get all stored questions
// export const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getAllQuestions = async (req, res) => {
  try {
    // Get the list of all supported subjects
    const supportedSubjects = [
      "english",
      "mathematics",
      "commerce",
      "accounting",
      "biology",
      "physics",
      "chemistry",
      "englishlit",
      "government",
      "crk",
      "geography",
      "economics",
      "irk",
      "civiledu",
      "insurance",
      "currentaffairs",
      "history",
    ];

    // Initialize an empty object to hold the response data
    let responseData = {};

    // Loop through each supported subject and retrieve data
    for (const subject of supportedSubjects) {
      const QuestionModel = createQuestionModel(subject);

      // Dynamically fetch data for each subject's collection
      const data = await QuestionModel.find({}).lean();

      // If the collection has data, add it to the response
      if (data.length > 0) {
        responseData[subject] = data;
      }
    }

    // If no data found for any collection
    if (Object.keys(responseData).length === 0) {
      return res.status(404).json({
        error:
          "No questions found in any of the supported subject collections.",
      });
    }

    // Return the structured response
    return res.status(200).json({
      message: "Questions retrieved successfully.",
      data: responseData,
    });
  } catch (error) {
    console.error("Error retrieving questions:", error);

    res.status(500).json({
      error: "Failed to retrieve questions.",
      details: error.message,
    });
  }
};

// ###############################################################################

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

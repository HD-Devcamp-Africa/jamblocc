import { createExamModel } from "../models/examModel.js"; // Dynamic model creation function
import axios from "axios";

// Fetch questions from the new API and return the response
export const fetchAndStoreQuestions = async (req, res) => {
  try {
    const apiUrl =
      process.env.NEW_API_URL || "https://questions.aloc.com.ng/api/v2/m/100";
    const accessToken = process.env.ACCESS_TOKEN;

    if (!apiUrl || !accessToken) {
      return res.status(500).json({
        error: "Missing API_URL or ACCESS_TOKEN in environment variables.",
      });
    }

    // Retrieve and validate query parameters
    const subject = req.query.subject?.toLowerCase();
    const questionLimit = parseInt(req.query.limit, 10) || 20; // Default limit to 20
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

    const fullUrl = `${apiUrl}/${questionLimit}?subject=${encodeURIComponent(
      subject
    )}`;

    console.log("Fetching questions from:", fullUrl);

    const response = await axios.get(fullUrl, {
      headers: {
        accessToken: accessToken,
        Accept: "application/json",
      },
    });

    const { data: questions } = response.data;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(404).json({
        error: "No questions found for the specified subject and limit.",
      });
    }

    // Use the dynamic model creation function
    const ExamModel = createExamModel(subject);

    // Store questions in the database
    const savedQuestions = [];
    for (const question of questions) {
      const existingQuestion = await ExamModel.findOne({
        "data.id": question.id,
      });

      if (!existingQuestion) {
        const newQuestion = new ExamModel({
          subject,
          status: response.status,
          data: {
            id: question.id,
            question: question.question,
            option: question.option,
            section: question.section || "Default Section",
            image: question.image || "",
            answer: question.answer,
            solution: question.solution || "",
            examtype: question.examtype,
            examyear: question.examyear,
            questionNub: question.questionNub || null,
            hasPassage: question.hasPassage || 0,
            category: question.category || null,
          },
        });

        await newQuestion.save();
        savedQuestions.push(newQuestion);
      }
    }

    console.log(
      `Saved ${savedQuestions.length} new questions for subject: ${subject}`
    );
    res.status(201).json({
      message: `Successfully saved ${savedQuestions.length} questions for subject: ${subject}.`,
    });
  } catch (error) {
    console.error("Error fetching or saving questions:", error);
    res.status(500).json({
      error: "Failed to fetch or save questions.",
      details: error.response ? error.response.data : error.message,
    });
  }
};

// Retrieve questions from the stored data based on subject and limit
export const getStoredQuestions = async (req, res) => {
  try {
    const subject = req.query.subject?.toLowerCase();
    const questionLimit = parseInt(req.query.limit, 10) || 20; // Default limit to 20

    if (!subject) {
      return res
        .status(400)
        .json({ error: "Subject query parameter is required." });
    }

    const ExamModel = createExamModel(subject);

    // Retrieve questions with a limit
    const questions = await ExamModel.find().limit(questionLimit).lean();

    if (questions.length === 0) {
      return res
        .status(404)
        .json({ error: "No questions found for the specified subject." });
    }

    res.status(200).json({
      message: "Questions retrieved successfully.",
      data: questions,
    });
  } catch (error) {
    console.error("Error retrieving stored questions:", error);
    res.status(500).json({
      error: "Failed to retrieve stored questions.",
      details: error.message,
    });
  }
};

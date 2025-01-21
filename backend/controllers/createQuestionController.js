import { createQuestionModel } from "../models/questionModel.js"; // adjust the import path accordingly

// Controller to create a new question
const createQuestion = async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log("Received request body:", req.body);

    console.log(req.body); // Log the incoming data

    // Destructure the request body and validate presence of data
    const { subject, status, data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Question data is required" });
    }

    const {
      id,
      question,
      option,
      section = "Default Section",
      image = "",
      answer,
      solution = "",
      examtype,
      examyear,
      questionNub = null,
      hasPassage = 0,
      category = "",
    } = data;

    if (!id || !question || !option || !answer || !examtype || !examyear) {
      return res
        .status(400)
        .json({ message: "Missing required fields in data" });
    }

    // Dynamically create the model based on the subject
    const QuestionModel = createQuestionModel(subject);

    // Create a new question object based on the received data
    const newQuestion = new QuestionModel({
      subject,
      status,
      data: {
        id,
        question,
        option,
        section,
        image,
        answer,
        solution,
        examtype,
        examyear,
        questionNub,
        hasPassage,
        category,
      },
    });

    // Save the question to the database
    const savedQuestion = await newQuestion.save();

    // Return success response
    res.status(201).json({
      message: "Question created successfully",
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({
      message: "Error creating question",
      error: error.message,
    });
  }
};

export { createQuestion };

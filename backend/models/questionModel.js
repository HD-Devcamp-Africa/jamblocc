import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  status: { type: Number, required: true },
  data: {
    id: { type: Number, required: true },
    question: { type: String, required: true },
    option: {
      a: { type: String, default: "" },
      b: { type: String, default: "" },
      c: { type: String, default: "" },
      d: { type: String, default: "" },
      e: { type: String, default: "" },
    },
    section: { type: String, required: true, default: "Default Section" },
    image: { type: String, default: "" },
    answer: { type: String, required: true },
    solution: { type: String, default: "" },
    examtype: { type: String, required: true },
    examyear: { type: String, required: true },
    questionNub: { type: Number, default: null },
    hasPassage: { type: Number, default: 0 },
    category: { type: String, required: false },
  },
});

// Cache for storing created models
const modelsCache = {};

const createQuestionModel = (subject) => {
  const collectionName = subject.toLowerCase().replace(/\s+/g, "_");
  if (!modelsCache[collectionName]) {
    modelsCache[collectionName] = mongoose.model(
      collectionName,
      questionSchema,
      collectionName
    );
  }
  return modelsCache[collectionName];
};

export { createQuestionModel };

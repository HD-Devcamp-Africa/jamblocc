// const express = require("express");
// const questionController = require("../controllers/questionController");

import {
  fetchQuestions,
  storeQuestion,
  getAllQuestions,
  searchQuestions,
} from "../controllers/questionController.js";
// import axios from "axios";
import express from "express";

const router = express.Router();

// Routes
router.post("/", storeQuestion); // Store question
router.get("/", getAllQuestions); // Get all questions
router.get("/search", searchQuestions); // Search questions by subject
router.get("/fetch-and-store", storeQuestion); // Retrieve the response and save it in the database

// Define the route for fetching questions
router.get("/fetch", fetchQuestions);

export default router;

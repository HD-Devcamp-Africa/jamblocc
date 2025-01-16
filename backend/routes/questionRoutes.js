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

// import cache from the service folder
import duration from "../services/routeCache.js";
const cache = duration;

const router = express.Router();

// Routes
router.post("/", storeQuestion); // Store question
// router.get("/", getAllQuestions); // Get all questions
router.get("/search", cache(300), searchQuestions); // Search questions by subject
router.get("/fetch-and-store", cache(300), storeQuestion); // Retrieve the response and
router.get("/all-questions", cache(300), getAllQuestions); // get all questions
//save it in the database

// Define the route for fetching questions
router.get("/fetch", cache(300), fetchQuestions);

export default router;

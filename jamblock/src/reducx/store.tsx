import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questionSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    questions: questionsReducer, // Our questions slice to handle data
  },
});

export default store;

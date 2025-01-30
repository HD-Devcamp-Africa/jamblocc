import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunk to fetch data
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (selectedSubject: string) => {
    const response = await fetch(
      "https://jamblock.onrender.com/api/questions/all-questions"
    );
    const data = await response.json();
    return data.data[selectedSubject]; // Return filtered data based on subject
  }
);

interface QuestionState {
  data: any[];
  selectedSubject: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  data: [],
  selectedSubject: "english",
  isLoading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const { setSubject } = questionsSlice.actions;

export default questionsSlice.reducer;

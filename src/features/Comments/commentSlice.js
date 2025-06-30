import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (id) => {
    const response = await axios.get(
      `https://crm-backend-beige.vercel.app/leads/${id}/comments`
    );
    return response.data;
  }
);
export const addCommentAsync = createAsyncThunk(
  "comments/addCommentAsync",
  async (commentData) => {
    const response = await axios.post(
      `https://crm-backend-beige.vercel.app/leads/${commentData.lead}/comments`,
      commentData
    );
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
      state.comments = [];
      state.status = "loading";
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.comments)) {
        state.comments.push(action.payload);
      } else {
        state.comments = [action.payload];
      }
    });
    builder.addCase(addCommentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default commentSlice.reducer;

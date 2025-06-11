import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(
      `https://crm-backend-beige.vercel.app/leads?${queryParams}`
    );
    return response.data;
  }
);

export const addLeadAsync = createAsyncThunk(
  "leads/addLeadAsync",
  async (leadData) => {
    const response = await axios.post(
      "https://crm-backend-beige.vercel.app/leads",
      leadData
    );
    return response.data;
  }
);

export const deleteLeadAsync = createAsyncThunk(
  "leads/deleteLeadAsync",
  async (id) => {
    const response = await axios.delete(
      `https://crm-backend-beige.vercel.app/leads/${id}`
    );
    return response.data;
  }
);

export const updateLeadAsync = createAsyncThunk(
  "leads/updateLeadAsync",
  async ({ leadId, formData }) => {
    const response = await axios.put(
      `https://crm-backend-beige.vercel.app/leads/${leadId}`,
      formData
    );
    return response.data;
  }
);

export const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    status: "idle",
    error: null,
    sortBy: "",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchLeads.fulfilled, (state, action) => {
      state.status = "success";
      if (!action.payload) {
        state.leads = [];
      } else {
        state.leads = action.payload;
      }
    });
    builder.addCase(fetchLeads.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addLeadAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.leads)) {
        state.leads.push(action.payload);
      } else {
        state.leads = [action.payload];
      }
    });
    builder.addCase(addLeadAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteLeadAsync.fulfilled, (state, action) => {
      state.leads = state.leads.filter(
        (lead) => lead._id !== action.payload?.lead?._id
      );
    });
    builder.addCase(deleteLeadAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateLeadAsync.fulfilled, (state, action) => {
      state.leads = state.leads.map((lead) =>
        lead._id === action.payload._id ? action.payload : lead
      );
    });
    builder.addCase(updateLeadAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});
export const { setSortBy } = leadSlice.actions;
export default leadSlice.reducer;

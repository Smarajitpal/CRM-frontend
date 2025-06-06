import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAgents = createAsyncThunk("agents/fetchAgents", async () => {
  const response = await axios.get(
    "https://crm-backend-beige.vercel.app/agents"
  );
  return response.data;
});

export const addAgentAsync = createAsyncThunk(
  "agents/addAgentAsync",
  async (agentData) => {
    const response = await axios.post(
      "https://crm-backend-beige.vercel.app/agents",
      agentData
    );
    return response.data;
  }
);

export const salesAgentSlice = createSlice({
  name: "salesAgent",
  initialState: {
    salesAgent: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAgents.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAgents.fulfilled, (state, action) => {
      state.status = "success";
      state.salesAgent = action.payload;
    });
    builder.addCase(fetchAgents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addAgentAsync.fulfilled, (state, action) => {
      if (Array.isArray(state.salesAgent)) {
        state.salesAgent.push(action.payload);
      } else {
        state.salesAgent = [action.payload];
      }
    });
    builder.addCase(addAgentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default salesAgentSlice.reducer;

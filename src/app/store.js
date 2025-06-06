import { configureStore } from "@reduxjs/toolkit";
import { leadSlice } from "../features/Leads/leadSlice";
import { salesAgentSlice } from "../features/SalesAgent/salesAgentSlice";
import { commentSlice } from "../features/Comments/commentSlice";

export default configureStore({
  reducer: {
    leads: leadSlice.reducer,
    salesAgent: salesAgentSlice.reducer,
    comments: commentSlice.reducer,
  },
});

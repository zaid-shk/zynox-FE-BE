import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlices";
import projectReducer from "./slices/projectSlice";
import tasksReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: tasksReducer,
  },
});

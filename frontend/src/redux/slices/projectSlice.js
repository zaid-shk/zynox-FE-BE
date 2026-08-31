import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [],
  completeProjects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {
    setProjects: (state, action) => {
      state.project = action.payload;
    },
    addProject: (state, action) => {
      state.project.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.project.findIndex(
        (project) => project._id === action.payload._id,
      );
      if (index !== -1) {
        state.project[index] = action.payload;
      }
    },
    setCompleteProjects: (state, action) => {
      state.completeProjects = action.payload;
    },
    deleteProject: (state, action) => {
      state.project = state.project.filter(
        (project) => project._id !== action.payload,
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setLoading,
  setError,
  setCompleteProjects,
} = projectSlice.actions;

export default projectSlice.reducer;

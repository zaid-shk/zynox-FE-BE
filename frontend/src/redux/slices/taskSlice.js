import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tasks: [],
  activeTasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id,
      );

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    setActiveTasks: (state, action) => {
      state.activeTasks = action.payload;
    },
    setTaskLoading: (state, action) => {
      state.loading = action.payload;
    },

    setTaskError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setTaskLoading,
  setTaskError,
  setActiveTasks,
} = taskSlice.actions;

export default taskSlice.reducer;

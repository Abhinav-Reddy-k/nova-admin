import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  current: [],
};

const codingTasksSlice = createSlice({
  initialState,
  name: "codingTasks",
  reducers: {
    myCodingTaskesLoaded: (codingTasks, action) => {
      codingTasks.current = action.payload;
    },
  },
});

export const { myCodingTaskesLoaded } = codingTasksSlice.actions;

export default codingTasksSlice.reducer;
export const selectCurrentCodingTasks = (store) => store.codingTasks.current;
export const getCurrentTask = (id) =>
  createSelector(
    (store) => store.codingTasks.current,
    (current) => current.find((task) => task.id === id)
  );

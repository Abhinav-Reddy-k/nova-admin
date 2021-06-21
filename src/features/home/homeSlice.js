import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  ui: {
    showSpinner: false,
    selectedSideBarOption: "",
  },
};

const homeSlice = createSlice({
  initialState,
  name: "home",
  reducers: {
    tasksLoaded: (home, action) => {
      console.log(action.payload);
      home.tasks = action.payload;
    },
    showSpinner: (home) => {
      home.ui.showSpinner = true;
    },
    hideSpinner: (home) => {
      home.ui.showSpinner = false;
    },
    selectedSideBarOption: (home, action) => {
      home.ui.selectedSideBarOption = action.payload;
    },
  },
});

export const { tasksLoaded, showSpinner, hideSpinner, selectedSideBarOption } =
  homeSlice.actions;
export default homeSlice.reducer;
export const selectIsLoading = (store) => store.home.ui.showSpinner;
export const selectSideBarOption = (store) =>
  store.home.ui.selectedSideBarOption;

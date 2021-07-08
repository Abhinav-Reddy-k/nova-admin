import { configureStore } from "@reduxjs/toolkit";

import authReduser, { verifyAuth } from "../features/auth/authSlice";
import profileReducer, {
  getProfileData,
} from "../features/Profile/profileSlice";
import homeReducer from "../features/home/homeSlice";
import classesReducer from "../features/onlineClasses/classesSclice";

export const store = configureStore({
  reducer: {
    auth: authReduser,
    profile: profileReducer,
    home: homeReducer,
    classes: classesReducer,
  },
});

store.dispatch(verifyAuth());
store.dispatch(getProfileData());

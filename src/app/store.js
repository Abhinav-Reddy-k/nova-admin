import { configureStore } from "@reduxjs/toolkit";

import authReduser, { verifyAuth } from "../features/auth/authSlice";
import profileReducer, {
  getProfileData,
} from "../features/Profile/profileSlice";
import homeReducer from "../features/home/homeSlice";

export const store = configureStore({
  reducer: {
    auth: authReduser,
    profile: profileReducer,
    home: homeReducer,
  },
});

store.dispatch(verifyAuth());
store.dispatch(getProfileData());

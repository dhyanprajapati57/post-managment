import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authslice";
import postReducer from "../redux/postslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});
//RootState represents the entire Redux state structure.
export type RootState = ReturnType<typeof store.getState>;
//Because Redux Toolkit uses async thunks,
//  and normal dispatch does not understand them
export type AppDispatch = typeof store.dispatch;
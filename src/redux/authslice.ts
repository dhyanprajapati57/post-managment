
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  id: string;           
  name: string;
  username: string;
  email?: string;
  gender: string;
  image?: string;
  role?: string;
}

// Define the Auth state interface
interface AuthState {
  user: User | null;
  token: string | null;
}

// Check if user/token exists in localStorage
const initialState: AuthState = {
  user: localStorage.getItem("authuser")
    ? JSON.parse(localStorage.getItem("authuser")!)
    : null,
  token: localStorage.getItem("token"),
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("authuser", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    signup: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;

      localStorage.setItem("authuser", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("authuser");
      localStorage.removeItem("token");
    },
  },
});

// Export reducer and actions for use in components
export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
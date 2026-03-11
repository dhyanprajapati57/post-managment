import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("authuser"),   // match the key used in login/signup
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    login: (state, action: PayloadAction<{ user: string; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", action.payload.user);  // < consistent
      localStorage.setItem("token", action.payload.token);
    },

    signup: (state, action: PayloadAction<{ user: string }>) => {
      state.user = action.payload.user;

      localStorage.setItem("user", action.payload.user); //  consistent
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");   //  consistent
      localStorage.removeItem("token");
    },
  },
});

export const { login, signup, logout } = authSlice.actions;

export default authSlice.reducer;
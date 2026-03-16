import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "../services/post.service";
import type { AppDispatch } from "../redux/store";
import type { PostInput } from "../types/post.types";
//Define the state for creating a post
interface CreatePostState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
//Initial state
const initialState: CreatePostState = {
  loading: false,
  success: false,
  error: null,
};
// Create Redux slice
const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    create: (state) => {
      state.loading = true;
    },
    createSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
//export reducre and action use in compo
export const { create, createSuccess, createFailure } = createPostSlice.actions;
export default createPostSlice.reducer;
//Async thunk to create a new post
export const createNewPost =
  (data: PostInput) => async (dispatch: AppDispatch) => {
    dispatch(create());

    try {
      await createPost(data);
      dispatch(createSuccess());
    } catch (err: unknown) {
  if (err instanceof Error) {
    dispatch(createFailure(err.message));
  } else {
    dispatch(createFailure("Something went wrong"));
  }
}
  };

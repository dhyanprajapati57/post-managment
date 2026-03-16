import { createSlice } from "@reduxjs/toolkit";
import { deletePost } from "../services/post.service";
import type { AppDispatch } from "../redux/store";
// slice state
interface State {
  loading: boolean;
  success: boolean;
  error: string | null;
}
//Initial state
const initialState: State = {
  loading: false,
  success: false,
  error: null,
};
//creat a slice
const deletePostSlice = createSlice({
  name: "deletePost",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
    },

    success: (state) => {
      state.loading = false;
      state.success = true;
    },

    failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { start, success, failure } = deletePostSlice.actions;
export default deletePostSlice.reducer;
//Async thunk to delete a post
export const removePost =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(start());

    try {
      await deletePost(id);
      dispatch(success());
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(failure(err.message));
      } else {
        dispatch(failure("Failed to fetch comments"));
      }
    }
  };
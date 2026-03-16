import { createSlice } from "@reduxjs/toolkit";
import { updatePost } from "../services/post.service";
import type { AppDispatch } from "..//redux/store";
import type { PostInput } from "../types/post.types";
// State interface for editing a post
interface EditPostState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: EditPostState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {
    update: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.message = "Post updated successfully";
    },

    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const { update, updateSuccess, updateFailure, reset } =
  editPostSlice.actions;

export default editPostSlice.reducer;

// API call
export const editPost =
  (id: number | string, data: PostInput) => async (dispatch: AppDispatch) => {
    dispatch(update());

    try {
      await updatePost(id, data);
      dispatch(updateSuccess());
    } catch (err: unknown) {
  if (err instanceof Error) {
    dispatch(updateFailure(err.message));
  } else {
    dispatch(updateFailure("Something went wrong"));
  }
}
  };
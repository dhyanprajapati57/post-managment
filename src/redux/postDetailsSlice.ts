import { createSlice } from "@reduxjs/toolkit";
import { getPost, getPostComments } from "../services/post.service";
import type { AppDispatch } from "../redux/store";
import type { Post } from "../types/post.types";
//a single Comment
export interface Comment {
  id: number;
  body: string;
}
// Define the slice state
interface State {
  post: Post | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  post: null,
  comments: [],
  loading: false,
  error: null,
};

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
    },

    success: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },

    commentsSuccess: (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    },

    failure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { start, success, commentsSuccess, failure } =
  postDetailsSlice.actions;

export default postDetailsSlice.reducer;
// Async thunk to fetch post details
export const fetchPostDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(start());

    try {
      const res = await getPost(id);
      dispatch(success(res.data));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(failure(err.message));
      } else {
        dispatch(failure("Failed to fetch post details"));
      }
    }
  };
// Async thunk to fetch comments
export const fetchComments = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(start());

  try {
    const res = await getPostComments(id);
    dispatch(commentsSuccess(res.data.comments));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(failure(err.message));
    } else {
      dispatch(failure("Failed to fetch comments"));
    }
  }
};

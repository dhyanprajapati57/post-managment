import { createSlice } from "@reduxjs/toolkit";
import { getPostsByUser } from "../services/post.service";
import type { AppDispatch } from "../redux/store";
import type { Post } from "../types/post.types";
// State interface for userown post a post
interface MyPostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: MyPostsState = {
  posts: [],
  loading: false,
  error: null,
};

const myPostsSlice = createSlice({
  name: "myPosts",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },

    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = myPostsSlice.actions;

export default myPostsSlice.reducer;

// API call
export const fetchMyPosts =
  (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchStart());

    try {
      const res = await getPostsByUser(userId);

      const localPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");

      dispatch(fetchSuccess([...res.data.posts, ...localPosts]));
    } catch (err: unknown) {
  if (err instanceof Error) {
    dispatch(fetchFailure(err.message));
  } else {
    dispatch(fetchFailure("Something went wrong"));
  }
}
  };
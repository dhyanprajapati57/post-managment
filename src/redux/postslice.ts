import { createSlice } from "@reduxjs/toolkit";
import { getPosts, getSortedPosts } from "../services/post.service"; // API calls
import type { AppDispatch } from "../redux/store";
import type { Post } from "../types/post.types";

// Define the state for posts

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Create the slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Start fetching posts
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export reducetr actions to use in components
export const { fetchStart, fetchSuccess, fetchFailure } = postsSlice.actions;
export default postsSlice.reducer;

// Async thunk to fetch paginated posts
export const fetchPosts = (page: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());

  try {
    const limit = 30;
    const skip = (page - 1) * limit;

    const res = await getPosts(limit, skip);
    dispatch(fetchSuccess(res.data.posts));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(fetchFailure(err.message));
    } else {
      dispatch(fetchFailure("Something went wrong"));
    }
  }
};

// Async thunk to fetch sorted posts
export const fetchSortedPosts =
  (sortBy: string, order: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchStart()); // start loader

    try {
      const res = await getSortedPosts(sortBy, order); // API call
      dispatch(fetchSuccess(res.data.posts)); // dispatch success
    } catch (err: unknown) {
      // handle error safely
      if (err instanceof Error) {
        dispatch(fetchFailure(err.message));
      } else {
        dispatch(fetchFailure("Something went wrong"));
      }
    }
  };

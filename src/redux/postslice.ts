import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../services/post.service";
import type { Post } from "../types/post.types";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page }: { page: number }) => {
    
    const res = await getPosts();

    return res.data.posts;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch posts";
    });

  },
});

export default postSlice.reducer;
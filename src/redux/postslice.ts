import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/axios.privateapi";
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

//  A slice is one piece of the store
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page }: { page: number }) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const res = await axiosInstance.get(`/posts?limit=${limit}&skip=${skip}`);

    return res.data.posts;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: { title: string; body: string; userId: number }) => {

    const res = await axiosInstance.post("/posts/add", postData);

    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {

    await axiosInstance.delete(`/posts/${id}`);

    return id;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
    // functions to change data
  reducers: {},

  //Async actions don’t go inside reducers, they go in extraReducers.
  extraReducers: (builder) => {

    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to load posts";
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    });

  },
});

export default postSlice.reducer;
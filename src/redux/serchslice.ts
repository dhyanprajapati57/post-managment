import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../types/post.types";
import { searchPosts } from "../services/post.service"; 

// State interface for serching post

interface SearchState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  posts: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchSearchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
// Async thunk calls service function
export const fetchSearchPosts = createAsyncThunk(
  "search/fetchSearchPosts",
  async (query: string, { rejectWithValue }) => {
    try {
      console.log("Calling search API with:", query);
      const posts = await searchPosts(query); //  use service
      return posts;
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Something went wrong");
    }
  },
);

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

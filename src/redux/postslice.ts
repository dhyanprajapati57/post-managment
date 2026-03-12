import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../services/post.service";
import type { Post } from "../types/post.types";
import { getSortedPosts } from "../services/post.service";
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
//old logic page post pagination
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page }: { page: number }) => {
    const limit = 30;
    const skip = (page - 1) * limit;
    
    const res = await getPosts(limit,skip);

    return res.data.posts;
  }
);

// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (page: number) => {
//     const limit = 30;
//     const skip = (page - 1) * limit;

//     const res = await axios.get(
//       `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
//     );

//     return res.data.posts;
//   }
// );
export const fetchSortedPosts = createAsyncThunk(
  "posts/fetchSortedPosts",
  async ({ sortBy, order }: { sortBy: string; order: string }) => {
    const res = await getSortedPosts(sortBy, order);
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
    builder.addCase(fetchSortedPosts.fulfilled, (state, action) => {
  state.posts = action.payload;
});

  },
});

export default postSlice.reducer;
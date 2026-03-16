import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authslice";
import postReducer from "../redux/postslice";
import postDetailsReducer from "../redux/postDetailsSlice";
import myPostsReducer from "../redux/myPostsSlice";
import createPostReducer from "../redux/createpostslice";
import editPostReducer from "../redux/editPostSlice";
import deletePostReducer from "../redux/deletePostSlice";
import searchReducer from "../redux/serchslice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    postDetails: postDetailsReducer,
    myPosts: myPostsReducer,
    createPost: createPostReducer,
    editPost: editPostReducer,
    deletePost: deletePostReducer,
    search: searchReducer,
  },
});
// Type for the entire Redux state
// This helps with useSelector type safety
//RootState represents the entire Redux state structure.
export type RootState = ReturnType<typeof store.getState>;
// Type for dispatch function
// This helps TypeScript understand async thunk
export type AppDispatch = typeof store.dispatch;



import axios from "axios";
import type { PostInput, Post } from "../types/post.types";

// Create Axios instance for DummyJSON
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json", // required for PUT/POST
  },
});

// GET all posts (supports pagination)
// export const getPosts = (page: number = 1) => {
//   return axiosInstance.get(`/posts`, { params: { page } });
// };


export const getPosts = (limit: number, skip: number) => {
  return axiosInstance.get(`/posts?limit=${limit}&skip=${skip}`);
};

// GET single post by ID
export const getPost = (id: string | number) => {
  return axiosInstance.get(`/posts/${id}`);
};

// CREATE new post
export const createPost = (data: PostInput) => {
  return axiosInstance.post<Post>("/posts/add", data);
};

// UPDATE existing post by ID
export const updatePost = (id: string | number, data: PostInput | any) => {
  return axiosInstance.put(`/posts/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

// GET posts by user (DummyJSON supports /posts/user/:userId)
export const getPostsByUser = (userId: string | number) => {
  return axiosInstance.get(`/posts/user/${userId}`);
};

//shorting 
export const getSortedPosts = (sortBy: string, order: string) => {
  return axiosInstance.get(`/posts?sortBy=${sortBy}&order=${order}`);
};

export const getPostComments = (postId: string | number) => {
  return axiosInstance.get(`/posts/${postId}/comments`);
};

export const deletePost = (id: number) => {
  return axios.delete(`https://dummyjson.com/posts/${id}`);
};

export default axiosInstance;
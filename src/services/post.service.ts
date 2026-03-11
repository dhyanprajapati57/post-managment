// import axiosInstance from "./axios.publicapi";
// import type { PostInput, Post } from "../types/post.types";



// export const getPosts = (page: number = 1) => {
//   return axiosInstance.get("/posts", { params: { page } });
// };

// export const getPost = (id: string | number) => {
//   return axiosInstance.get(`/posts/${id}`);
// };

// export const createPost = (data: PostInput) => {
//   return axiosInstance.post<Post>("/posts/add", data);
// };
// // export const createPost = (data: any) => {
// //   return axiosInstance.post("/posts/add", data);
// // };


// // export const updatePost = (id: number, data: PostInput) => {
// //   return axiosInstance.put<Post>(`/posts/${id}`, data);
// // };
// export const updatePost = (id: number, data: any) => {
//   return axiosInstance.put(`/posts/${id}`, data);
// };

// export const deletePost = (id: number) => {
//   return axiosInstance.delete(`/posts/${id}`);
// };

// export const getPostsByUser = (userId: number) => {
//   return axiosInstance.get(`/posts/user/${userId}`);
// };
// src/services/post.service.ts
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
export const getPosts = (page: number = 1) => {
  return axiosInstance.get(`/posts`, { params: { page } });
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

// DELETE post by ID
export const deletePost = (id: string | number) => {
  return axiosInstance.delete(`/posts/${id}`);
};

// GET posts by user (DummyJSON supports /posts/user/:userId)
export const getPostsByUser = (userId: string | number) => {
  return axiosInstance.get(`/posts/user/${userId}`);
};

export default axiosInstance;
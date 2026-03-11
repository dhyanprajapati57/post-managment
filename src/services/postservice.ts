import axiosInstance from "./axios.publicapi";
import type { Post } from "../types/post.types";


export const getPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data.posts;
};

export const getPostById = async (id: string) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (post: Post) => {
  const res = await axiosInstance.post("/posts/add", post);
  return res.data;
};

export const updatePost = async (id: string, post: Post) => {
  const res = await axiosInstance.put(`/posts/${id}`, post);
  return res.data;
};
import api from "../services/axios";
import type { PostInput, Post } from "../types/post.types";

// GET all posts
export const getPosts = (limit: number, skip: number) => {
  return api.get(`/posts?limit=${limit}&skip=${skip}`);
};

// GET single post
export const getPost = (id: string | number) => {
  return api.get(`/posts/${id}`);
};

// CREATE post
export const createPost = (data: PostInput) => {
  return api.post<Post>("/posts/add", data);
};

// UPDATE post
export const updatePost = (id: string | number, data: PostInput | unknown) => {
  return api.put(`/posts/${id}`, data);
};

// GET posts by user
export const getPostsByUser = (userId: string | number) => {
  return api.get(`/posts/user/${userId}`);
};

// SORT posts
export const getSortedPosts = (sortBy: string, order: string) => {
  return api.get(`/posts?sortBy=${sortBy}&order=${order}`);
};

// GET comments
export const getPostComments = (postId: string | number) => {
  return api.get(`/posts/${postId}/comments`);
};

// DELETE post
export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

// SEARCH posts
export const searchPosts = async (query: string): Promise<Post[]> => {
  const res = await api.get(`/posts/search?q=${query}`);
  return res.data.posts;
};
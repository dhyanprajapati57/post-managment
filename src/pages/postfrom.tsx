import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

import { createNewPost } from "../redux/createpostslice";
import { editPost } from "../redux/editPostSlice";

import { getPost } from "../services/post.service";

import { toast } from "react-toastify";
import Button from "../components/commen/button";

// Define form data type
interface PostFormData {
  title: string;
  body: string;
  tags: string[];
}

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get logged-in user ID from auth slice
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const [post, setPost] = useState<PostFormData>({
    title: "",
    body: "",
    tags: [],
  });

  const [loading, setLoading] = useState(false);

  // Load post if editing
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await getPost(id);

        setPost({
          title: res.data.title,
          body: res.data.body,
          tags: res.data.tags || [],
        });
      } catch (error) {
        console.error("Error loading post", error);
        toast.error("Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

  // Handle input changes for title & body
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!userId) {
    toast.error("You must be logged in to create or edit a post");
    return;
  }

  const currentUserId: string = userId; // TypeScript now knows it's string

  try {
    setLoading(true);

    if (id) {
      await dispatch(editPost(id, { ...post, userId: currentUserId }));
      toast.success("Post updated successfully!");
    } else {
      await dispatch(createNewPost({ ...post, userId: currentUserId }));
      toast.success("Post created successfully!");
    }

    navigate("/");
  } catch (error) {
    console.error("Error saving post", error);
    toast.error("Error saving post");
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {id ? "Edit Post" : "Create Post"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
          className="border border-blue-500 rounded-md p-3 focus:outline-none focus:border-red-700"
        />

        <textarea
          name="body"
          placeholder="Body"
          value={post.body}
          onChange={handleChange}
          rows={6}
          required
          className="border border-blue-500 rounded-md p-3 focus:outline-none focus:border-red-600"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={post.tags.join(", ")}
          onChange={handleTagsChange}
          className="border border-blue-500 rounded-md p-3 focus:outline-none focus:border-red-600"
        />

        <Button
          type="submit"
          label={loading ? "Saving..." : id ? "Update Post" : "Create Post"}
        />
      </form>
    </div>
  );
};

export default PostForm;
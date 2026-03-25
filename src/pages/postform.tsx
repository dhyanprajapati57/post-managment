import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

import { createNewPost } from "../redux/createpostslice";
import { editPost } from "../redux/editPostSlice";
import { getPost } from "../services/post.service";
import { toast } from "react-toastify";

import Button from "../components/commen/button";
import InputField from "../components/commen/inputfaild";

interface PostFormData {
  title: string;
  body: string;
  tags: string[];
}

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
          title: res?.data?.title ?? "",
          body: res?.data?.body ?? "",
          tags: res?.data?.tags ?? [],
        });
      } catch (error) {
        console.error("Error loading post", error);
        toast.error("Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

  // Generic handler for title/body
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for tags
  const handleTagsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost((prev) => ({
      ...prev,
      tags: e.target.value?.split(",").map((t) => t?.trim()) ?? [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId)
      return toast.error("You must be logged in to create or edit a post");

    try {
      setLoading(true);
      if (id) {
        await dispatch(editPost(id, { ...post, userId }));
        toast.success("Post updated successfully!");
      } else {
        await dispatch(createNewPost({ ...post, userId }));
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

        {/* Title input */}
        <InputField
          type="text"
          placeholder="Title"
          value={post?.title ?? ""}
          onChange={handleChange}
          isTextarea={false}
        />

        {/* Body textarea */}
        <InputField
          type="text"
          placeholder="Body"
          value={post?.body ?? ""}
          onChange={handleChange}
          isTextarea
        />

        {/* Tags input */}
        <InputField
          type="text"
          placeholder="Tags (comma separated)"
          value={post?.tags?.join(", ") ?? ""}
          onChange={handleTagsChange}
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
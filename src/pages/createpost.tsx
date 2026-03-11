
// src/pages/CreatePost.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import  Button  from "../components/commencomponents/button"

interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  user: string;
}

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [post, setPost] = useState<Omit<Post, "id" | "user">>({
    title: "",
    body: "",
    tags: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({ ...prev, tags: e.target.value.split(",").map((t) => t.trim()) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a post");
      return;
    }

    const allPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPost: Post = { ...post, user, id: Date.now().toString() };
    allPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(allPosts));

    alert("Post created successfully!");
    navigate("/my-post");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={post.body}
          onChange={handleChange}
          rows={6}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={post.tags.join(", ")}
          onChange={handleTagsChange}
        />
        <Button type="submit" label="create post">Create Post</Button>
      </form>
    </div>
  );
};

export default CreatePost;
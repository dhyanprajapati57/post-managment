// src/pages/PostForm.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import  Button  from "../components/commencomponents/button";

interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  user: string;
}

const PostForm = () => {
  const { id } = useParams(); // post id for edit
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  // remove properties from a type
  const [post, setPost] = useState<Omit<Post, "id" | "user">>({
    title: "",
    body: "",
    tags: [],
  });

  // If editing, load existing post
  useEffect(() => {
    if (id) {
      const allPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
      const existingPost = allPosts.find((p) => p.id === id);

      if (!existingPost || existingPost.user !== user) {
        alert("You can only edit your own post!");
        navigate("/my-post");
        return;
      }

      setPost({
        title: existingPost.title,
        body: existingPost.body,
        tags: existingPost.tags,
      });
    }
  }, [id, user, navigate]);

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
      alert("You must be logged in!");
      return;
    }

    const allPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");

    if (id) {
      // EDIT
      const updatedPosts = allPosts.map((p) =>
        p.id === id && p.user === user ? { ...p, ...post } : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      alert("Post updated successfully!");
    } else {
      // CREATE
      const newPost: Post = { ...post, user, id: Date.now().toString() };
      allPosts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(allPosts));
      alert("Post created successfully!");
    }

    navigate("/my-post");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Post" : "Create Post"}</h2>
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
        <Button type="submit" className='text-black' label={id ? "Update Post" : "Create Post"}></Button>
      </form>
    </div>
  );
};

export default PostForm;
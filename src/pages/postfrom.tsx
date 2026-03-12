import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPost, updatePost, getPost } from "../services/post.service";
import Button from "../components/commencomponents/button";
import { toast } from "react-toastify";
import "../assets/postfrom.css";
//structure of postdata
interface PostFormData {
  title: string;
  body: string;
  tags: string[];
}

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //adtastore
  const [post, setPost] = useState<PostFormData>({
    title: "",
    body: "",
    tags: [],
  });
 //saving
  const [loading, setLoading] = useState(false);

  // if no id cretepost
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
  //handle tital body changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };
    //maping post tag
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
     //if id so edit post
      if (id) {
        // UPDATE POST
        const res = await updatePost(id, {
          title: post.title,
          body: post.body,
          tags: post.tags,
          userId: 5,
        });

        console.log("Updated post:", res.data);
        toast.success("Post updated successfully!");
      } else {
        // CREATE POST
        const res = await createPost({
          title: post.title,
          body: post.body,
          tags: post.tags,
          userId: 5,
        });

        console.log("Created post:", res.data);
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
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2>{id ? "Edit Post" : "Create Post"}</h2>

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
          placeholder="Tags (comma separated)"
          value={post.tags.join(", ")}
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
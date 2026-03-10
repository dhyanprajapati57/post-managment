import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios.publicapi";
import type { Post } from "../types/post.types";
const PostDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {

    const fetchPost = async () => {

      try {

        const res = await axiosInstance.get(`/posts/${id}`);

        console.log(res.data);

        setPost(res.data);

      } catch (error) {
        console.error("Error:", error);
      }

    };

    fetchPost();

  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: "15px" }}
      >
        ← Back
      </button>

      <h2>{post.title}</h2>

      <p>{post.body}</p>

      <p>Views: {post.views}</p>

      <p>Tags: {post.tags?.join(", ")}</p>

    </div>
  );
};

export default PostDetails;
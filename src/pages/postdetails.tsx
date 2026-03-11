import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../services/post.service";
import type { Post } from "../types/post.types";

import "../assets/postdetail.css";

const PostDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {

    const fetchPost = async () => {

      try {

        const res = await getPost(id!);

        setPost(res.data);

      } catch (err) {

        console.error(err);
        setError("Failed to load post");

      } finally {

        setLoading(false);

      }

    };

    fetchPost();

  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-details-container">

      <button
        onClick={() => navigate("/")}
        className="back-btn"
      >
        ← Back
      </button>

      <h2>{post?.title}</h2>
      <p>{post?.body}</p>

      <p><b>Views:</b> {post?.views}</p>

      <p>
        <b>Tags:</b> {post?.tags?.join(", ")}
      </p>

    </div>
  );
};

export default PostDetails;
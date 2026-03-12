import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostComments } from "../services/post.service";
import type { Post } from "../types/post.types";

import "../assets/postdetail.css";

interface Comment {
  id: number;
  body: string;
  user: {
    username: string;
  };
}

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Post
        const postRes = await getPost(id!);
        setPost(postRes.data);

        // Fetch Comments
        const commentRes = await getPostComments(id!);
        setComments(commentRes.data.comments);

      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-details-container">

      <button onClick={() => navigate("/")} className="back-btn">
        ← Back
      </button>

      {/* Post Details */}
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>

      <p><b>Views:</b> {post?.views}</p>

      <p>
        <b>Tags:</b> {post?.tags?.join(", ")}
      </p>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>

        {comments.length === 0 ? (
          <p>No comments found</p>
        ) : (
          //comment show 
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <strong>{comment.user.username}</strong>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default PostDetails;
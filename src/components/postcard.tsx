import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/commencomponents/confirmmodel";
import type { Post } from "../types/post.types";

interface Props {
  post: Post;
  onDelete?: (id: number) => void;
}

const PostCard = ({ post, onDelete }: Props) => {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(post.reactions.likes);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes);
  const [showModal, setShowModal] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (!checkLogin()) return;
    setLikes(likes + 1);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkLogin()) return;
    setDislikes(dislikes + 1);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <div
      className="card post-card"
      onClick={() => navigate(`/posts/${post.id}`)} // Whole card clickable
      style={{ cursor: "pointer" }}
    >
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <p className="post-info">
        <strong>Views:</strong> {post.views} | <strong>Tags:</strong>{" "}
        {post.tags.join(", ")}
      </p>

      <div className="post-actions">
        <button className="like-btn" onClick={handleLike}>
           Like: {likes}
        </button>
        <button className="dislike-btn" onClick={handleDislike}>
           Dislike: {dislikes}
        </button>
        {onDelete && (
          <button className="delete-btn" onClick={handleDelete}>
             Delete
          </button>
        )}
      </div>

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this post?"
          onConfirm={() => {
            if (onDelete) onDelete(post.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PostCard;
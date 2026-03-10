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
//login check
  const checkLogin = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return false;
    }

    return true;
  };
//like logic
  const handleLike = () => {
    if (!checkLogin()) return;
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    if (!checkLogin()) return;
    setDislikes(dislikes + 1);
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>

      {/* CLICK TITLE → OPEN POST DETAILS */}
      <h3
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        {post.title}
      </h3>

      <p>{post.body}</p>

      <p>Views: {post.views}</p>

      <p>Tags: {post.tags.join(", ")}</p>

      <button onClick={handleLike}>
        Like: {likes}
      </button>

      <button onClick={handleDislike}>
        Dislike: {dislikes}
      </button>

      {/* OPTIONAL VIEW BUTTON */}
      <button onClick={() => navigate(`/posts/${post.id}`)}>
        View Details
      </button>

      {onDelete && (
        <button onClick={() => setShowModal(true)}>
          Delete
        </button>
      )}

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this post?"
          onConfirm={() => {
            if (onDelete) {
              onDelete(post.id);
            }
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

export default PostCard;
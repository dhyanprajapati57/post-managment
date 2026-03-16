import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./commen/confirmmodel";
import type { Post } from "../types/post.types";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsDown } from "lucide-react";

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
      toast.error("Please login first");
      navigate("/login");
      return false;
    }
    return true;
  };

  // Like/dislike handlers
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkLogin()) return;
    setLikes(likes + 1);
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkLogin()) return;
    setDislikes(dislikes + 1);
  };

  // Delete handler
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <div
     className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 cursor-pointer"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      {/* Post title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>

      {/* Post body */}
    <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">
  {post.body}
</p>

      {/* Post info */}
      <p className="text-gray-500 text-xs mb-4">
        <strong>Views:</strong> {post.views} | <strong>Tags:</strong>{" "}
        {post.tags.join(", ")}
      </p>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 bg-gray-800 text-white text-xs px-3 py-1 rounded-md hover:bg-sky-400 transition"
          onClick={handleLike}
        >
          <ThumbsUp size={14} />
          {likes}
        </button>

        <button
         className="flex items-center gap-1 bg-red-100 text-red-700 text-xs px-3 py-1 rounded-md hover:bg-red-200 transition"
          onClick={handleDislike}
        >
          <ThumbsDown size={14} />
          {dislikes}
        </button>

        {onDelete && (
          <button
          className="bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this post?"
          onConfirm={() => {
            if (onDelete) onDelete(post.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
          showModal={false}
        />
      )}
    </div>
  );
};

export default PostCard;

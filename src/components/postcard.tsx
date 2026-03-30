import { useState, useEffect } from "react";
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

  //  Track user reaction
  const [userReaction, setUserReaction] = useState<
    "like" | "dislike" | null
  >(null);

  //  Load saved reaction (optional but recommended)
  useEffect(() => {
    const savedReaction = localStorage.getItem(`reaction-${post.id}`);
    if (savedReaction) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserReaction(savedReaction as "like" | "dislike");
    }
  }, [post.id]);

  //  Save reaction
  const saveReaction = (reaction: "like" | "dislike" | null) => {
    if (reaction) {
      localStorage.setItem(`reaction-${post.id}`, reaction);
    } else {
      localStorage.removeItem(`reaction-${post.id}`);
    }
  };

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return false;
    }
    return true;
  };

  //  Like handler
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkLogin()) return;

    if (userReaction === "like") {
      // remove like
      setLikes((prev) => prev - 1);
      setUserReaction(null);
      saveReaction(null);
    } else {
      // remove dislike if exists
      if (userReaction === "dislike") {
        setDislikes((prev) => prev - 1);
      }

      setLikes((prev) => prev + 1);
      setUserReaction("like");
      saveReaction("like");
    }
  };

  //  Dislike handler
  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkLogin()) return;

    if (userReaction === "dislike") {
      // remove dislike
      setDislikes((prev) => prev - 1);
      setUserReaction(null);
      saveReaction(null);
    } else {
      // remove like if exists
      if (userReaction === "like") {
        setLikes((prev) => prev - 1);
      }

      setDislikes((prev) => prev + 1);
      setUserReaction("dislike");
      saveReaction("dislike");
    }
  };

  // 🗑 Delete handler
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
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {post.title}
      </h3>

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
          className={`flex items-center gap-1 text-xs px-3 py-1 rounded-md transition ${
            userReaction === "like"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-white hover:bg-sky-400"
          }`}
          onClick={handleLike}
        >
          <ThumbsUp size={14} />
          {likes}
        </button>

        <button
          className={`flex items-center gap-1 text-xs px-3 py-1 rounded-md transition ${
            userReaction === "dislike"
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
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
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default PostCard;
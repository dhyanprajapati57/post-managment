import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "../redux/store";

import { fetchMyPosts } from "../redux/myPostsSlice";
import { removePost } from "../redux/deletePostSlice";
import Button from "../components/commen/button";
import ConfirmModal from "../components/commen/confirmmodel";

const MyPosts = () => {
  const dispatch = useDispatch<AppDispatch>();

  // get user id directly (cleaner)
  const userId = useSelector((state: RootState) => state.auth.user?.id)  as string | undefined;

  const { posts, loading } = useSelector((state: RootState) => state.myPosts);

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Fetch posts
 useEffect(() => {
  if (!userId) return; 

  dispatch(fetchMyPosts(userId));
}, [dispatch, userId]);

  // delete post click
  const handleDeleteClick = (id: number) => {
    setSelectedPost(id);
    setShowModal(true);
  };

  // confirm delete
 const confirmDelete = async () => {
  if (!selectedPost || !userId) return; // guard

  try {
    await dispatch(removePost(selectedPost)); // removePost usually only needs postId

    setShowModal(false);
    setSelectedPost(null);

    // refresh posts safely
    dispatch(fetchMyPosts(userId));
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  if (loading)
    return <p className="p-5 text-center text-gray-600">Loading...</p>;

  if (posts.length === 0)
    return <p className="p-5 text-center text-gray-600">No posts found.</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">My Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((p) => (
          <div
            key={p.id}
            className="border border-blue-600 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">
              {p.id}. {p.title}
            </h3>

            <p className="text-gray-700 mb-2">{p.body}</p>

            <p className="text-sm text-gray-600 mb-3">
              Tags: {p.tags?.join(", ")}
            </p>

            <div className="flex items-center gap-3">
              <Link
                to={`/post-form/${p.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>

              <Button
                label="Delete"
                onClick={() => handleDeleteClick(p.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        message="Are you sure you want to delete this post?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
        showModal={showModal}
      />
    </div>
  );
};

export default MyPosts;
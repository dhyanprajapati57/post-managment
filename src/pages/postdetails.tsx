import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/commen/button";

import type { RootState, AppDispatch } from "../redux/store";
import { fetchPostDetails, fetchComments } from "../redux/postDetailsSlice";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { post, comments, loading, error } = useSelector(
    (state: RootState) => state.postDetails ?? { post: null, comments: [], loading: false, error: null }
  );

  // Fetch post and comments when id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetails(Number(id)));
      dispatch(fetchComments(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-left p-5 text-gray-600">Loading...</p>;
  if (error) return <p className="text-left p-5 text-red-500">{error}</p>;
  if (!post) return <p className="text-left p-5 text-gray-600">Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-left">
      <div className="flex justify-end mb-4">
        <Button
          label="← Back"
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        />
      </div>

      {/* Prefix title with ID */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {post?.id}. {post?.title}
      </h2>

      <p className="text-gray-700 text-base leading-relaxed mb-3">
        {post?.body}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Views:</strong> {post?.views}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Tags:</strong> {post?.tags?.join(", ")}
      </p>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Comments</h3>

        {!comments?.length ? (
          <p className="text-gray-600">No comments found</p>
        ) : (
          comments?.map((comment) => (
            <div
              key={comment?.id}
              className="border border-gray-200 p-3 rounded-md mb-3"
            >
              <p className="text-gray-700 mt-1">{comment?.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetails;
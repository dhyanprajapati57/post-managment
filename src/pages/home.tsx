import { useEffect, useState } from "react"; // React hooks
import { useDispatch, useSelector } from "react-redux"; // Redux hooks

import { fetchPosts } from "../redux/postslice"; // Redux async thunk
import type { RootState, AppDispatch } from "../redux/store"; // Types
import type { Post } from "../types/post.types"; // Post type

import PostCard from "../components/postcard"; // Post card component
import SearchBar from "../components/searchbar"; // Search bar component
import Filter from "../components/filter"; // Filter by tag
import Pagination from "../components/pagination"; // Pagination component
import Loader from "../components/loader"; // Loader component
import ErrorMessage from "../components/commencomponents/errormsg"; // Error message component

const Home = () => {
  // Redux dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  // Local state
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");

  // Fetch posts on page change
  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, [dispatch, page]);

  // Show loader while fetching
  if (loading) return <Loader />;

  // Show error if fetch fails
  if (error) return <ErrorMessage message={error} />;

  // Filter posts based on search and tag
  const filteredPosts = posts.filter((post: Post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchTag = tagFilter
      ? post.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      : true;
    return matchSearch && matchTag;
  });

  return (
    <div>
      {/* Filters section */}
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <Filter tag={tagFilter} onChange={setTagFilter} />
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No posts found</p>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} totalPages={0} />
    </div>
  );
};

export default Home;
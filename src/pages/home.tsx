import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, fetchSortedPosts } from "../redux/postslice";
import { fetchSearchPosts, clearSearch } from "../redux/serchslice";
import type { RootState, AppDispatch } from "../redux/store";
import type { Post } from "../types/post.types";

import PostCard from "../components/postcard";
import SearchBar from "../components/searchbar";
import Filter from "../components/filter";
import Pagination from "../components/pagination";
import Loader from "../components/commen/loader";
import ErrorMessage from "../components/commen/errormsg";
import useDebounce from "../hooks/usedebounce";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts: defaultPosts, loading: postsLoading, error: postsError } =
    useSelector((state: RootState) => state.posts);

  const { posts: searchPosts, loading: searchLoading, error: searchError } =
    useSelector((state: RootState) => state.search);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const query = debouncedSearch.trim();

  // Fetch posts
  useEffect(() => {
    if (!query) {
      dispatch(fetchPosts(page));
      dispatch(clearSearch());
    }
  }, [dispatch, page, query]);

  // Sort
  useEffect(() => {
    if (sortOrder) {
      dispatch(fetchSortedPosts("title", sortOrder));
    }
  }, [dispatch, sortOrder]);

  // Search
  useEffect(() => {
    if (query) {
      dispatch(fetchSearchPosts(query));
    }
  }, [dispatch, query]);

  const isSearching = Boolean(query);

  const posts = isSearching ? searchPosts : defaultPosts;
  const loading = isSearching ? searchLoading : postsLoading;
  const error = isSearching ? searchError : postsError;

  // Filter (clean + optimized)
  const filteredPosts = useMemo(() => {
    if (!tagFilter) return posts;

    return posts.filter((post: Post) =>
      post.tags.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      )
    );
  }, [posts, tagFilter]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 py-4">
        <SearchBar value={search} onChange={setSearch} />
        <Filter tag={tagFilter} onChange={setTagFilter} />

        <select
          className="h-10 px-3 rounded-md border bg-gray-100 text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="asc">Title A-Z</option>
          <option value="desc">Title Z-A</option>
        </select>
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No posts found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination page={page} setPage={setPage} totalPages={10} />
      </div>
    </div>
  );
};

export default Home;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, fetchSortedPosts } from "../redux/postslice";
import { fetchSearchPosts, clearSearch } from "../redux/serchslice"; // search slice
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
  // Get posts state from Redux store
  const {
    posts: defaultPosts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state: RootState) => state.posts);
  //serch post
  const {
    posts: searchPosts,
    loading: searchLoading,
    error: searchError,
  } = useSelector((state: RootState) => state.search);
  //use pagination
  const [page, setPage] = useState<number>(1);
  //input value
  const [search, setSearch] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500); // use hook

  // Fetch default posts for current page
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      dispatch(fetchPosts(page));
      dispatch(clearSearch());
    }
  }, [dispatch, page, debouncedSearch]);

  // Fetch sorted posts
  useEffect(() => {
    if (sortOrder) {
      dispatch(fetchSortedPosts("title", sortOrder));
    }
  }, [dispatch, sortOrder]);

  // Fetch search results when debounced value changes
  useEffect(() => {
    const query = debouncedSearch.trim();

    if (query !== "") {
      console.log("Calling search API with:", query);
      dispatch(fetchSearchPosts(query));
    }
  }, [debouncedSearch, dispatch]);
  const isSearching = debouncedSearch.trim().length > 0;

  const postsToDisplay = isSearching ? searchPosts : defaultPosts;
  const loading = isSearching ? searchLoading : postsLoading;
  const error = isSearching ? searchError : postsError;

  // Filter by tag
  const filteredPosts = postsToDisplay.filter((post: Post) =>
    tagFilter
      ? post.tags.some((tag) =>
          tag.toLowerCase().includes(tagFilter.toLowerCase()),
        )
      : true,
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {" "}
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 py-4">
        {" "}
        <SearchBar value={search} onChange={setSearch} />
        <Filter tag={tagFilter} onChange={setTagFilter} />
        <select
          className="h-10 px-3 rounded-md border border-gray-300  bg-gray-100 text-sm cursor-pointer focus:outline-none focus:border-sky-400"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="asc">Title A-Z</option>
          <option value="desc">Title Z-A</option>
        </select>
      </div>
      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 py-10 text-lg">
          No posts found
        </p>
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

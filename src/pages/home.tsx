import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../redux/postslice";
import type { RootState, AppDispatch } from "../redux/store";
import type { Post } from "../types/post.types";
import "../assets/sorting.css"

import PostCard from "../components/postcard";
import SearchBar from "../components/searchbar";
import Filter from "../components/filter";
import Pagination from "../components/pagination";
import Loader from "../components/loader";
import ErrorMessage from "../components/commencomponents/errormsg";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");

  //  Sorting state
  const [sortOrder, setSortOrder] = useState<string>("");

  // Fetch posts
  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, [dispatch, page]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  // Filtering
  let filteredPosts = posts.filter((post: Post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());

    const matchTag = tagFilter
      ? post.tags.some((tag) =>
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        )
      : true;

    return matchSearch && matchTag;
  });

  //  Sorting logic
  if (sortOrder === "asc") {
    filteredPosts = [...filteredPosts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortOrder === "desc") {
    filteredPosts = [...filteredPosts].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} />
        <Filter tag={tagFilter} onChange={setTagFilter} />

        {/* Sorting */}
        <select className="sort-select"
         onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort</option>
          <option value="asc">Title A-Z</option>
          <option value="desc">Title Z-A</option>
        </select>
      </div>

      {/* Posts */}
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
      <Pagination page={page} setPage={setPage} totalPages={10} />
    </div>
  );
};

export default Home;
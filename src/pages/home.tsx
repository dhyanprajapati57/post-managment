import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../redux/postslice";
import type { RootState, AppDispatch } from "../redux/store";
import type { Post } from "../types/post.types";

import PostCard from "../components/postcard";
import SearchBar from "../components/searchbar";
import Filter from "../components/filter";
import Pagination from "../components/pagination";
import Loader from "../components/loader";
import ErrorMessage from "../components/commencomponents/errormsg";

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [tagFilter, setTagFilter] = useState<string>("");

  useEffect(() => {
    dispatch(fetchPosts({ page }));
  }, [dispatch, page]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const filteredPosts = posts.filter((post: Post) => {

    const matchSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchTag = tagFilter
      ? post.tags.some((tag) =>
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        )
      : true;

    return matchSearch && matchTag;
  });

  return (
    <div>

      <div className="input-container ">
        <SearchBar value={search} onChange={setSearch} />
        <Filter tag={tagFilter} onChange={setTagFilter} />
      </div>

      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No posts found</p>
      ) : (
        filteredPosts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}

      <Pagination page={page} setPage={setPage} />

    </div>
  );
};

export default Home;
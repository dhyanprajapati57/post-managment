import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../redux/store";
import { getPostsByUser } from "../services/post.service";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

const MyPosts = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserPosts = async () => {

      try {

        const res = await getPostsByUser(5);
        const apiPosts = res.data.posts;

        const localPosts = JSON.parse(
          localStorage.getItem("myPosts") || "[]"
        );

        setPosts([...apiPosts, ...localPosts]);

      } catch (error) {

        console.error("Error fetching posts", error);

      } finally {

        setLoading(false);

      }

    };

    fetchUserPosts();

  }, [user]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  if (posts.length === 0)
    return <p style={{ padding: "20px" }}>No posts found.</p>;

  return (
    <div style={{ padding: "20px" }}>

      <h2>My Posts</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>

        {posts.map((p) => (

          <li
            key={p.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #007bff",
              borderRadius: "6px",
            }}
          >

            <h3>{p.title}</h3>

            <p>{p.body}</p>

            <p>Tags: {p.tags.join(", ")}</p>

            <Link to={`/post-form/${p.id}`} style={{ color: "#007bff" }}>
              Edit
            </Link>

          </li>

        ))}

      </ul>

    </div>
  );
};

export default MyPosts;
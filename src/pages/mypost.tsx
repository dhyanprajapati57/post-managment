import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";

interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  user: string;
}

const MyPosts = () => {

  const { user } = useSelector((state: RootState) => state.auth);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {

    const loggedUser = user || localStorage.getItem("authUser");

    const allPosts: Post[] = JSON.parse(
      localStorage.getItem("posts") || "[]"
    );

    const myPosts = allPosts.filter((p) => p.user === loggedUser);

    setPosts(myPosts);

  }, [user]);

  if (posts.length === 0)
    return <p style={{ padding: "20px" }}>You have not created any posts yet.</p>;

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
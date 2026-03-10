import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import type { RootState } from "../redux/store";

const Navbar = () => {

  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>

      <Link to="/">Home</Link>

      {token && <Link to="/create-post">Create Post</Link>}

      {!token && <Link to="/login">Login</Link>}


      {token && (
        <button onClick={() => dispatch(logout())}>
          Logout
        </button>
      )}

    </nav>
  );
};

export default Navbar;
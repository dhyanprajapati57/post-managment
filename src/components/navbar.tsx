import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import type { RootState } from "../redux/store";
import "../assets/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="navbar">
      {/* LEFT SIDE LOGO */}
      <div className="navbar-left">
        <span className="navbar-logo">Post Management Dashboard</span>
      </div>

      {/* RIGHT SIDE LINKS */}
      <div className="navbar-right">
        <Link to="/">Home</Link>
        {token && <Link to="/post-form">Create Post</Link>}
        {token && <Link to="/my-post">My Posts</Link>}
        {!token && <Link to="/login">Login</Link>}
        {token && <button onClick={() => dispatch(logout())}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;

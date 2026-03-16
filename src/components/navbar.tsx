import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div>
        <span className="text-lg font-bold tracking-wide cursor-pointer">
          Post Management Dashboard
        </span>
      </div>

      {/* Right Links */}
      <div className="flex items-center gap-5 relative">
        <Link
          to="/"
          className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
        >
          Home
        </Link>

        {token && (
          <Link
            to="/post-form"
            className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
          >
            Create Post
          </Link>
        )}

        {token && (
          <Link
            to="/my-post"
            className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
          >
            My Posts
          </Link>
        )}

        {!token && (
          <Link
            to="/login"
            className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
          >
            Login
          </Link>
        )}

        {/* User Dropdown */}
        {token && user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-600 transition"
            >
              {/* User Image */}
              <img
                src={user.image}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />

              {/* User Name */}
              <span>{user.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-xl z-50 overflow-hidden">
                {/* User Info */}
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* gender */}
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  username: {user.username}
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    dispatch(logout());
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
// {dropdownOpen && (
//   <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg">

//     <div className="flex items-center gap-3 px-4 py-3 border-b">
//       <img
//         src={user.image || "https://i.pravatar.cc/40"}
//         alt="avatar"
//         className="w-10 h-10 rounded-full"
//       />

//       <div>
//         <p className="font-semibold">{user.name}</p>
//         <p className="text-xs text-gray-500">{user.email}</p>
//       </div>
//     </div>

//     <div className="px-4 py-2 text-sm">
//       <p><b>Gender:</b> {user.gender}</p>
//       <p><b>Role:</b> {user.role}</p>
//     </div>

//     <button
//       onClick={() => {
//         dispatch(logout());
//         setDropdownOpen(false);
//       }}
//       className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
//     >
//       Logout
//     </button>

//   </div>
// )}

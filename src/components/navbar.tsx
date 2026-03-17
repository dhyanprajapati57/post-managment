import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-gray-900 text-white shadow-md">
      {/* Logo */}
      <div>
        <span className="text-lg font-bold tracking-wide cursor-pointer">
          Post Management Dashboard
        </span>
      </div>

      {/* Right Links */}
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
        >
          Home
        </Link>

        {token && (
          <>
            <Link
              to="/post-form"
              className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
            >
              Create Post
            </Link>
            <Link
              to="/my-post"
              className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
            >
              My Posts
            </Link>
          </>
        )}

        {!token && (
          <Link
            to="/login"
            className="text-gray-200 font-medium text-sm hover:text-sky-400 transition-colors duration-200"
          >
            Login
          </Link>
        )}

        {/* User Popover */}
        {token && user && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-600 transition">
                <img
                  src={user?.image ?? ""}
                  alt={user?.name ?? "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{user?.name}</span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-0 bg-white text-black rounded-lg shadow-xl">
              {/* User Info */}
              <div className="px-4 py-3 border-b">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Username */}
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                Username: {user?.username}
              </div>

              {/* Logout */}
              <button
                onClick={() => dispatch(logout())}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
              >
                Logout
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default Navbar;